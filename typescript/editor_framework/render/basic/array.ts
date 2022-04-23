import { ArrayScheme } from '../../scheme/define';
import { IProps, JSXElement, makeIndent } from '../define';
import { renderRegistry } from '../render_registry';

export function renderArray(props: IProps<unknown[], ArrayScheme>): JSXElement {
    const { prefix, scheme, value } = props;
    const { elementScheme } = scheme;

    const result: JSXElement[] = [];

    result.push(`${prefix}`);
    const elementRender = renderRegistry.getRender(elementScheme);
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
