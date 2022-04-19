import { registry } from './public';
import {
 IAny, IDoCaculation, ILog, IShowMessage, ValueType,
} from './type/action';

function createValue<T>(type: ValueType, t: T) {
    return {
        type,
        value: t,
    };
}

const values: {type: ValueType, value: unknown}[] = [
    createValue<boolean>(ValueType.boolean, false),
    createValue<string>(ValueType.string, 'hello world'),
    createValue<number>(ValueType.int, 1),
    createValue<IShowMessage>(ValueType.showMessage, { content: 'hello message' }),
    createValue<ILog>(ValueType.log, { content: 'hello log' }),
    createValue<IDoCaculation>(ValueType.doCaculation, { a: 1, b: 2, op: 'div' }),
    createValue<IAny>(ValueType.any, createValue<ILog>(ValueType.log, { content: 'hello log any' })),
];

values.forEach((value, id) => {
    const render = registry.getRender(value.type);
    if (!render) {
        console.error(`render for ${ValueType[value.type]} is undefined`);
    } else {
        render({
            value: value.value,
            scheme: registry.getScheme(value.type),
            onModify: () => {},
            prefixElement: id.toString(),
        });
    }
});
