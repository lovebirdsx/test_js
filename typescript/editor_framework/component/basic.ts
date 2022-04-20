import { IProps } from '../scheme/define';

export function renderBasic<T>(props: IProps<T>) {
    console.log(props.prefixElement, props.scheme.type, props.value);
}
