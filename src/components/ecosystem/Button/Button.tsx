import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { COLOR, MEDIA_QUERY } from '../../../utils';

type BtnType = 'black' | 'primary' | 'purple' | 'link-arrow';

type ButtonProps = {
  title: string | ReactElement;
  type?: BtnType;
  className?: string;
  hasArrowSuffix?: boolean;
};

const Btn = styled.button<{ btnType: BtnType }>`
  outline: none;
  font-size: 18px;
  text-transform: uppercase;
  transition: all 0.3s;
  line-height: normal;
  padding: 0.75rem 2rem;
  clip-path: none;
  border-radius: 48px;
  text-decoration: none;
  &.mini {
    padding: 0.35rem 1rem;
    font-size: 14px;
  }
  &:hover {
    cursor: pointer;
  }

  ${MEDIA_QUERY.laptop} {
    width: auto;
    padding-left: 48px;
    padding-right: 48px;
  }

  ${MEDIA_QUERY.tablet} {
    font-size: 22px;
  }

  ${MEDIA_QUERY.mobileL} {
    width: 100%;
    font-size: 18px;
  }

  ${({ type = 'primary' }) => {
    switch (type) {
      case 'black':
        return `
          border: 1px solid ${COLOR.BLACK};
          background-color: ${COLOR.BLACK};
          color: ${COLOR.WHITE};
          font-size: 20px;
          &:hover, &:active {
            background-color: ${COLOR.GREEN_2};
            color: ${COLOR.BLACK};
            border : 1px solid ${COLOR.GREEN_2};
          }
        `;
      case 'link-arrow':
        return `
          display: flex;
          align-items: center;
          border: 1px solid transparent;
          background-color: transparent;
          color: ${COLOR.BLACK};
          text-transform: initial;
          font-size: 24px;
          img {
            margin-left: 1rem;
            width: 40px;
          }
          &:hover, &:active {
            background-color: transparent;
            color: ${COLOR.BLACK};
            border: 1px solid transparent;
          }
        `;
      case 'primary':
      case 'purple':
      default:
        return `
          border: 1px solid ${COLOR.PRIMARY};
          background-color: ${COLOR.PRIMARY};
          color: ${COLOR.WHITE};
          &:hover, &:active {
            background-color: ${COLOR.GREEN_1};
            color: ${COLOR.BLACK};
            border : 1px solid ${COLOR.GREEN_1};
          }
        `;
    }
  }}
`;

export const Button = ({
  title,
  type = 'primary',
  className = '',
  hasArrowSuffix = false,
  ...rest
}: ButtonProps) => {
  const clsName = `btn ${className || ''}`.trim();

  return (
    <Btn btnType={type} className={clsName} {...rest}>
      <>
        {title}
        {type === 'link-arrow' && (
          <>
            <img src="images/common/arrow.png" alt=" " loading="lazy" />
          </>
        )}
        {hasArrowSuffix && ' →'}
      </>
    </Btn>
  );
};
