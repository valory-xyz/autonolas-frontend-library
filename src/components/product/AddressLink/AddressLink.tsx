import React, { ReactNode } from 'react';
import { Tooltip } from 'antd';
import { GATEWAY_URL } from '../../../utils/constants';

type AddressLinkType = {
  text: string;
  isTransaction?: boolean;
  suffixCount?: number;
  isIpfsLink?: boolean;
  children?: ReactNode;
};

//
/**
 * function to get the trimmed text
 * @example
 * input: '0x02c26437b292d86c5f4f21bbcce0771948274f84', 6
 * output: '0x02c264...8274f84'
 */
export const getTrimmedText = (str: string, suffixCount: number) => {
  const text = str.trim();
  const frontText = text.slice(0, suffixCount);
  const backText = text.slice(text.length - suffixCount, text.length);
  return `${frontText}...${backText}`;
};

/**
 * returns the text to be displayed
 */
const getText = (str: string, isIpfsLink: boolean) => {
  if (!isIpfsLink) return str;

  const hash = str.substring(2);
  return `f01701220${hash}`;
};

/**
 * returns the redirect link based on the text
 * @example
 * input: '0x02c26437b292d86c5f4f21bbcce0771948274f84', false
 * output: 'https://etherscan.io/address/0x02c26437b292d86c5f4f21bbcce0771948274f84'
 *
 * input: '0x02c26437b292d86c5f4f21bbcce0771948274f84', true
 * output: 'https://GATEWAY_URL/ipfs/f01701220e0ed9d9a7e4ec046989c1c91f8fe367cf63681e75f75d6d0606105043048f5f9'
 */
const getRedirectLink = (text: string, isIpfsLink: boolean) => {
  if (isIpfsLink) {
    return `${GATEWAY_URL}/${text}`;
  }

  const isTransaction = /^0x([A-Fa-f0-9]{64})$/.test(text);

  if (isTransaction) {
    return `https://etherscan.io/tx/${text}`;
  }

  return `https://etherscan.io/address/${text}`;
};

// component
export const AddressLink = ({
  text,
  suffixCount = 6,
  isIpfsLink = false,
}: AddressLinkType) => {
  const trimmedText = getTrimmedText(getText(text, isIpfsLink), suffixCount);

  return (
    <Tooltip title={text}>
      <a
        href={getRedirectLink(text, isIpfsLink)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {trimmedText}
      </a>
    </Tooltip>
  );
};
