import React, { act } from 'react';
import 'reflect-metadata';
import { fireEvent, render } from '@testing-library/react';

// #region SchemaRegistry

interface ICheck {
  add(message: string): void;
}

abstract class Schema<T = unknown> {
  name = 'schema';
  renderType = 'schema';
  cnName = 'schema';
  required?: boolean;

  abstract check(value: T, checker: ICheck): boolean;
}

class SchemaRegistry {
  registry = new Map<string, Schema>();

  register<T extends Schema>(schema: T) {
    if (this.registry.has(schema.name)) {
      throw new Error(`Schema with name ${schema.name} already exists`);
    }

    this.registry.set(schema.name, schema);
  }

  getSchema<T extends Schema>(name: string): T {
    return this.registry.get(name) as T;
  }
}

const schemaRegistry = new SchemaRegistry();

// #endregion

// #region Decorator Helper

function pushFieldSchema(target: any, schema: Schema) {
  const properties = Reflect.getMetadata('fields', target) || [];
  if (properties.length === 0) {
    Reflect.defineMetadata('fields', properties, target);
  }

  properties.push(schema);
}

function getAllFieldSchemas(target: any) {
  return Reflect.getMetadata('fields', target) as Schema[] || [];
}

// #endregion

// #region Schema & Decorator

type ToInterface<T> = {
  [K in keyof T]: T[K];
};

class IntSchema extends Schema<number> {
  name = 'int';
  cnName = '整数';
  renderType = 'int';
  min?: number = 0;
  max?: number = 0;

  constructor(options?: Partial<ToInterface<IntSchema>>) {
    super();
    Object.assign(this, options);
  }

  check(value: number, checker: ICheck) {
    if (this.min !== undefined && value < this.min) {
      checker.add(`Value ${value} is less than ${this.min}`);
      return false;
    }

    if (this.max !== undefined && value > this.max!) {
      checker.add(`Value ${value} is greater than ${this.max}`);
      return false;
    }

    return true;
  }
}

schemaRegistry.register(new IntSchema());

function intSchema(options?: Partial<ToInterface<IntSchema>>) {
  return (target: any, propertyKey: string) => {
    const schemaType = new IntSchema({
      name: propertyKey,
      renderType: 'int',
      cnName: propertyKey,
      ...options,
    });

    pushFieldSchema(target, schemaType);
  };
}

class StringSchema extends Schema {
  name = 'string';
  cnName = '字符串';
  renderType = 'string';
  maxLength?: number;

  constructor(options?: Partial<ToInterface<StringSchema>>) {
    super();
    Object.assign(this, options);
  }

  check(value: string, checker: ICheck) {
    if (this.maxLength !== undefined && value.length > this.maxLength) {
      checker.add(`String length ${value.length} is greater than ${this.maxLength}`);
      return false;
    }

    return true;
  }
}

schemaRegistry.register(new StringSchema());

function stringSchema(options?: Partial<ToInterface<StringSchema>>) {
  return (target: any, propertyKey: string) => {
    const schema = new StringSchema({ name: propertyKey, cnName: propertyKey, ...options });
    pushFieldSchema(target, schema);
  };
}

type Object = Record<string, unknown>;

class ObjectSchema extends Schema<Object> {
  name = 'object';
  cnName = '对象';
  renderType = 'object';
  private _fields: Schema[] = [];

  constructor(options?: Partial<ToInterface<ObjectSchema>>) {
    super();
    Object.assign(this, options);
  }

  addField(schema: Schema) {
    this._fields.push(schema);
  }

  addFields(schemas: Schema[]) {
    this._fields.push(...schemas);
  }

  get fields() {
    return this._fields;
  }

  getField<T>(name: string): Schema<T> | undefined {
    const schema = this._fields.find((property) => property.name === name);
    return schema as Schema<T> | undefined;
  }

  check(value: Object, checker: ICheck) {
    for (const field of this.fields) {
      if (!field.check(value[field.name], checker)) {
        return false;
      }
    }

    return true;
  }
}

function objectSchema(options?: Partial<ToInterface<ObjectSchema>>) {
  return (target: any) => {
    const objectSchema = new ObjectSchema({
      name: target.name, renderType: 'object', cnName: target.name, ...options,
    });

    objectSchema.addFields(getAllFieldSchemas(target.prototype));
    schemaRegistry.register(objectSchema);
  };
}

// #endregion

// #region Render registry

type SchemeComponent<T = unknown> = React.ComponentType<{ value: T, schema: Schema<T>, onModify: (value: T) => void }>;

class RenderRegistry {
  registry = new Map<string, SchemeComponent>();

  register<T>(type: string, component: SchemeComponent<T>) {
    if (this.registry.has(type)) {
      throw new Error(`Component with name ${type} already exists`);
    }

    this.registry.set(type, component as SchemeComponent);
  }

  getComponent<T>(type: string): SchemeComponent<T> {
    return this.registry.get(type)! as SchemeComponent<T>;
  }
}

const renderRegistry = new RenderRegistry();

// #endregion

// #region Components

function IntComponent(props: { value: number, schema: IntSchema, onModify: (value: number) => void }) {
  const { value, schema, onModify } = props;
  return <input type="number" value={value} min={schema.min} max={schema.max} onChange={(e) => {
    onModify(parseInt(e.target.value, 10));
  }} />;
}

function StringComponent(props: { value: string, schema: Schema, onModify: (value: string) => void }) {
  const { value, schema, onModify } = props;
  return <input type="text" value={value} onChange={(e) => {
    onModify(e.target.value);
  }} />;
}

function ObjectComponent(props: { value: Object, schema: Schema<Object>, onModify: (value: Object) => void }) {
  const { value, schema, onModify } = props;
  const objectSchema = schema as ObjectSchema;
  return <div>
    {objectSchema.fields.map((property) => {
      const Component = renderRegistry.getComponent(property.renderType);
      return <Component key={property.name} value={value[property.name]} schema={property} onModify={(newValue) => {
        onModify({ ...value, [property.name]: newValue });
      }} />;
    })}
  </div>;
}

renderRegistry.register('int', IntComponent);
renderRegistry.register('string', StringComponent);
renderRegistry.register('object', ObjectComponent);

// #endregion

// #region Types

@objectSchema({ cnName: '实体' })
class Entity {
  @intSchema({ cnName: '序号' })
  id: number = 0;

  @stringSchema({ cnName: '名字' })
  name: string = '';
}

type IEntity = ToInterface<Entity>;

// #endregion

// #region Test

describe('schema', () => {
  it('entity schema', () => {
    const entitySchema = schemaRegistry.getSchema<ObjectSchema>('Entity');
    expect(entitySchema.cnName).toBe('实体');
    expect(entitySchema.name).toBe(Entity.name);
    expect(entitySchema.fields.length).toBe(2);
    expect(entitySchema.renderType).toBe('object');

    const idSchema = entitySchema.getField<number>('id');
    expect(idSchema).toBeDefined();
    expect(idSchema!.cnName).toBe('序号');
    expect(idSchema!.name).toBe('id');

    const nameSchema = entitySchema.getField<string>('name');
    expect(nameSchema).toBeDefined();
    expect(nameSchema!.cnName).toBe('名字');
    expect(nameSchema!.name).toBe('name');
  });

  it('render entity', () => {
    const entity: IEntity = { id: 1, name: 'test' };
    const entitySchema = schemaRegistry.getSchema<ObjectSchema>('Entity');
    const Component = renderRegistry.getComponent(entitySchema.renderType);

    let modifiedValue: IEntity | undefined;
    const { container } = render(<Component value={entity} schema={entitySchema} onModify={(value) => { modifiedValue = value as IEntity; }} />);
    const inputs = container.querySelectorAll('input');
    expect(inputs.length).toBe(2);

    const idInput = inputs[0];
    expect(idInput.getAttribute('type')).toBe('number');

    act(() => {
      fireEvent.change(idInput, { target: { value: '2' } });
    });

    expect(modifiedValue).toBeDefined();
    expect(modifiedValue!.id).toBe(2);
  });
});

// #endregion
