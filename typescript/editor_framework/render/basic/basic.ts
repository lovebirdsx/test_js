import { IProps, JSXElement } from '../define';

export function renderBasic<T extends number | boolean | string>(props: IProps<T>): JSXElement {
    return `${props.prefix}${props.value}`;
}
