import React from 'react';
import { FooterContainer } from './styles';

const SOCIALS = [
  {
    type: 'web',
    url: 'https://www.autonolas.network',
  },
  {
    type: 'medium',
    url: 'https://autonolas.medium.com/',
  },
  {
    type: 'twitter',
    url: 'https://twitter.com/autonolas',
  },
  {
    type: 'github',
    url: 'https://github.com/valory-xyz',
  },
];

export const getSocials = () => (
  <div className="socials">
    {SOCIALS.map((social) => {
      return (
        <a
          href={social.url}
          className={social.type}
          target="_blank"
          rel="noopener noreferrer"
          key={`social-${social.type}`}
          aria-label={`social-${social.type}`}
        >
          <img src={require(`./images/${social.type}.svg`)} alt="" width={18} height={16} />
        </a>
      );
    })}
  </div>
);

type FooterProps = {
  leftContent?: JSX.Element;
};

export const Footer = ({ leftContent }: FooterProps) => (
  <FooterContainer>
    <div className="footer-left-content">{leftContent}</div>

    <div className="footer">
      ©&nbsp;Valory&nbsp;
      {new Date().getFullYear()}
    </div>

    {getSocials()}
  </FooterContainer>
);
