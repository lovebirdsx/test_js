import { renderCaculation, renderShowMessage, renderLog } from './component/action';
import { renderAny } from './component/any';
import { renderBasic } from './component/basic';
import { registry } from './registry';
import {
 IDoCaculation, IShowMessage, ILog, IAny, ValueType,
} from './type/action';

registry.regType<number>(ValueType.int, { createDefault: () => 0 }, renderBasic);
registry.regType<number>(ValueType.float, { createDefault: () => 0 }, renderBasic);
registry.regType<boolean>(ValueType.boolean, { createDefault: () => false }, renderBasic);
registry.regType<string>(ValueType.string, { createDefault: () => '' }, renderBasic);

registry.regType<IDoCaculation>(ValueType.doCaculation, {
    createDefault: (): IDoCaculation => ({ a: 0, b: 0, op: 'add' }),
}, renderCaculation);

registry.regType<IShowMessage>(ValueType.showMessage, {
    createDefault: (): IShowMessage => ({ content: 'hello' }),
}, renderShowMessage);

registry.regType<ILog>(ValueType.log, {
    createDefault: (): ILog => ({ content: 'log' }),
}, renderLog);

registry.regType<IAny>(ValueType.any, {
    createDefault: (): IAny => ({ type: ValueType.int, value: 0 }),
}, renderAny);

export * from './registry';
