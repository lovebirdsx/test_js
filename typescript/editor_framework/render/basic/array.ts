import {
  ArrayScheme, IArrayMeta,
} from '../../scheme/define';
import { IProps, JSXElement, makeIndent } from '../define';
import { renderRegistry } from '../renderRegistry';

export function renderArray(
    props: IProps<
        unknown[],
        IArrayMeta,
        unknown,
        ArrayScheme<unknown, IArrayMeta, unknown>
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
    const childPrefix = makeIndent(prefix);
    value.forEach((e, id) => {
        const elementRenderResult = elementRender({
            value: e,
            scheme: elementScheme,
            parent: value,
            parentScheme: scheme,
            onModify: () => {},
            prefix: `${childPrefix}${id} `,
        });
        result.push(elementRenderResult);
    });

    return result.join('\n');
}
