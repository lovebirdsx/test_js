import { renderToString } from "react-dom/server";

describe('react component', () => {
  it('should render', () => {
    function Message(props: { message: string }) {
      return (
        <div>{props.message}</div>
      );
    }

    const c = Message({ message: 'Hello' });
    const s = renderToString(c);
    expect(s).toBe('<div>Hello</div>');
  });
})