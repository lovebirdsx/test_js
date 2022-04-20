import { renderRegistry } from './render/public';
import { schemeRegistry } from './scheme/public';
import {
    IDynamic, IDoCaculation, ILog, IShowMessage, DataType,
} from './type/action';

function createValue<T>(type: DataType, t: T) {
    return {
        type,
        value: t,
    };
}

const values: {type: DataType, value: unknown}[] = [
    createValue<boolean>(DataType.boolean, false),
    createValue<string>(DataType.string, 'hello world'),
    createValue<number>(DataType.int, 1),
    createValue<IShowMessage>(DataType.showMessage, { content: 'hello message' }),
    createValue<ILog>(DataType.log, { content: 'hello log' }),
    createValue<IDoCaculation>(DataType.doCaculation, { a: 1, b: 2, op: 'div' }),
    createValue<IDynamic>(DataType.any, createValue<ILog>(DataType.log, { content: 'hello log any' })),
];

values.forEach((value, id) => {
    const scheme = schemeRegistry.getScheme(value.type);
    const render = renderRegistry.getRender(scheme.renderType);
    render({
        value: value.value,
        scheme,
        parent: undefined,
        onModify: () => {},
        prefix: id.toString(),
    });
});
