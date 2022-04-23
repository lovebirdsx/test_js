import {
 IDoCaculation, ILog, IShowMessage, Op,
} from '../type/action';
import {
 createActionScheme, createEnumScheme, createScheme,
} from './define';

export const intScheme = createScheme<number>({
    createDefault: () => 0,
});

export const floatScheme = createScheme<number>({
    createDefault: () => 0,
});

export const boolScheme = createScheme<boolean>({
    createDefault: () => false,
});

export const stringScheme = createScheme<string>({
    createDefault: () => 'empty',
});

export const opScheme = createEnumScheme<Op>({
    createDefault: () => 'add',
});

export const logScheme = createActionScheme<ILog>({
    name: 'Log',
    fields: {
        content: stringScheme,
    },
});

export const showMessageScheme = createActionScheme<IShowMessage>({
    name: 'ShowMessage',
    fields: {
        content: stringScheme,
    },
});

export const doCaculationScheme = createActionScheme<IDoCaculation>({
    name: 'DoCaculation',
    fields: {
        a: intScheme,
        b: intScheme,
        op: opScheme,
    },
});
