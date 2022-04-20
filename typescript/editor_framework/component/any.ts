import { registry } from '../registry';
import { IProps } from '../scheme/define';
import { IAny } from '../type/action';

export function renderAny(props: IProps<IAny>) {
    const render = registry.getRender<unknown, unknown, IAny>(props.value.type);
    const any = props.value;
    const propsForAny: IProps<unknown, unknown, IAny> = {
        value: any.value,
        parent: any,
        scheme: registry.getScheme(any.type),
        parentScheme: props.scheme,
        onModify: () => {},
        prefixElement: `${props.prefixElement} any`,
    };
    render(propsForAny);
}
