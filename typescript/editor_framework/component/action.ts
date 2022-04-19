import { caculationOp } from '../operation/caculation';
import { IProps } from '../scheme/define';
import { IDoCaculation, ILog, IShowMessage } from '../type/action';
import { ILogMeta, IShowMessageMeta } from '../type/actionMeta';

export function renderLog(props: IProps<ILog, ILogMeta>) {
    console.log(props.prefixElement, 'renderLog', props.value.content, 'meta', props.scheme.meta.foo);
    if (props.parent) {
        console.log('', 'parent type', props.parentScheme?.type, props.parent);
    }
}

export function renderShowMessage(props: IProps<IShowMessage, IShowMessageMeta>) {
    console.log(props.prefixElement, 'renderShowMessage', props.value.content, 'meta', props.scheme.meta.bar);
}

export function renderCaculation(props: IProps<IDoCaculation>) {
    console.log(props.prefixElement, 'renderCaculation', props.value.a, props.value.op, props.value.b, caculationOp.Caculate(props.value));
}
