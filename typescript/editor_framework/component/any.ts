import { registry } from '../registry';
import { IMeta, IProps } from '../scheme/define';
import { IAny } from '../type/action';

export function renderAny(props: IProps<IAny, IMeta>) {
    const render = registry.getRender(props.value.type);
    const propsForAny: IProps<unknown, IMeta> = {
        value: props.value.value,
        parent: props.value,
        parentScheme: props.scheme,
        scheme: registry.getScheme(props.value.type),
        onModify: () => {},
        prefixElement: `${props.prefixElement} any`,
    };
    render(propsForAny);
}
