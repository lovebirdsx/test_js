import { caculationOp } from '../operation/caculation';
import { IProps } from '../scheme/define';
import { IDoCaculation, ILog, IShowMessage } from '../type/action';

export function renderLog(props: IProps<ILog>) {
    console.log(props.prefixElement, 'renderLog', props.value.content);
}

export function renderShowMessage(props: IProps<IShowMessage>) {
    console.log(props.prefixElement, 'renderShowMessage', props.value.content);
}

export function renderCaculation(props: IProps<IDoCaculation>) {
    console.log(props.prefixElement, 'renderCaculation', props.value.a, props.value.op, props.value.b, caculationOp.Caculate(props.value));
}
