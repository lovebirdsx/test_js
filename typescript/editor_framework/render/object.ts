import {
 IObjectScheme, IObjMeta, Obj,
} from '../scheme/define';
import { IProps, JSXElement } from './define';
import { renderRegistry } from './renderRegistry';

export function renderObject(props: IProps<Obj, IObjMeta, unknown, IObjectScheme<Obj, IObjMeta>>): JSXElement {
    const { prefix, scheme, value } = props;
    const { fields } = scheme;

    const result: JSXElement[] = [];
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
        });
        result.push(`${prefix}${fieldKey}:${fieldRenderResult}`);
    }

    return result.join('\n');
}
