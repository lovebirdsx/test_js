import React from 'react';
import { render } from '@testing-library/react';

describe('react', () => {
  it('simple', () => {
    const { getByText } = render(<div>hello</div>);
  });
});
