import { getSchemeClass, IObjMeta, ObjectScheme } from '../../scheme/define';
import {
 getGlobalContexts, IProps, JSXElement, makeIndent,
} from '../define';
import { renderRegistry } from '../renderRegistry';

export function renderObject<TData, TScheme extends ObjectScheme<TData>>(props: IProps<TData, IObjMeta, unknown, TScheme>): JSXElement {
    const { prefix, scheme, value } = props;
    const { fields } = scheme;

    const lines: JSXElement[] = [];
    lines.push(`${prefix}${scheme.constructor.name}`);

    const globalContext = getGlobalContexts();

    const handle = globalContext.set(getSchemeClass(scheme), value);

    const childPrefix = makeIndent(prefix);
    for (const fieldKey in fields) {
        const filedScheme = fields[fieldKey];
        const filedValue = value[fieldKey];
        const fieldSchemeClass = getSchemeClass(filedScheme);
        const render = renderRegistry.getRender(fieldSchemeClass);
        const fieldRenderResult = render({
            value: filedValue,
            scheme: filedScheme,
            parent: value,
            parentScheme: scheme,
            onModify: (() => {}),
            prefix: `${childPrefix}${fieldKey}: `,
        });
        lines.push(fieldRenderResult);
    }

    globalContext.remove(handle);

    return lines.join('\n');
}
