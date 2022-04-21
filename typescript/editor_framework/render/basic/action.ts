import { ActionScheme, IMeta } from '../../scheme/define';
import { IActionMeta } from '../../scheme/dynamic';
import { schemeRegistry } from '../../scheme/schemeRegistry';
import { IAction } from '../../type/action';
import { renderRegistry } from '../renderRegistry';
import { IProps, JSXElement, makeIndent } from '../define';

export function renderAction(props: IProps<IAction, IActionMeta>) {
    const dynamic = props.value;
    const actionSchemeClass = schemeRegistry.getActionSchemeClass(dynamic.name);
    const render = renderRegistry.getRender(actionSchemeClass);
    const lines: JSXElement[] = [];
    lines.push(`${props.prefix}dynamic`);
    const childPrefix = makeIndent(props.prefix);
    const propsForValue: IProps<unknown, IMeta, IAction, ActionScheme> = {
        value: dynamic.value,
        parent: dynamic,
        scheme: schemeRegistry.getActionScheme(dynamic.name),
        parentScheme: props.scheme,
        onModify: () => {},
        prefix: `${childPrefix}`,
    };
    lines.push(render(propsForValue));
    return lines.join('\n');
}
