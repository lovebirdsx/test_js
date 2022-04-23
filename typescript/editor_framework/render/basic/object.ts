import { getSchemeClass, Obj, ObjectScheme } from '../../scheme/define';
import {
 getGlobalContexts, IProps, JSXElement, makeIndent,
} from '../define';
import { renderRegistry } from '../render_registry';

export function renderObject(props: IProps<Obj, ObjectScheme<Obj>>): JSXElement {
    const { prefix, scheme, value } = props;
    const { fields } = scheme;

    const lines: JSXElement[] = [];
    lines.push(`${prefix}`);

    const globalContext = getGlobalContexts();

    const handle = globalContext.push(scheme, value);

    const childPrefix = makeIndent(prefix);
    for (const fieldKey in fields) {
        const filedScheme = fields[fieldKey];
        const filedValue = value[fieldKey];
        const fieldSchemeClass = getSchemeClass(filedScheme);
        const render = renderRegistry.getRender(fieldSchemeClass);
        const fieldRenderResult = render({
            value: filedValue,
            scheme: filedScheme,
            onModify: (() => {}),
            prefix: `${childPrefix}${fieldKey}: `,
        });
        lines.push(fieldRenderResult);
    }

    globalContext.pop(handle);

    return lines.join('\n');
}
