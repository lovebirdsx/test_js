import { IProps, JSXElement } from '../define';

export function renderBasic(props: IProps<unknown>): JSXElement {
    return `${props.prefix}${props.value}`;
}
