import { ActionScheme } from '../../scheme/define';
import { schemeRegistry } from '../../scheme/scheme_registry';
import { IAction } from '../../type/action';
import { renderRegistry } from '../render_registry';
import { IProps, JSXElement, makeIndent } from '../define';

export function renderAction(props: IProps<IAction>) {
    const dynamic = props.value;
    const actionSchemeClass = schemeRegistry.getActionSchemeClass(dynamic.name);
    const render = renderRegistry.getRender(actionSchemeClass);
    const lines: JSXElement[] = [];
    lines.push(`${props.prefix}dynamic`);
    const childPrefix = makeIndent(props.prefix);
    const propsForValue: IProps<unknown, ActionScheme> = {
        value: dynamic.value,
        scheme: schemeRegistry.getActionScheme(dynamic.name),
        onModify: () => {},
        prefix: `${childPrefix}`,
    };
    lines.push(render(propsForValue));
    return lines.join('\n');
}
