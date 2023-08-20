import {
    describe, it, jest, afterAll, beforeEach, expect, beforeAll, afterEach,
} from '@jest/globals';

type TAction = 'Incement' | 'Decrement' | 'Set' | 'Error';

interface IAction {
    type: TAction;
    count: number;
}

function createStore() {
    const state = {
        count: 0,
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
        state,
    };
}

const store = createStore();
type TStore = typeof store;
jest.mock('console');
console.log = jest.fn();
const logSpy = jest.spyOn(console, 'log');

afterAll(() => {
    jest.restoreAllMocks();
});

beforeEach(() => {
    logSpy.mockClear();
    store.dispatch({
        type: 'Set',
        count: 0,
    });
});

describe('redux origin', () => {
    it('should increment', () => {
        const action: IAction = {
            type: 'Incement',
            count: 1,
        };
        store.dispatch(action);
        expect(store.state.count).toBe(1);
    });

    it('should decrement', () => {
        const action: IAction = {
            type: 'Decrement',
            count: 1,
        };
        store.dispatch(action);
        expect(store.state.count).toBe(-1);
    });
});

// 封装 dispatch 函数
// https://www.reduxjs.cn/understanding/history-and-design/middleware#尝试-2-封装-dispatch
describe('redux middleware 1', () => {
    function dispatchAndLog(action: IAction) {
        console.log('dispatching', action);
        store.dispatch(action);
        console.log('next state', store.state);
    }

    it('log should be called', () => {
        const action: IAction = {
            type: 'Incement',
            count: 1,
        };
        dispatchAndLog(action);
        expect(logSpy).toHaveBeenCalledWith('dispatching', action);
        expect(logSpy).toHaveBeenCalledWith('next state', { count: 1 });
    });
});

// 给 dispatch做Monkeypatch
// https://www.reduxjs.cn/understanding/history-and-design/middleware#尝试-3-给-dispatch-做猴子补丁monkeypatch
describe('redux middleware 2', () => {
    const next = store.dispatch;

    beforeAll(() => {
        store.dispatch = function dispatchAndLog(action: IAction) {
            console.log('dispatching', action);
            const result = next(action);
            console.log('next state', store.state);
            return result;
        };
    });

    afterAll(() => {
        store.dispatch = next;
    });

    it('log should be called', () => {
        const action: IAction = {
            type: 'Incement',
            count: 1,
        };
        store.dispatch(action);
        expect(logSpy).toHaveBeenCalledWith('dispatching', action);
        expect(logSpy).toHaveBeenCalledWith('next state', { count: 1 });
    });
});

// 异常监控
// https://www.reduxjs.cn/understanding/history-and-design/middleware#问题-异常监控
describe('redux middleware 3', () => {
    const next = store.dispatch;

    function patchStoreToAddLoggin() {
        const next = store.dispatch;
        store.dispatch = function dispatchAndLog(action: IAction) {
            console.log('dispatching', action);
            const result = next(action);
            console.log('next state', store.state);
            return result;
        };
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
        };
    }

    beforeEach(() => {
        patchStoreToAddLoggin();
        patchStoreToAddCrashReporting();
    });

    afterEach(() => {
        store.dispatch = next;
    });

    it('log and exception should be called', () => {
        const action: IAction = {
            type: 'Error',
            count: 1,
        };
        expect(() => {
            store.dispatch(action);
        }).toThrowError('Error');
        expect(logSpy).toHaveBeenCalledWith('dispatching', action);
        expect(logSpy).toHaveBeenCalledWith('Caught an exception!');
    });
});

// 隐藏 Monkeypatch
// https://www.reduxjs.cn/understanding/history-and-design/middleware#尝试-4-隐藏猴子补丁
describe('redux middleware 4', () => {
    function logger() {
        const next = store.dispatch;
        return function dispatchAndLog(action: IAction) {
            console.log('dispatching', action);
            const result = next(action);
            console.log('next state', store.state);
            return result;
        };
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
        };
    }

    function applyMiddlewareByMonkeypatching(store: any, middlewares: ((action: IAction) => void)[]) {
        const middlewares1 = middlewares.slice();
        middlewares1.reverse();
        middlewares1.forEach((middleware) => {
            store.dispatch = middleware(store);
        });
    }

    beforeEach(() => {
        applyMiddlewareByMonkeypatching(store, [logger, crashReporter]);
    });

    const next = store.dispatch;
    afterEach(() => {
        store.dispatch = next;
    });

    it('log and exception should be called', () => {
        const action: IAction = {
            type: 'Error',
            count: 1,
        };
        expect(() => {
            store.dispatch(action);
        }).toThrowError('Error');
        expect(logSpy).toHaveBeenCalledWith('dispatching', action);
        expect(logSpy).toHaveBeenCalledWith('Caught an exception!');
    });
});

// 移除 Monkeypatch
// https://www.reduxjs.cn/understanding/history-and-design/middleware#尝试-5-移除猴子补丁
describe('redux middleware 5', () => {
    function logger(store: TStore) {
        return function wrapDispatchToAddLogging(next: (action: IAction) => void) {
            return function dispatchAndLog(action: IAction) {
                console.log('dispatching', action);
                const result = next(action);
                console.log('next state', store.state);
                return result;
            };
        };
    }

    function crashReporter(store: TStore) {
        return function wrapDispatchToAddCrashReporting(next: (action: IAction) => void) {
            return function dispatchAndReportErrors(action: IAction) {
                try {
                    return next(action);
                } catch (err) {
                    console.log('Caught an exception!');
                    throw err;
                }
            };
        };
    }

    function applyMiddleware(store: TStore, middlewares: ((store: TStore) => (next: (action: IAction) => void) => (action: IAction) => void)[]) {
        middlewares.slice().reverse().forEach((middleware) => {
            store.dispatch = middleware(store)(store.dispatch);
        });
    }

    beforeEach(() => {
        applyMiddleware(store, [logger, crashReporter]);
    });

    const next = store.dispatch;
    afterEach(() => {
        store.dispatch = next;
    });

    it('log and exception should be called', () => {
        const action: IAction = {
            type: 'Error',
            count: 1,
        };
        expect(() => {
            store.dispatch(action);
        }).toThrowError('Error');
        expect(logSpy).toHaveBeenCalledWith('dispatching', action);
        expect(logSpy).toHaveBeenCalledWith('Caught an exception!');
    });
});

// 最后的实现
// https://www.reduxjs.cn/understanding/history-and-design/middleware#最后的实现
describe('redux middleware 6', () => {
    const logger = (store: TStore) => (next: (action: IAction) => void) => (action: IAction) => {
        console.log('dispatching', action);
        const result = next(action);
        console.log('next state', store.state);
        return result;
    };

    const crashReporter = (store: TStore) => (next: (action: IAction) => void) => (action: IAction) => {
        try {
            return next(action);
        } catch (err) {
            console.log('Caught an exception!');
            throw err;
        }
    };

    function applyMiddleware(store: TStore, middlewares: ((store: TStore) => (next: (action: IAction) => void) => (action: IAction) => void)[]) {
        middlewares.slice().reverse().forEach((middleware) => {
            store.dispatch = middleware(store)(store.dispatch);
        });
    }

    beforeEach(() => {
        applyMiddleware(store, [logger, crashReporter]);
    });

    const next = store.dispatch;
    afterEach(() => {
        store.dispatch = next;
    });

    it('log and exception should be called', () => {
        const action: IAction = {
            type: 'Error',
            count: 1,
        };
        expect(() => {
            store.dispatch(action);
        }).toThrowError('Error');
        expect(logSpy).toHaveBeenCalledWith('dispatching', action);
        expect(logSpy).toHaveBeenCalledWith('Caught an exception!');
    });
});
