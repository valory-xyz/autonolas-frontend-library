import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('<Button />', () => {
  it('should render children into button', () => {
    expect.hasAssertions();
    render(<Button>Button Text</Button>);
    const node = document.querySelector('button');
    expect(node.textContent).toBe('Button Text');
  });

  describe('disabled', () => {
    it('should NOT be disabled by default', () => {
      expect.hasAssertions();
      render(<Button>Button Text</Button>);
      const node = document.querySelector('button');
      expect(node.disabled).toBe(false);
    });

    it('should be disabled when disabled pass', () => {
      expect.hasAssertions();
      render(<Button disabled>Button Text</Button>);
      const node = document.querySelector('button');
      expect(node).toBeDisabled();
    });
  });

  it('should call onClick', () => {
    expect.hasAssertions();
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click Me</Button>,
    );
    const node = getByText('Click Me');
    fireEvent.click(node);
    expect(handleClick).toHaveBeenCalledWith();
  });
});
