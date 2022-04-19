import { registry } from '../registry';
import { IProps } from '../scheme/define';
import { IAny } from '../type/action';

export function renderAny(props: IProps<IAny>) {
    const render = registry.getRender(props.value.type);
    const propsForAny: IProps<unknown> = {
        value: props.value.value,
        scheme: registry.getScheme(props.value.type),
        onModify: () => {},
        prefixElement: `${props.prefixElement} any`,
    };
    render(propsForAny);
}
