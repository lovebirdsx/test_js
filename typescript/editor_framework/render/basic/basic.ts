import { IMeta } from '../../scheme/define';
import { IProps, JSXElement } from '../define';

export function renderBasic<T extends number | boolean | string>(props: IProps<T, IMeta>): JSXElement {
    return `${props.prefix}${props.value}`;
}
