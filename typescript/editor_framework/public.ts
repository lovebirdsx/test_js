import { renderCaculation, renderShowMessage, renderLog } from './component/action';
import { renderAny } from './component/any';
import { renderBasic } from './component/basic';
import { registry } from './registry';
import {
 IDoCaculation, IShowMessage, ILog, IAny, ValueType,
} from './type/action';
import { ILogMeta, IShowMessageMeta } from './type/actionMeta';

registry.regType<number>(ValueType.int, { createDefault: () => 0, meta: {} }, renderBasic);
registry.regType<number>(ValueType.float, { createDefault: () => 0, meta: {} }, renderBasic);
registry.regType<boolean>(ValueType.boolean, { createDefault: () => false, meta: {} }, renderBasic);
registry.regType<string>(ValueType.string, { createDefault: () => '', meta: {} }, renderBasic);

registry.regType<IDoCaculation>(ValueType.doCaculation, {
    createDefault: (): IDoCaculation => ({ a: 0, b: 0, op: 'add' }),
    meta: { hideName: true },
}, renderCaculation);

registry.regType<IShowMessage, IShowMessageMeta>(ValueType.showMessage, {
    createDefault: (): IShowMessage => ({ content: 'hello' }),
    meta: { hideName: true, bar: 'metaBar' },
}, renderShowMessage);

registry.regType<ILog, ILogMeta>(ValueType.log, {
    createDefault: (): ILog => ({ content: 'log' }),
    meta: { hideName: true, foo: 'metaFoo' },
}, renderLog);

registry.regType<IAny>(ValueType.any, {
    createDefault: (): IAny => ({ type: ValueType.int, value: 0 }),
    meta: { hideName: true },
}, renderAny);

export * from './registry';
