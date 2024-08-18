import * as React from 'react';
import { act, render } from '@testing-library/react';

type Action = { type: 'increment' } | { type: 'decrement' } | { type: 'reset', payload: number };

function reducer(state: { count: number }, action: Action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: action.payload };
    default:
      throw new Error();
  }
}

describe('react reducer', () => {
  it('basic', () => {
    let incrementCount = 0;
    function Increment({ dispatch }: { dispatch: React.Dispatch<Action> }) {
      incrementCount++;
      return <button onClick={() => dispatch({ type: 'increment' })}>+</button>;
    }

    let decrementCount = 0;
    function Decrement({ dispatch }: { dispatch: React.Dispatch<Action> }) {
      decrementCount++;
      return <button onClick={() => dispatch({ type: 'decrement' })}>-</button>;
    }

    let count = 0;
    function App() {
      const [state, dispatch] = React.useReducer(reducer, { count: 0 });
      count++;
      return (
        <div>
          <Increment dispatch={dispatch} />
          <Decrement dispatch={dispatch} />
          Count: {state.count}
        </div>
      );
    }

    const { container } = render(<App />);
    const buttons = container.querySelectorAll('button');
    act(() => buttons[0].dispatchEvent(new MouseEvent('click', { bubbles: true })));
    act(() => buttons[1].dispatchEvent(new MouseEvent('click', { bubbles: true })));

    expect(incrementCount).toBe(3);
    expect(decrementCount).toBe(3);
    expect(count).toBe(3);
  });

  it('basic with memo', () => {
    let incrementCount = 0;
    const Increment = React.memo(({ dispatch }: { dispatch: React.Dispatch<Action> }) => {
      incrementCount++;
      return <button onClick={() => dispatch({ type: 'increment' })}>+</button>;
    });

    let decrementCount = 0;
    const Decrement = React.memo(({ dispatch }: { dispatch: React.Dispatch<Action> }) => {
      decrementCount++;
      return <button onClick={() => dispatch({ type: 'decrement' })}>-</button>;
    });

    let count = 0;
    function App() {
      const [state, dispatch] = React.useReducer(reducer, { count: 0 });
      count++;
      return (
        <div>
          <Increment dispatch={dispatch} />
          <Decrement dispatch={dispatch} />
          Count: {state.count}
        </div>
      );
    }

    const { container } = render(<App />);
    const buttons = container.querySelectorAll('button');
    act(() => buttons[0].dispatchEvent(new MouseEvent('click', { bubbles: true })));
    act(() => buttons[1].dispatchEvent(new MouseEvent('click', { bubbles: true })));

    expect(incrementCount).toBe(1);
    expect(decrementCount).toBe(1);
    expect(count).toBe(3);
  });

  // 在使用 context 的情况下，即便使用了 memo，也会导致重复渲染
  it('with context', () => {
    const CountContext = React.createContext<{ count: number, dispatch: React.Dispatch<Action> }>({ count: 0, dispatch: () => { } });

    function CountContextProvider({ children }: { children: React.ReactNode }) {
      const [state, dispatch] = React.useReducer(reducer, { count: 0 });
      return <CountContext.Provider value={{ count: state.count, dispatch }}>{children}</CountContext.Provider>;
    }

    let incrementCount = 0;
    const Increment = React.memo(() => {
      const { dispatch } = React.useContext(CountContext);
      incrementCount++;
      return <button onClick={() => dispatch({ type: 'increment' })}>+</button>;
    });

    let decrementCount = 0;
    const Decrement = React.memo(() => {
      const { dispatch } = React.useContext(CountContext)!;
      decrementCount++;
      return <button onClick={() => dispatch({ type: 'decrement' })}>-</button>;
    });

    let showCount = 0;
    function Show() {
      const { count } = React.useContext(CountContext);
      showCount++;
      return <div>Count: {count}</div>;
    }

    function App() {
      return (
        <CountContextProvider>
          <Increment />
          <Decrement />
          <Show />
        </CountContextProvider>
      );
    }

    const { container } = render(<App />);
    const buttons = container.querySelectorAll('button');
    act(() => buttons[0].dispatchEvent(new MouseEvent('click', { bubbles: true })));
    act(() => buttons[1].dispatchEvent(new MouseEvent('click', { bubbles: true })));

    expect(showCount).toBe(3);
    expect(incrementCount).toBe(3);
    expect(decrementCount).toBe(3);
  });

  // 将 state 和 dispatch 分开放在不同的 context 中，可以避免重复渲染
  it('context separate state and dispatch', () => {
    const CountStateContext = React.createContext<{ count: number }>({ count: 0 });
    const CountDispatchContext = React.createContext<React.Dispatch<Action>>(() => { });

    function CountContextProvider({ children }: { children: React.ReactNode }) {
      const [state, dispatch] = React.useReducer(reducer, { count: 0 });
      return <CountStateContext.Provider value={{ count: state.count }}>
        <CountDispatchContext.Provider value={dispatch}>
          {children}
        </CountDispatchContext.Provider>
      </CountStateContext.Provider>;
    }

    let incrementCount = 0;
    function Increment() {
      const dispatch = React.useContext(CountDispatchContext);
      incrementCount++;
      return <button onClick={() => dispatch({ type: 'increment' })}>+</button>;
    }

    let decrementCount = 0;
    function Decrement() {
      const dispatch = React.useContext(CountDispatchContext);
      decrementCount++;
      return <button onClick={() => dispatch({ type: 'decrement' })}>-</button>;
    }

    let showCount = 0;
    function Show() {
      const { count } = React.useContext(CountStateContext);
      showCount++;
      return <div>Count: {count}</div>;
    }

    function App() {
      return (
        <CountContextProvider>
          <Increment />
          <Decrement />
          <Show />
        </CountContextProvider>
      );
    }

    const { container } = render(<App />);
    const buttons = container.querySelectorAll('button');
    act(() => buttons[0].dispatchEvent(new MouseEvent('click', { bubbles: true })));
    act(() => buttons[1].dispatchEvent(new MouseEvent('click', { bubbles: true })));

    expect(showCount).toBe(3);
    expect(incrementCount).toBe(1);
    expect(decrementCount).toBe(1);
  });
});
