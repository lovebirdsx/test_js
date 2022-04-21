import { renderRegistry } from './render/public';
import { ActionSchemeClass, SchemeClass } from './scheme/define';
import {
 BooleanScheme, DoCaculationScheme, ActionScheme, IntScheme, LogScheme, NormalActionScheme, schemeRegistry, ShowMessageScheme, ShowTalkScheme, StringScheme,
} from './scheme/public';
import {
    IDoCaculation,
    ILog,
    IShowMessage,
    IShowTalk,
} from './type/action';

interface TestSlot {
    SchemeClass: SchemeClass;
    value: unknown;
}

function createValue<T>(SchemeClass: SchemeClass<T>, t: T): TestSlot {
    return {
        SchemeClass,
        value: t,
    };
}

function createAction<T>(ActionSchemeClass: ActionSchemeClass, t: T): TestSlot {
    const actionScheme = schemeRegistry.getActionSchemeByClass(ActionSchemeClass);
    return {
        SchemeClass: NormalActionScheme,
        value: ActionScheme.createAction(actionScheme.name, t),
    };
}

const tests: TestSlot[] = [
    createValue<boolean>(BooleanScheme, false),
    createValue<string>(StringScheme, 'hello world'),
    createValue<number>(IntScheme, 1),
    createValue<IShowMessage>(ShowMessageScheme, {
        content: 'hello message',
    }),
    createValue<ILog>(LogScheme, { content: 'hello log' }),
    createValue<IDoCaculation>(DoCaculationScheme, {
        a: 1,
        b: 2,
        op: 'div',
    }),
    createValue<IShowTalk>(ShowTalkScheme, {
        resetCamera: false,
        items: [
            { who: 'lovebird1', content: 'hello 1' },
            { who: 'lovebird2', content: 'hello 2' },
        ],
    }),

    createAction<ILog>(LogScheme, { content: 'hello log any' }),
    createAction<IDoCaculation>(DoCaculationScheme, { a: 1, b: 2, op: 'div' }),
];

tests.forEach((test, id) => {
    const scheme = new test.SchemeClass();
    const render = renderRegistry.getRender(test.SchemeClass);
    console.log(
        render({
            value: test.value,
            scheme,
            parent: undefined,
            prefix: `${id} `,
        }),
    );
});
