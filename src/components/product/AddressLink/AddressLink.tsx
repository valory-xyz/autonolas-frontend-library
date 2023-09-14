import React from 'react';
import { Tooltip, Button, TooltipProps } from 'antd';
import CopyOutlined from '@ant-design/icons/CopyOutlined';
import { GATEWAY_URL, HASH_PREFIXES } from '../../../utils/constants';
import { getExplorerURL, getCurrentChainId } from '../../../functions';

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
 * returns the redirect link based on the text
 * @example
 * input: '0x02c26437b292d86c5f4f21bbcce0771948274f84', false
 * output: 'https://etherscan.io/address/0x02c26437b292d86c5f4f21bbcce0771948274f84'
 *
 * input: '0x02c26437b292d86c5f4f21bbcce0771948274f84', true
 * output: 'https://GATEWAY_URL/ipfs/f01701220e0ed9d9a7e4ec046989c1c91f8fe367cf63681e75f75d6d0606105043048f5f9'
 *
 * chainId as param to be deprecated
 */
const getRedirectLink = (
  text: string,
  isIpfsLink: boolean,
  chainId?: string | number,
) => {
  if (isIpfsLink) {
    const hash = text.substring(2);
    if (hash.length === 64) {
      return `${GATEWAY_URL}${HASH_PREFIXES.type1}${hash}`;
    }
    return `${GATEWAY_URL}${text}`;
  }

  const isTransaction = /^0x([A-Fa-f0-9]{64})$/.test(text);
  const currentChainId = getCurrentChainId(chainId);
  const explorerUrl = getExplorerURL(currentChainId);

  return isTransaction
    ? `${explorerUrl}/tx/${text}`
    : `${explorerUrl}/address/${text}`;
};

type AddressLinkType = {
  text: string;
  isTransaction?: boolean;
  suffixCount?: number;
  isIpfsLink?: boolean;
  canCopy?: boolean;
  tooltipPlacement?: TooltipProps['placement'];
  // TODO
  textMinWidth?: number;
  onClick?: () => void;
  cannotClick?: boolean;
};

export const AddressLink = ({
  text,
  suffixCount = 6,
  isIpfsLink = false,
  canCopy = false,
  tooltipPlacement = 'bottom',
  textMinWidth,
}: AddressLinkType) => {
  const trimmedText = getTrimmedText(text, suffixCount);

  return (
    <Tooltip title={text} placement={tooltipPlacement}>
      <a
        href={getRedirectLink(text, isIpfsLink)}
        target="_blank"
        rel="noopener noreferrer"
        style={
          textMinWidth
            ? { display: 'inline-block', minWidth: textMinWidth }
            : {}
        }
      >
        {trimmedText}
      </a>
      {canCopy && (
        <>
          &nbsp;
          <Button
            onClick={() => navigator.clipboard.writeText(text)}
            icon={<CopyOutlined rev="" />}
          />
        </>
      )}
    </Tooltip>
  );
};
