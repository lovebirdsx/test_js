import { renderCaculation, renderShowMessage, renderLog } from './component/action';
import { renderAny } from './component/any';
import { renderBasic } from './component/basic';
import { registry } from './registry';
import {
 IDoCaculation, IShowMessage, ILog, IAny, DataType,
} from './type/action';
import { ILogMeta, IShowMessageMeta } from './type/actionMeta';

registry.regData<number>(DataType.int, { createDefault: () => 0, meta: undefined }, renderBasic);
registry.regData<number>(DataType.float, { createDefault: () => 0, meta: undefined }, renderBasic);
registry.regData<boolean>(DataType.boolean, { createDefault: () => false, meta: {} }, renderBasic);
registry.regData<string>(DataType.string, { createDefault: () => '', meta: {} }, renderBasic);

registry.regData<IDoCaculation>(DataType.doCaculation, {
    createDefault: (): IDoCaculation => ({ a: 0, b: 0, op: 'add' }),
    meta: { hideName: true },
}, renderCaculation);

registry.regData<IShowMessage, IShowMessageMeta>(DataType.showMessage, {
    createDefault: (): IShowMessage => ({ content: 'hello' }),
    meta: { bar: 'metaBar' },
}, renderShowMessage);

registry.regData<ILog, ILogMeta>(DataType.log, {
    createDefault: (): ILog => ({ content: 'log' }),
    meta: { foo: 'metaFoo' },
}, renderLog);

registry.regData<IAny>(DataType.any, {
    createDefault: (): IAny => ({ type: DataType.int, value: 0 }),
    meta: { hideName: true },
}, renderAny);

export * from './registry';
