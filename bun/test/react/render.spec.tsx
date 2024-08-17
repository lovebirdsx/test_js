import React from "react";
import { renderToString } from "react-dom/server";
import { render } from '@testing-library/react'

describe('react render', () => {
  it('simple', () => {
    let renderCount = 0;
    function Component() {
      renderCount++;
      return <div />;
    }
    
    renderToString(<Component />);
    expect(renderCount).toBe(1);
  });

  it('forceUpdate', () => {
    let renderCount = 0;
    class Component extends React.Component {
      render() {
        renderCount++;
        return <div />;
      }
    }
    
    const { container } = render(<Component />);
    container.firstChild!.forceUpdate();
    expect(renderCount).toBe(2);
  });
});
