import * as React from 'react';
import { act, render } from '@testing-library/react';

describe('react repaint', () => {
  it('simple', () => {
    let renderCount = 0;
    function Component() {
      renderCount++;
      return <div />;
    }

    const c = <Component />;
    render(c);
    expect(renderCount).toBe(1);
  });

  it('forceUpdate', () => {
    let renderCount = 0;
    class Component extends React.Component {
      override render() {
        renderCount++;
        return <button onClick={() => this.forceUpdate()} />;
      }
    }

    const { container } = render(<Component />);
    const button = container.firstChild as HTMLButtonElement;
    act(() => button.dispatchEvent(new MouseEvent('click', { bubbles: true })));

    expect(renderCount).toBe(2);
  });

  it('forceUpdate in function component', () => {
    function useForceUpdate() {
      const [, setState] = React.useState(0);
      return () => setState((s) => s + 1);
    }

    let renderCount = 0;
    function Component() {
      const forceUpdate = useForceUpdate();
      renderCount++;
      return <button onClick={forceUpdate} />;
    }

    const { container } = render(<Component />);
    const button = container.firstChild as HTMLButtonElement;
    act(() => button.dispatchEvent(new MouseEvent('click', { bubbles: true })));

    expect(renderCount).toBe(2);
  });

  it('state change', () => {
    let renderCount = 0;
    function Component() {
      const [state, setState] = React.useState(0);
      renderCount++;
      return <button onClick={() => setState(state + 1)} />;
    }

    const { container } = render(<Component />);
    const button = container.firstChild as HTMLButtonElement;
    act(() => button.dispatchEvent(new MouseEvent('click', { bubbles: true })));

    expect(renderCount).toBe(2);
  });

  it('parent change', () => {
    let childRenderCount = 0;
    function Child() {
      childRenderCount++;
      return <div>Child</div>;
    }

    function Parent() {
      const [value, setValue] = React.useState(0);
      return (
        <div>
          <button onClick={() => setValue(value + 1)} />
          {value}
          <Child />
        </div>
      );
    }

    const { container } = render(<Parent />);
    const button = container.firstChild?.firstChild as HTMLButtonElement;
    act(() => button.dispatchEvent(new MouseEvent('click', { bubbles: true })));

    expect(childRenderCount).toBe(2);
  });

  it('props change', () => {
    let childRenderCount = 0;
    function Child(props: { value: number }) {
      childRenderCount++;
      return <div>{props.value}</div>;
    }

    function Parent() {
      const [value, setValue] = React.useState(0);
      return (
        <div>
          <button onClick={() => setValue(value + 1)} />
          <Child value={value} />
        </div>
      );
    }

    const { container } = render(<Parent />);
    const button = container.firstChild?.firstChild as HTMLButtonElement;
    act(() => button.dispatchEvent(new MouseEvent('click', { bubbles: true })));

    expect(childRenderCount).toBe(2);
  });

  it('child as element', () => {
    let renderCount = 0;
    function Child() {
      renderCount++;
      return <div>Child</div>;
    }

    function Parent() {
      const [value, setValue] = React.useState(0);

      const c = <Child />;
      return (
        <div>
          <button onClick={() => setValue(value + 1)} />
          {c}
        </div>
      );
    }

    const { container } = render(<Parent />);
    const button = container.firstChild?.firstChild as HTMLButtonElement;

    act(() => button.dispatchEvent(new MouseEvent('click', { bubbles: true })));

    expect(renderCount).toBe(2);
  });

  it('context', () => {
    let c1RenderCount = 0;
    const Context = React.createContext(0);

    function Child1() {
      const value = React.useContext(Context);
      c1RenderCount++;
      return <div>{value}</div>;
    }

    let c2RenderCount = 0;
    function Child2() {
      c2RenderCount++;
      return <div>Child2</div>;
    }

    function Parent() {
      const [value, setValue] = React.useState(0);
      return (
        <div>
          <Context.Provider value={value}>
            <button onClick={() => setValue(value + 1)} />
            <Child1 />
          </Context.Provider>
          <Child2 />
        </div>
      );
    }

    const { container } = render(<Parent />);
    const button = container.firstChild?.firstChild as HTMLButtonElement;
    act(() => button.dispatchEvent(new MouseEvent('click', { bubbles: true })));

    expect(c1RenderCount).toBe(2);
    expect(c2RenderCount).toBe(2);
  });
});
