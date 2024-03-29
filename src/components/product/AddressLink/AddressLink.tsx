import React, { ReactNode } from 'react';
import { Tooltip, Button, TooltipProps } from 'antd';
import CopyOutlined from '@ant-design/icons/CopyOutlined';
import styled from 'styled-components';
import { AutonolasThemeProvider } from '../../common/ThemeProvider';
import {
  GATEWAY_URL,
  HASH_PREFIXES,
  SOLANA_CHAIN_NAMES,
} from '../../../utils/constants';
import { getExplorerURL, getChainId } from '../../../functions';
import { Chain, SolanaChainNames } from '../../../types';

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

type GetRedirectLinkArgs = {
  text: string;
  isIpfsLink: boolean;
  supportedChains?: Chain[];
  chainName?: SolanaChainNames;
  chainId?: number;
};

const getRedirectLink = ({
  text,
  isIpfsLink,
  supportedChains,
  chainName,
  chainId,
}: GetRedirectLinkArgs) => {
  if (isIpfsLink) {
    const hash = text.substring(2);
    if (hash.length === 64) {
      return `${GATEWAY_URL}${HASH_PREFIXES.type1}${hash}`;
    }
    return `${GATEWAY_URL}${text}`;
  }

  const isSolana =
    chainName === SOLANA_CHAIN_NAMES.DEVNET ||
    chainName === SOLANA_CHAIN_NAMES.MAINNET;

  if (isSolana) {
    return chainName === SOLANA_CHAIN_NAMES.DEVNET
      ? `https://solscan.io/account/${text}?cluster=devnet`
      : `https://solscan.io/account/${text}`;
  }

  const getCurrentChainId = () => {
    if (chainId) return chainId;
    if (supportedChains) return getChainId(supportedChains);
    return 1;
  };
  const explorerUrl = getExplorerURL(getCurrentChainId());
  const isTransaction = /^0x([A-Fa-f0-9]{64})$/.test(text);

  return isTransaction
    ? `${explorerUrl}/tx/${text}`
    : `${explorerUrl}/address/${text}`;
};

const TextContainer = styled.div<{ minwidth?: number }>`
  display: inline-flex;
  min-width: ${({ minwidth }) => minwidth || 0}px;
`;

type AddressLinkType = {
  text: string;
  /**
   * redirects to transaction page
   * eg. https://etherscan.io/tx/${text}
   * */
  isTransaction?: boolean;
  suffixCount?: number;
  /**
   * redirects to IPFS page
   * eg. https://gateway.autonolas.tech/ipfs/${text}
   * */
  isIpfsLink?: boolean;
  /** to display copy button right to the text */
  canCopy?: boolean;
  tooltipPlacement?: TooltipProps['placement'];
  /** minimum width for the text to display any content right side of it */
  textMinWidth?: number;
  /** to display any content right side of the text */
  extraRightContent?: ReactNode;
  /** to display only the text and unclickable */
  cannotClick?: boolean;
  /** list of supported chains */
  supportedChains?: Chain[];
  /** to override the default redirect link */
  onClick?: (text: string) => void;
  /** chain name */
  chainName?: SolanaChainNames;
  /** chain ID */
  chainId?: number;
};

export const AddressLink = ({
  text,
  suffixCount = 6,
  isIpfsLink = false,
  canCopy = false,
  tooltipPlacement = 'bottom',
  extraRightContent,
  textMinWidth,
  cannotClick,
  supportedChains,
  onClick,
  chainId,
  chainName,
}: AddressLinkType) => {
  const trimmedText = getTrimmedText(text, suffixCount);
  const url = getRedirectLink({
    text,
    isIpfsLink,
    supportedChains,
    chainName,
    chainId,
  });

  return (
    <AutonolasThemeProvider>
      <Tooltip title={text} placement={tooltipPlacement}>
        <TextContainer minwidth={textMinWidth}>
          {cannotClick ? (
            trimmedText
          ) : (
            <Button
              type="link"
              onClick={() => {
                if (typeof onClick === 'function') {
                  onClick(text);
                } else {
                  window.open(url, '_blank');
                }
              }}
            >
              {trimmedText}
            </Button>
          )}
        </TextContainer>

        {canCopy && (
          <>
            &nbsp;
            <Button
              onClick={() => navigator.clipboard.writeText(text)}
              icon={<CopyOutlined />}
            />
          </>
        )}

        {extraRightContent ? (
          <>
            &nbsp;
            {extraRightContent}
          </>
        ) : null}
      </Tooltip>
    </AutonolasThemeProvider>
  );
};
