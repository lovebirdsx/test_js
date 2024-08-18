import * as React from 'react';
import { act, render } from '@testing-library/react';

describe('react repaint', () => {
  describe('state', () => {
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
  });

  describe('props', () => {
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
  });

  describe('children', () => {
    it('parent change', () => {
      let childRenderCount = 0;
      function Child() {
        childRenderCount++;
        return <div>Child</div>;
      }

      function Parent(props: { children: React.ReactNode }) {
        const [value, setValue] = React.useState(0);
        return (
          <div>
            <button onClick={() => setValue(value + 1)} />
            {value}
            {props.children}
          </div>
        );
      }

      const { container } = render(<Parent><Child/></Parent>);
      const button = container.firstChild?.firstChild as HTMLButtonElement;
      act(() => button.dispatchEvent(new MouseEvent('click', { bubbles: true })));

      expect(childRenderCount).toBe(1);
    });
  });

  describe('calculated value', () => {
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
  });

  describe('context', () => {
    // context的变化会导致context下的所有子组件重新渲染
    it('context', () => {
      const ThemeContext = React.createContext('light');

      let headCount = 0;
      function Header() {
        const value = React.useContext(ThemeContext);
        headCount++;
        return <div>{value}</div>;
      }

      let contentCount = 0;
      function Content() {
        contentCount++;
        return <div>Content</div>;
      }

      function App() {
        const [theme, setTheme] = React.useState('light');
        return (
          <div>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
            <ThemeContext.Provider value={theme}>
              <Header />
              <Content />
            </ThemeContext.Provider>
          </div>
        );
      }

      const { container } = render(<App />);
      const button = container.firstChild?.firstChild as HTMLButtonElement;
      act(() => button.dispatchEvent(new MouseEvent('click', { bubbles: true })));

      expect(headCount).toBe(2);
      expect(contentCount).toBe(2);
    });

    // 使用memo可以避免context变化导致的重复渲染
    it('context with memo', () => {
      const ThemeContext = React.createContext('light');

      let headCount = 0;
      function Header() {
        const value = React.useContext(ThemeContext);
        headCount++;
        return <div>{value}</div>;
      }

      let contentCount = 0;
      const Content = React.memo(() => {
        contentCount++;
        return <div>Content</div>;
      });

      function App() {
        const [theme, setTheme] = React.useState('light');
        return (
          <div>
            <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
            <ThemeContext.Provider value={theme}>
              <Header />
              <Content />
            </ThemeContext.Provider>
          </div>
        );
      }

      const { container } = render(<App />);
      const button = container.firstChild?.firstChild as HTMLButtonElement;
      act(() => button.dispatchEvent(new MouseEvent('click', { bubbles: true })));

      expect(headCount).toBe(2);
      expect(contentCount).toBe(1);
    });
  });
});
