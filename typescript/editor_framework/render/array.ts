import {
  IArrayScheme, IArrayMeta,
} from '../scheme/define';
import { IProps, JSXElement } from './define';
import { renderRegistry } from './renderRegistry';

export function renderArray(
    props: IProps<
        unknown[],
        IArrayMeta,
        unknown,
        IArrayScheme<unknown, IArrayMeta, unknown>
    >,
): JSXElement {
    const { prefix, scheme, value } = props;
    const { elementScheme, meta } = scheme;

    const result: JSXElement[] = [];
    if (meta.showName) {
        result.push(`${prefix}`);
    }

    const elementRender = renderRegistry.getRender<
        unknown,
        IArrayMeta,
        unknown[]
    >(elementScheme.renderType);
    value.forEach((e, id) => {
        const elementRenderResult = elementRender({
            value: e,
            scheme: elementScheme,
            parent: value,
            parentScheme: scheme,
            onModify: () => {},
        });
        result.push(`${prefix}${id}:${elementRenderResult}`);
    });

    return result.join('\n');
}
