import { IMeta } from '../scheme/define';
import { IProps } from './define';

export function renderBasic<T>(props: IProps<T, IMeta>) {
    return `${props.prefix} ${props.value}`;
}
