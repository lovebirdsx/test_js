import { IMeta } from '../scheme/define';
import { IDynamic } from '../type/action';
import { renderRegistry } from './renderRegistry';
import { schemeRegistry } from '../scheme/public';
import { IProps } from './define';
import { IDynamicMeta } from '../scheme/dynamic';

export function renderDynamic(props: IProps<IDynamic, IDynamicMeta>) {
    const render = renderRegistry.getRender<unknown, unknown, IDynamic>(props.value.type);
    const dynamic = props.value;
    const propsForAny: IProps<unknown, IMeta, IDynamic> = {
        value: dynamic.value,
        parent: dynamic,
        scheme: schemeRegistry.getScheme(dynamic.type),
        parentScheme: props.scheme,
        onModify: () => {},
        prefix: `${props.prefix} dynamic`,
    };
    return render(propsForAny);
}
