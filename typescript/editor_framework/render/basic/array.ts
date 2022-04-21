import {
  ArrayScheme, getSchemeClass, IArrayMeta, SchemeClass,
} from '../../scheme/define';
import { IProps, JSXElement, makeIndent } from '../define';
import { renderRegistry } from '../renderRegistry';

export function renderArray<TData, TScheme extends ArrayScheme<TData>>(
    props: IProps<TData[], IArrayMeta, TScheme>,
): JSXElement {
    const { prefix, scheme, value } = props;
    const { elementScheme, meta } = scheme;

    const result: JSXElement[] = [];
    if (meta.showName) {
        result.push(`${prefix}`);
    }

    const elementSchemeClass = getSchemeClass(elementScheme);
    const elementRender = renderRegistry.getRender<unknown, IArrayMeta, unknown[]>(elementSchemeClass);
    const childPrefix = makeIndent(prefix);
    value.forEach((e, id) => {
        const elementRenderResult = elementRender({
            value: e,
            scheme: elementScheme,
            onModify: () => {},
            prefix: `${childPrefix}${id} `,
        });
        result.push(elementRenderResult);
    });

    return result.join('\n');
}
