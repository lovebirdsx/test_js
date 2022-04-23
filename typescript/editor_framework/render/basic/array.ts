import { ArrayScheme, getSchemeClass } from '../../scheme/define';
import { IProps, JSXElement, makeIndent } from '../define';
import { renderRegistry } from '../render_registry';

export function renderArray(props: IProps<unknown[], ArrayScheme>): JSXElement {
    const { prefix, scheme, value } = props;
    const { elementScheme } = scheme;

    const result: JSXElement[] = [];
    if (!scheme.hideName) {
        result.push(`${prefix}`);
    }

    const elementSchemeClass = getSchemeClass(elementScheme);
    const elementRender = renderRegistry.getRender<unknown>(elementSchemeClass);
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
