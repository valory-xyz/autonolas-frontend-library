import React, { ReactElement, FC } from 'react';
import styled from 'styled-components';
import { MEDIA_QUERY } from '../../../utils';

const H2 = styled.h2`
  margin: 0;
  font-size: 116px;
  line-height: 1;
  overflow-wrap: break-word;
  font-family: 'manrope__semibold', sans-serif;
  &.center {
    text-align: center;
  }
  .ib {
    display: inline-block;
  }

  ${MEDIA_QUERY.laptop} {
    font-size: 94px;
  }

  ${MEDIA_QUERY.tabletL} {
    font-size: 74px;
    word-wrap: initial;
  }

  ${MEDIA_QUERY.tablet} {
    font-size: 54px;
    word-wrap: initial;
  }

  ${MEDIA_QUERY.mobileL} {
    font-size: 44px;
    word-wrap: initial;
  }
`;

type HeaderProps = {
  title: string | ReactElement;
};

export const Header: FC<HeaderProps> = ({ title, ...rest }) => (
  <H2 {...rest}>{title}</H2>
);
