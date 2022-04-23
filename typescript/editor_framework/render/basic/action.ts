import { ActionScheme, Obj } from '../../scheme/define';
import { IProps, JSXElement } from '../define';
import { renderObject } from './object';

export function renderAction(props: IProps<Obj, ActionScheme<Obj>>): JSXElement {
    const newProps = { ...props };
    newProps.prefix = `${props.prefix}${props.scheme.name} `;
    return renderObject(newProps);
}
