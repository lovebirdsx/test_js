import { describe, it } from '@jest/globals';

type TAction = 'Incement' | 'Decrement' | 'Set' | 'Error';

interface IAction {
    type: TAction;
    count: number;
}

function createStore() {
    let state = {
        count: 0
    };

    function dispatch(action: IAction) {
        switch (action.type) {
            case 'Incement':
                state.count += action.count;
                break;
            case 'Decrement':
                state.count -= action.count;
                break;
            case 'Set':
                state.count = action.count;
                break;
            case 'Error':
                throw new Error('Error');

            default:
                break;
        }
    }

    return {
        dispatch,
        state
    }
}

const store = createStore();
jest.mock('console');
console.log = jest.fn();
const logSpy = jest.spyOn(console, 'log');

afterAll(() => {
    jest.restoreAllMocks();
});

beforeEach(() => {
    store.dispatch({
        type: 'Set',
        count: 0
    });
});

describe('redux origin', () => {
    it('should increment', () => {
        const action: IAction = {
            type: 'Incement',
            count: 1
        };
        store.dispatch(action);
        expect(store.state.count).toBe(1);
    });

    it('should decrement', () => {
        const action: IAction = {
            type: 'Decrement',
            count: 1
        };
        store.dispatch(action);
        expect(store.state.count).toBe(-1);
    });
});

// 封装 dispatch 函数
describe('redux middleware 1', () => {
    function dispatchAndLog(action: IAction) {
        console.log('dispatching', action);
        store.dispatch(action);
        console.log('next state', store.state);
    }

    beforeEach(() => {
        logSpy.mockClear();
    });
    
    it('log should be called', () => {
        const action: IAction = {
            type: 'Incement',
            count: 1
        };
        dispatchAndLog(action);
        expect(logSpy).toHaveBeenCalledWith('dispatching', action);
        expect(logSpy).toHaveBeenCalledWith('next state', { count: 1 });
    });
});


// 给 dispatch做Monkeypatch
describe('redux middleware 2', () => {
    const next = store.dispatch;

    beforeAll(() => {
        store.dispatch = function dispatchAndLog(action: IAction) {
            console.log('dispatching', action);
            const result = next(action);
            console.log('next state', store.state);
            return result;
        }
    });
    
    afterAll(() => {
        store.dispatch = next;
    });

    beforeEach(() => {
        logSpy.mockClear();
    });

    
    it('log should be called', () => {
        const action: IAction = {
            type: 'Incement',
            count: 1
        };
        store.dispatch(action);
        expect(logSpy).toHaveBeenCalledWith('dispatching', action);
        expect(logSpy).toHaveBeenCalledWith('next state', { count: 1 });
    });
});

// 异常监控
describe('redux middleware 3', () => {
    const next = store.dispatch;

    function patchStoreToAddLoggin() {
        const next = store.dispatch;
        store.dispatch = function dispatchAndLog(action: IAction) {
            console.log('dispatching', action);
            const result = next(action);
            console.log('next state', store.state);
            return result;
        }
    }

    function patchStoreToAddCrashReporting() {
        const next = store.dispatch;
        store.dispatch = function dispatchAndReportErrors(action: IAction) {
            try {
                return next(action);
            } catch (err) {
                console.log('Caught an exception!');
                throw err;
            }
        }
    }

    beforeEach(() => {
        logSpy.mockClear();
        patchStoreToAddLoggin();
        patchStoreToAddCrashReporting();
    });

    afterEach(() => {
        store.dispatch = next;
    });

    it('log and exception should be called', () => {
        const action: IAction = {
            type: 'Error',
            count: 1
        };
        expect(() => {
            store.dispatch(action);
        }).toThrowError('Error');
        expect(logSpy).toHaveBeenCalledWith('dispatching', action);
        expect(logSpy).toHaveBeenCalledWith('Caught an exception!');
    });
});

// 隐藏 Monkeypatch
describe('redux middleware 4', () => {
    function logger() {
        const next = store.dispatch;
        return function dispatchAndLog(action: IAction) {
            console.log('dispatching', action);
            const result = next(action);
            console.log('next state', store.state);
            return result;
        }
    }

    function crashReporter() {
        const next = store.dispatch;
        return function dispatchAndReportErrors(action: IAction) {
            try {
                return next(action);
            } catch (err) {
                console.log('Caught an exception!');
                throw err;
            }
        }
    }

    function applyMiddlewareByMonkeypatching(store: any, middlewares: ((action: IAction) => void)[]) {
        middlewares = middlewares.slice();
        middlewares.reverse();
        middlewares.forEach(middleware => {
            store.dispatch = middleware(store);
        });
    }

    beforeEach(() => {
        logSpy.mockClear();
        applyMiddlewareByMonkeypatching(store, [logger, crashReporter]);
    });

    const next = store.dispatch;
    afterEach(() => {
        store.dispatch = next;
    });

    it('log and exception should be called', () => {
        const action: IAction = {
            type: 'Error',
            count: 1
        };
        expect(() => {
            store.dispatch(action);
        }).toThrowError('Error');
        expect(logSpy).toHaveBeenCalledWith('dispatching', action);
        expect(logSpy).toHaveBeenCalledWith('Caught an exception!');
    });
});
