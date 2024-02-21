import { ReactNode } from 'react';
import { ethers } from 'ethers';
import { toLower } from 'lodash';
import { notification } from 'antd';
import { GATEWAY_URL } from '../utils/constants';
import { getConnectedChainIdFromWallet } from './sendTransaction/helpers';

export const convertToEth = (value: string) => ethers.utils.formatEther(value);

/**
 * Trim text
 * @example
 * i/p: getTrimmedText("ABCD", 1);
 * o/p: A...D
 */
export const getTrimmedText = (str: string, suffixCount: number) => {
  const text = str.trim();

  if (text.length <= suffixCount * 2) return text;

  const frontText = text.slice(0, suffixCount);
  const backText = text.slice(text.length - suffixCount, text.length);
  return `${frontText}...${backText}`;
};

export const getSymbolName = (chainId: number) => {
  switch (chainId) {
    case 137:
    case 80001:
      return 'MATIC';
    case 100:
    case 10200:
      return 'xDAI';
    case 42161:
    case 421614:
      return 'ARB';
    default:
      return 'ETH';
  }
};

export const getNetworkName = (networkId: number) => {
  switch (networkId) {
    case 1:
      return 'Ethereum';
    case 5:
      return 'Goerli';
    case 10:
      return 'Optimism';
    case 100:
      return 'Gnosis Chain';
    case 137:
      return 'Polygon';
    case 8453:
      return 'Base';
    case 10200:
      return 'Gnosis Chain Testnet';
    case 42161:
      return 'Arbitrum';
    case 42220:
      return 'Celo';
    case 44787:
      return 'Celo Alfajores';
    case 84532:
      return 'Base Sepolia';
    case 80001:
      return 'Polygon Testnet';
    case 421614:
      return 'Arbitrum Sepolia';
    case 11155420:
      return 'Optimism Sepolia';
    default:
      return 'Unknown Network';
  }
};

export const getExplorerURL = (chainId = 1) => {
  switch (chainId) {
    case 5:
      return `https://goerli.etherscan.io`;
    case 10:
      return `https://optimistic.etherscan.io`;
    case 100:
      return `https://gnosisscan.io`;
    case 137:
      return `https://polygonscan.com`;
    case 8453:
      return `https://basescan.org`;
    case 10200:
      return `https://gnosis.blockscout.com`;
    case 42161:
      return `https://arbiscan.io`;
    case 42220:
      return `https://celoscan.io`;
    case 44787:
      return `https://explorer.celo.org/alfajores`;
    case 84532:
      return `https://sepolia.basescan.org`;
    case 80001:
      return `https://mumbai.polygonscan.com`;
    case 421614:
      return `https://sepolia.arbiscan.io`;
    case 11155420:
      return `https://sepolia-optimism.etherscan.io`;
    default:
      return `https://etherscan.io`;
  }
};

/**
 * removes the subdomain from a url
 * @example
 * i/p: removeSubdomainFrom("https://sub.domain.com");
 * o/p: https://domain.com
 */
export function removeSubdomainFrom(urlPassed?: string): string {
  const currentURL =
    urlPassed || (typeof window !== 'undefined' ? window.location.origin : '');

  if (!currentURL) {
    throw new Error('No URL provided');
  }

  const regex = {
    protocol: new RegExp(/http(s)*:\/\//), // gets the http:// OR https:// from url string
    subdomain: new RegExp(/^[^.]*\.(?=\w+\.\w+$)/), // gets the http(s)://subdomain portion from url string
  };

  // save protocol from provided Url so we can reapply it to the non-subdomain
  const protocol = regex.protocol.exec(currentURL);

  if (protocol && protocol.length) {
    // if https://subdomain exists, just remove the subdomain from it
    const url = currentURL.replace(regex.subdomain, protocol[0]);
    return url;
  }

  return currentURL;
}

export const areAddressesEqual = (a1: string, a2: string) =>
  toLower(a1) === toLower(a2);

export const isValidAddress = (address: string) =>
  ethers.utils.isAddress(address);

// notifications for success, error and warning

export const notifySuccess = (
  message: ReactNode = 'Successful',
  description: ReactNode = '',
  key?: string,
) => notification.success({ message, description, key });

export const notifyError = (
  message: ReactNode = 'Some error occured',
  description: ReactNode = '',
  key?: string,
) => {
  // to get more details about the error
  console.warn({
    chainId: getConnectedChainIdFromWallet(),
    message,
    description,
  });

  notification.error({ message, description, key });
};

export const notifyWarning = (
  message: ReactNode = 'Some error occured',
  description: ReactNode = '',
  key?: string,
) => notification.warning({ message, description, key });

/**
 * Fetches metadata from IPFS
 */
export const getIpfsDetails = async (hash: string) => {
  try {
    const ipfsUrl = `${GATEWAY_URL}f01701220${hash.substring(2)}`;
    const response = await fetch(ipfsUrl);
    const json = await response.json();
    return json;
  } catch (e) {
    window.console.error('Error fetching metadata from IPFS', e);
    return e;
  }
};
