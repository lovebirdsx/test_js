import { it, expect } from '@jest/globals';
import { createSlice, configureStore } from '@reduxjs/toolkit';

it('should be increment', () => {
    const counterSlice = createSlice({
        name: 'counter',
        initialState: {
            value: 0,
        },
        reducers: {
            increment: (state) => {
                state.value += 1;
            },
            decrement: (state) => {
                state.value -= 1;
            },
        },
    });

    const { increment, decrement } = counterSlice.actions;
    const store = configureStore({
        reducer: counterSlice.reducer,
    });

    store.dispatch(increment());
    expect(store.getState()).toEqual({ value: 1 });
    store.dispatch(decrement());
    expect(store.getState()).toEqual({ value: 0 });
});
