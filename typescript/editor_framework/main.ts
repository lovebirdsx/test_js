import { registry } from './public';
import {
    IAny, IDoCaculation, ILog, IShowMessage, DataType,
} from './type/action';

function createValue<T, M=undefined>(type: DataType, t: T, m?: M) {
    return {
        type,
        value: t,
        meta: m,
    };
}

const values: {type: DataType, value: unknown}[] = [
    createValue<boolean>(DataType.boolean, false),
    createValue<string>(DataType.string, 'hello world'),
    createValue<number>(DataType.int, 1),
    createValue<IShowMessage>(DataType.showMessage, { content: 'hello message' }),
    createValue<ILog>(DataType.log, { content: 'hello log' }),
    createValue<IDoCaculation>(DataType.doCaculation, { a: 1, b: 2, op: 'div' }),
    createValue<IAny>(DataType.any, createValue<ILog>(DataType.log, { content: 'hello log any' })),
];

values.forEach((value, id) => {
    const render = registry.getRender(value.type);
    render({
        value: value.value,
        scheme: registry.getScheme(value.type),
        parent: undefined,
        onModify: () => {},
        prefixElement: id.toString(),
    });
});
