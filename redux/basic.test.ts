// eslint-disable-next-line camelcase
import { legacy_createStore } from '@reduxjs/toolkit';
import { it, expect } from '@jest/globals';

it('should increment', () => {
    // eslint-disable-next-line default-param-last
    function createReducer(state = { value: 0 }, action: any) {
        switch (action.type) {
            case 'increment':
                return { value: state.value + 1 };
            case 'decrement':
                return { value: state.value - 1 };
            default:
                return state;
        }
    }

    const store = legacy_createStore(createReducer);
    store.dispatch({ type: 'increment' });
    expect(store.getState()).toEqual({ value: 1 });
});
