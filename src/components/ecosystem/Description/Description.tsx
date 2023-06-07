import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { BREAK_POINT } from '../../../utils/index.ts';

const Desc = styled.default.div<{ type?: number }>`
  font-family: 'manrope__medium', sans-serif;
  &.center {
    text-align: center;
  }
  ${({ type }) => {
    switch (type) {
      case 1:
        return `
          font-size: 30px;
        `;
      case 2:
        return `
          font-size: 28px;
        `;
      case 3:
        return `
          font-size: 26px;
        `;
      case 4:
        return `
          font-size: 24px;
        `;
      case 10:
      default:
        return `
          font-size: 28px;
        `;
    }
  }}

  @media only screen and (max-width: ${BREAK_POINT.xl}) {
    ${({ type }) => {
      switch (type) {
        case 1:
          return `
          font-size : 30px;
        `;
        case 2:
          return `
          font-size: 22px;
        `;
        case 3:
          return `
          font-size: 20px;
        `;
        case 4:
          return `
          font-size: 16px;
        `;
        case 10:
        default:
          return `
          font-size: 20px;
        `;
      }
    }}
  }
`;

type DescriptionProps = {
  title: string | ReactElement;
  className?: string;
  type?: number;
};

export const Description = ({
  title,
  type,
  className,
  ...rest
}: DescriptionProps) => {
  const others = {
    className: `description ${className}`,
    ...rest,
  };

  return (
    <Desc type={type} {...others}>
      {title}
    </Desc>
  );
};
