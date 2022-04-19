import { IProps } from '../scheme/define';
import { DataType } from '../type/action';

export function renderBasic<T>(props: IProps<T>) {
    console.log(props.prefixElement, DataType[props.scheme.type], props.value);
}
