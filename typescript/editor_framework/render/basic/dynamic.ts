import { IMeta } from '../../scheme/define';
import { IDynamicMeta } from '../../scheme/dynamic';
import { schemeRegistry } from '../../scheme/schemeRegistry';
import { IDynamic } from '../../type/action';
import { renderRegistry } from '../renderRegistry';
import { IProps, JSXElement, makeIndent } from '../define';

export function renderDynamic(props: IProps<IDynamic, IDynamicMeta>) {
    const dynamic = props.value;
    const scheme = schemeRegistry.getObjScheme<unknown, unknown, IDynamic>(dynamic.type);
    const render = renderRegistry.getRender<unknown, IMeta, IDynamic>(scheme.renderType);
    const lines: JSXElement[] = [];
    lines.push(`${props.prefix}dynamic`);
    const childPrefix = makeIndent(props.prefix);
    const propsForValue: IProps<unknown, IMeta, IDynamic> = {
        value: dynamic.value,
        parent: dynamic,
        scheme: schemeRegistry.getObjScheme(dynamic.type),
        parentScheme: props.scheme,
        onModify: () => {},
        prefix: `${childPrefix}`,
    };
    lines.push(render(propsForValue));
    return lines.join('\n');
}
