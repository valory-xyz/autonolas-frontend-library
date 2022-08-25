import React from 'react';
import { FooterContainer } from './styles';

type FooterProps = {
  leftContent?: JSX.Element;
  rightContent?: JSX.Element;
};

export const Footer = ({ leftContent, rightContent }: FooterProps) => (
  <FooterContainer>
    <div className="footer-left-content">{leftContent}</div>

    <div className="footer-center">
      ©&nbsp;Valory&nbsp;
      {new Date().getFullYear()}
    </div>

    <div className="footer-right-content">{rightContent}</div>
  </FooterContainer>
);
