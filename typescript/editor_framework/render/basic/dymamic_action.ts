import { ActionScheme, getSchemeClass } from '../../scheme/define';
import { schemeRegistry } from '../../scheme/scheme_registry';
import { IAction } from '../../type/action';
import { renderRegistry } from '../render_registry';
import { IProps, JSXElement, makeIndent } from '../define';

export function renderDynamicAction(props: IProps<IAction>) {
    const action = props.value;
    const actionScheme = schemeRegistry.getActionScheme(action.name);
    const render = renderRegistry.getRender(actionScheme);
    const lines: JSXElement[] = [];
    lines.push(`${props.prefix}dynamic`);
    const childPrefix = makeIndent(props.prefix);
    const propsForValue: IProps<unknown, ActionScheme> = {
        value: action.value,
        scheme: schemeRegistry.getActionScheme(action.name),
        onModify: () => {},
        prefix: `${childPrefix}`,
    };
    lines.push(render(propsForValue));
    return lines.join('\n');
}
