import { renderCaculation, renderShowMessage, renderLog } from './component/action';
import { renderAny } from './component/any';
import { renderBasic } from './component/basic';
import { registry } from './registry';
import {
 IDoCaculation, IShowMessage, ILog, IAny, DataType,
} from './type/action';
import { ILogMeta, IShowMessageMeta } from './type/actionMeta';

registry.regType<number>(DataType.int, { createDefault: () => 0, meta: {} }, renderBasic);
registry.regType<number>(DataType.float, { createDefault: () => 0, meta: {} }, renderBasic);
registry.regType<boolean>(DataType.boolean, { createDefault: () => false, meta: {} }, renderBasic);
registry.regType<string>(DataType.string, { createDefault: () => '', meta: {} }, renderBasic);

registry.regType<IDoCaculation>(DataType.doCaculation, {
    createDefault: (): IDoCaculation => ({ a: 0, b: 0, op: 'add' }),
    meta: { hideName: true },
}, renderCaculation);

registry.regType<IShowMessage, IShowMessageMeta>(DataType.showMessage, {
    createDefault: (): IShowMessage => ({ content: 'hello' }),
    meta: { hideName: true, bar: 'metaBar' },
}, renderShowMessage);

registry.regType<ILog, ILogMeta>(DataType.log, {
    createDefault: (): ILog => ({ content: 'log' }),
    meta: { hideName: true, foo: 'metaFoo' },
}, renderLog);

registry.regType<IAny>(DataType.any, {
    createDefault: (): IAny => ({ type: DataType.int, value: 0 }),
    meta: { hideName: true },
}, renderAny);

export * from './registry';
