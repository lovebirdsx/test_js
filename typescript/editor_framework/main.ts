import { renderRegistry } from './render/public';
import { ActionScheme, getSchemeClass, Scheme } from './scheme/define';
import {
  DynamicActionScheme, boolScheme, doCaculationScheme, intScheme, logScheme, showMessageScheme, showTalkScheme, stringScheme, normalActionScheme,
} from './scheme/public';
import {
    IDoCaculation,
    ILog,
    IShowMessage,
    IShowTalk,
} from './type/action';

interface TestSlot {
    scheme: Scheme;
    value: unknown;
}

function createValue<T>(scheme: Scheme<T>, t: T): TestSlot {
    return {
        scheme,
        value: t,
    };
}

function createDynamicAction<T>(actionScheme: ActionScheme<T>, t: T): TestSlot {
    return {
        scheme: normalActionScheme,
        value: DynamicActionScheme.createAction(actionScheme.name, t),
    };
}

const tests: TestSlot[] = [
    createValue<boolean>(boolScheme, false),
    createValue<string>(stringScheme, 'hello world'),
    createValue<number>(intScheme, 1),
    createValue<IShowMessage>(showMessageScheme, {
        content: 'hello message',
    }),
    createValue<ILog>(logScheme, { content: 'hello log' }),
    createValue<IDoCaculation>(doCaculationScheme, {
        a: 1,
        b: 2,
        op: 'div',
    }),
    createValue<IShowTalk>(showTalkScheme, {
        resetCamera: false,
        items: [
            { who: 'lovebird1', content: 'hello 1' },
            { who: 'lovebird2', content: 'hello 2' },
        ],
    }),

    createDynamicAction<ILog>(logScheme, { content: 'hello log any' }),

    createDynamicAction<IDoCaculation>(doCaculationScheme, { a: 1, b: 2, op: 'div' }),
];

tests.forEach((test, id) => {
    const schemeClass = getSchemeClass(test.scheme);
    const render = renderRegistry.getRender(schemeClass);
    console.log(
        render({
            value: test.value,
            scheme: test.scheme,
            prefix: `${id} `,
        }),
    );
});
