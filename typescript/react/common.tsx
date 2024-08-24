import * as React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// #region Types
type TCtor<T> = new (...args: any[]) => T;
type ToInterface<T> = { [K in keyof T]: T[K] };
type ToPlain<T> = T extends Object ? ToInterface<T> : T;

class Obj { }

// 将class的实例对象转换成object对象
export function objToInterface<T extends Obj>(obj: T): ToInterface<T> {
  const keys = Object.keys(obj) as (keyof T)[];
  const newObj = {} as ToInterface<T>;
  keys.forEach((key) => {
    newObj[key as keyof T] = obj[key];
  });
  return newObj;
}

// #endregion

// #region Decorator Basic

abstract class Attribute { }

const ATTRIBUTE_FIELD = '__ATTRIBUTE_FIELD';
function addAttribute<T extends Obj>(target: T, propertyKey: string, value: Attribute) {
  const key = `${ATTRIBUTE_FIELD}_${propertyKey}`;
  let attributes = (target as any)[key];
  if (!attributes) {
    attributes = [];
    (target as any)[key] = attributes;
  }

  attributes.push(value);
}

function getAttributes<T extends Obj, TAttr extends Attribute>(
  target: T,
  propertyKey: string,
  type: new (...args: any[]) => TAttr,
): TAttr[] {
  const key = `${ATTRIBUTE_FIELD}_${propertyKey}`;
  const all = (target as any)[key] || [];
  return (all.filter((e: Attribute) => e instanceof type) as TAttr[]).reverse();
}

interface IStringElement {
  type: 'string';
  content: string;
  size: 'large' | 'normal' | 'small';
}

interface ILineElement {
  type: 'line';
  color: string;
}

// #endregion

// #region Layout Decorator

type TElement = IStringElement | ILineElement;

interface ILayoutOptions {
  position: 'prefix' | 'suffix';
  element: TElement;
}

function renderStringElement(key: string, { content, size }: IStringElement): React.JSX.Element {
  switch (size) {
    case 'large':
      return <h3 key={key}>{content}</h3>;
    case 'normal':
      return <h4 key={key}>{content}</h4>;
    case 'small':
      return <text key={key}>{content}</text>;
    default:
      throw new Error('Unknown size');
  }
}

function renderLineElement(key: string, { color }: ILineElement): React.JSX.Element {
  return <hr key={key} style={{ color }} />;
}

function renderElement(key: string, element: TElement): React.JSX.Element {
  switch (element.type) {
    case 'string':
      return renderStringElement(key, element);
    case 'line':
      return renderLineElement(key, element);
    default:
      throw new Error('Unknown type');
  }
}

class LayoutAttribute extends Attribute {
  constructor(public element: TElement) {
    super();
  }

  render(key: string): React.JSX.Element {
    return renderElement(key, this.element);
  }
}

class PrefixLayoutAttribute extends LayoutAttribute { }
class SufixLayoutAttribute extends LayoutAttribute { }

export function layout(options: ILayoutOptions) {
  return (target: any, propertyKey: string) => {
    switch (options.position) {
      case 'prefix':
        addAttribute(target, propertyKey, new PrefixLayoutAttribute(options.element));
        break;
      case 'suffix':
        addAttribute(target, propertyKey, new SufixLayoutAttribute(options.element));
        break;
      default:
        throw new Error('Unknown position');
    }
  };
}

export function prefix(prefix: string) {
  return layout({
    position: 'prefix',
    element: {
      type: 'string',
      content: prefix,
      size: 'normal',
    },
  });
}

export function suffix(sufix: string) {
  return layout({
    position: 'suffix',
    element: {
      type: 'string',
      content: sufix,
      size: 'normal',
    },
  });
}

export function line(color?: string) {
  return layout({
    position: 'prefix',
    element: {
      type: 'line',
      color: color ?? 'black',
    },
  });
}

// #endregion

// #region Meta Decorator

interface IMetaOptions {
  name?: string;
  renderType?: string;
}

class MetaAttribute extends Attribute {
  constructor(public readonly options: IMetaOptions) {
    super();
  }
}

function getMeta<T extends Obj>(target: T, propertyKey: string): IMetaOptions | undefined {
  const attributes = getAttributes(target, propertyKey, MetaAttribute);
  if (attributes.length > 0) {
    return attributes[0].options;
  }
  return undefined;
}

function getOrCreateMeta<T extends Obj>(target: T, propertyKey: string): IMetaOptions {
  let meta = getMeta(target, propertyKey);
  if (!meta) {
    meta = {};
    addAttribute(target, propertyKey, new MetaAttribute(meta));
  }

  return meta;
}

export function meta(options: IMetaOptions) {
  return (target: any, propertyKey: string) => {
    const meta = getOrCreateMeta(target, propertyKey);
    Object.assign(meta, options);
  };
}

export function name(name: string) {
  return (target: any, propertyKey: string) => {
    const meta = getOrCreateMeta(target, propertyKey);
    meta.name = name;
  };
}

export function renderType(type: string) {
  return (target: any, propertyKey: string) => {
    const meta = getOrCreateMeta(target, propertyKey);
    meta.renderType = type;
  };
}

// #endregion

// #region Renderer Registry
interface IPropsBase<T> {
  value: ToPlain<T>;
  Ctor?: TCtor<T>;
}

interface IProps<T> extends IPropsBase<T> {
  onModify: (value: ToPlain<T>) => void;
  parent?: IPropsBase<unknown>;
}

type TComponent<T> = React.ComponentType<IProps<T>>;

class RendererRegistry {
  private map = new Map<string, TComponent<any>>();

  register<T>(type: string, component: TComponent<T>) {
    this.map.set(type, component);
  }

  get<T>(type: string): TComponent<T> {
    return this.map.get(type) as TComponent<T>;
  }
}

const rendererRegistry = new RendererRegistry();

// #endregion

// #region Component

const IntComponent: TComponent<number> = ({ value, onModify }) => (
  <input
    type="number"
    value={value}
    onChange={(e) => onModify(parseInt(e.target.value, 10))}
  />
);

rendererRegistry.register(typeof 0, IntComponent);

const StringComponent: TComponent<string> = ({ value, onModify }) => (
  <input
    type="text"
    value={value}
    onChange={(e) => onModify(e.target.value)}
  />
);

rendererRegistry.register(typeof '', StringComponent);

function getKeyName<T extends Obj>(target: T, propertyKey: string): string {
  const meta = getMeta(target, propertyKey);
  return meta?.name ?? propertyKey;
}

function getRenderType<T extends Obj>(target: T, propertyKey: string): string | undefined {
  const meta = getMeta(target, propertyKey);
  return meta?.renderType;
}

function getRenderer<T extends Obj, U>(target: T, propertyKey: string, value: U): TComponent<U> {
  const renderType = getRenderType(target, propertyKey);
  if (renderType) {
    return rendererRegistry.get(renderType);
  }

  return rendererRegistry.get(typeof value);
}

const keysByPrototype = new Map<TCtor<any>, string[]>();
export function getKeysByCtor<T>(Ctor: TCtor<T>): (keyof T)[] {
  let keys = keysByPrototype.get(Ctor);
  if (!keys) {
    const instance = new Ctor();
    const properties = Object.getOwnPropertyDescriptors(instance);
    keys = Object.keys(properties);

    keysByPrototype.set(Ctor, keys);
  }

  return keys as (keyof T)[];
}

export function ObjectComponent<T extends Obj>({ value, onModify, Ctor }: IProps<T>) {
  const keys = getKeysByCtor(Ctor!);
  const prototype = Ctor?.prototype;
  return (
    <div>
      {keys.map((key) => {
        const v = value[key];
        const prefixAttributes = getAttributes(prototype!, key as string, PrefixLayoutAttribute);
        const suffixAttributes = getAttributes(prototype!, key as string, SufixLayoutAttribute);

        const elements = [] as React.JSX.Element[];
        prefixAttributes.forEach((attr, i) => {
          elements.push(attr.render(`prefix_${i}`));
        });

        const Renderer = getRenderer(prototype!, key as string, v);
        const valueElement = <Renderer onModify={
            (newValue) => {
              onModify({ ...value, [key]: newValue });
            }
          }
          value={v as any}
        />;

        elements.push(<div key={'content'}>{getKeyName(prototype!, key as string)}:{valueElement}</div>);

        suffixAttributes.forEach((attr, i) => {
          elements.push(attr.render(`suffix_${i}`));
        });

        return (
          <div key={key as string}>
            {elements}
          </div>
        );
      })}
    </div>
  );
}

rendererRegistry.register(typeof {}, ObjectComponent);

// #endregion

// #region Helper

function beautifyHTML(html: string): string {
  const indentSize = 2;
  let formattedHtml = '';
  let indentLevel = 0;

  // 使用正则表达式分割HTML字符串
  const tokens = html.split(/(<\/?[^>]+>)/).filter(Boolean);

  tokens.forEach((token) => {
    if (token.match(/<\/[^>]+>/)) {
      // 闭合标签，缩进减少
      indentLevel--;
      formattedHtml += `${' '.repeat(indentLevel * indentSize) + token}\n`;
    } else if (token.match(/<[^/>]+>/)) {
      // 开始标签，先缩进再增加缩进级别
      formattedHtml += `${' '.repeat(indentLevel * indentSize) + token}\n`;
      indentLevel++;
    } else if (token.match(/<[^>]+\/>/)) {
      // 自闭合标签，直接缩进输出
      formattedHtml += `${' '.repeat(indentLevel * indentSize) + token}\n`;
    } else {
      // 普通文本节点，直接输出
      formattedHtml += `${' '.repeat(indentLevel * indentSize) + token.trim()}\n`;
    }
  });

  return formattedHtml.trim();
}

export function toHtml(element: React.JSX.Element, title: string) {
  const elementHtml = renderToStaticMarkup(element);
  const html = `<html><head><title>${title}</title></head><body>${elementHtml}</body></html>`;
  return beautifyHTML(html);
}

// #endregion
