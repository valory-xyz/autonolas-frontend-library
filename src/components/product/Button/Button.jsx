import React from 'react';
import { Button as AntdButton } from 'antd/lib';
import PropTypes from 'prop-types';
import { COLOR } from '../../../utils/theme';

export const commonStyle = {
  textTransform: 'uppercase',
};

const getStyle = (k) => {
  switch (k) {
    case 'primary':
      return {
        borderColor: COLOR.PURPLE,
        backgroundColor: COLOR.PURPLE,
      };

    case 'danger':
      return {
        borderColor: COLOR.RED,
        backgroundColor: COLOR.RED,
      };

    case 'disabled':
      return {
        borderColor: COLOR.GREY_1,
        backgroundColor: COLOR.GREY_1,
        color: COLOR.BORDER_GREY,
      };

    default:
      return {
        borderColor: COLOR.PURPLE,
        backgroundColor: COLOR.PURPLE,
      };
  }
};

export const Button = ({
  children, type, style, ...rest
}) => (
  <AntdButton
    type={type}
    {...rest}
    style={{ ...commonStyle, ...getStyle(type), ...(style || {}) }}
  >
    {children}
  </AntdButton>
);

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.array,
    PropTypes.string,
  ]),
  type: PropTypes.oneOf(['primary', 'danger', 'disabled']),
  style: PropTypes.shape({}),
};

Button.defaultProps = {
  children: null,
  type: 'primary',
  style: {},
};

export default Button;
