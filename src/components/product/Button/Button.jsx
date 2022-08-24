import React, { forwardRef } from 'react';
import propTypes from 'prop-types';
import { Button as AntButton } from 'antd';

/**
 * Buttons allow users to take actions, and make choices, with a single tap.
 * */

const Button = forwardRef(
  ({
    size, type, disabled, onClick, children, ...otherProps
  }, ref) => (
    <AntButton
      size={size}
      onClick={onClick}
      disabled={disabled}
      ref={ref}
      type={type}
      {...otherProps}
    >
      {children}
    </AntButton>
  ),
);

Button.defaultProps = {
  size: 'middle',
  type: 'primary',
  disabled: false,
  onClick: () => {},
};

Button.propTypes = {
  size: propTypes.oneOf(['small', 'middle', 'large']),
  type: propTypes.oneOf(['primary', 'dashed', 'outline', 'ghost']),
  disabled: propTypes.bool,
  onClick: propTypes.func,
  children: propTypes.node.isRequired,
};

export default Button;
