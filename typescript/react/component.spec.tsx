import * as React from 'react';
import { act, render } from '@testing-library/react';

describe('react render', () => {
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
});
