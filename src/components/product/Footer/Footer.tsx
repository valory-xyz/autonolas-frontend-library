import React from 'react';
import { FooterContainer } from './styles';
import { AutonolasThemeProvider } from '../../common/ThemeProvider';

type FooterProps = {
  leftContent?: JSX.Element;
  rightContent?: JSX.Element;
  centerContent?: JSX.Element;
};

const defaultCenterContent = (
  <>
    ©&nbsp;Valory&nbsp;
    {new Date().getFullYear()}
  </>
);

export const Footer = ({
  leftContent,
  rightContent,
  centerContent,
}: FooterProps) => (
  <AutonolasThemeProvider>
    <FooterContainer className="autonolas-footer">
      <div className="footer-left-content">{leftContent}</div>

      <div className="footer-center">
        {centerContent || defaultCenterContent}
      </div>

      <div className="footer-right-content">{rightContent}</div>
    </FooterContainer>
  </AutonolasThemeProvider>
);
