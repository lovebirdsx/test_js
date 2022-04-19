import { IProps } from '../scheme/define';
import { ValueType } from '../type/action';

export function renderBasic<T>(props: IProps<T>) {
    console.log(props.prefixElement, ValueType[props.scheme.type], props.value);
}
