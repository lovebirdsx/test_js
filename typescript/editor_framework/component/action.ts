import { caculationOp } from '../operation/caculation';
import { IProps } from '../scheme/define';
import { IDoCaculation, ILog, IShowMessage } from '../type/action';
import { ILogMeta, IShowMessageMeta } from '../type/actionMeta';

export function renderLog(props: IProps<ILog, ILogMeta>) {
    console.log(props.prefixElement, 'renderLog', props.value.content, 'meta', props.scheme.meta.foo);
    if (props.parent) {
        console.log('', 'parent type', props.parent);
    }
}

export function renderShowMessage(props: IProps<IShowMessage, IShowMessageMeta>) {
    const { scheme, value } = props;
    console.log(props.prefixElement, scheme.type, value.content, 'meta', scheme.meta.bar);
}

export function renderCaculation(props: IProps<IDoCaculation>) {
    const { scheme, value } = props;
    console.log(props.prefixElement, scheme.type, value.a, value.op, value.b, caculationOp.Caculate(props.value));
}
