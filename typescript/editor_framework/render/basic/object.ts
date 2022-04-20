import { Obj, IObjMeta, IObjectScheme } from '../../scheme/define';
import { schemeRegistry } from '../../scheme/schemeRegistry';
import { IProps, JSXElement, makeIndent } from '../define';
import { renderRegistry } from '../renderRegistry';

export function renderObject(props: IProps<Obj, IObjMeta, unknown, IObjectScheme<Obj, IObjMeta>>): JSXElement {
    const { prefix, scheme, value } = props;
    const { fields } = scheme;

    const lines: JSXElement[] = [];
    const dataType = schemeRegistry.getSchemeType(scheme);
    lines.push(`${prefix}${dataType}`);

    const childPrefix = makeIndent(prefix);
    for (const fieldKey in fields) {
        const filedScheme = fields[fieldKey];
        const filedValue = value[fieldKey];
        const render = renderRegistry.getRender(filedScheme.renderType);
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

    return lines.join('\n');
}
