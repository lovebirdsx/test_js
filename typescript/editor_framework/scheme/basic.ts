import {
 DataType, IDoCaculation, ILog, IShowMessage, Op,
} from '../type/action';
import { createObjectScheme, createScheme, RenderType } from './define';
import { schemeRegistry } from './schemeRegistry';

schemeRegistry.regScheme<number>(DataType.int, createScheme(RenderType.int, () => 0, undefined));
schemeRegistry.regScheme<number>(DataType.float, createScheme(RenderType.float, () => 0, undefined));
schemeRegistry.regScheme<boolean>(DataType.boolean, createScheme(RenderType.boolean, () => false, undefined));
schemeRegistry.regScheme<string>(DataType.string, createScheme(RenderType.string, () => '', undefined));

const opScheme = createScheme<Op>(RenderType.string, () => 'add', undefined);
schemeRegistry.regScheme(DataType.op, opScheme);

const logScheme = createObjectScheme<ILog>({
    content: schemeRegistry.getScheme(DataType.string),
});
schemeRegistry.regObjScheme(DataType.log, logScheme);

const showMessageScheme = createObjectScheme<IShowMessage>({
    content: schemeRegistry.getScheme(DataType.string),
});
schemeRegistry.regObjScheme(DataType.showMessage, showMessageScheme);

const caculationScheme = createObjectScheme<IDoCaculation>({
    a: schemeRegistry.getScheme(DataType.int),
    b: schemeRegistry.getScheme(DataType.int),
    op: schemeRegistry.getScheme(DataType.op),
});
schemeRegistry.regObjScheme(DataType.doCaculation, caculationScheme);
