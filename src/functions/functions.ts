import { ethers } from 'ethers';
import { toLower } from 'lodash';
import { notification } from 'antd';

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
    case 56:
    case 97:
      return 'BNB';
    case 137:
    case 80001:
      return 'MATIC';
    case 43114:
    case 43113:
      return 'AVAX';
    case 250:
      return 'FTM';
    case 1287:
      return 'DEV';
    case 100:
    case 10200:
      return 'xDAI';
    default:
      return 'ETH';
  }
};

export const getNetworkName = (networkId: number) => {
  switch (networkId) {
    case 1:
      return 'Ethereum';
    case 3:
      return 'Ropsten';
    case 4:
      return 'Rinkeby';
    case 5:
      return 'Goerli';
    case 56:
      return 'Binance Smart Chain';
    case 97:
      return 'Binance Smart Chain Testnet';
    case 137:
      return 'Polygon';
    case 80001:
      return 'Polygon Testnet';
    case 43114:
      return 'Avalanche';
    case 43113:
      return 'Fuji Testnet';
    case 250:
      return 'Fantom';
    case 1287:
      return 'Moonbase Alpha';
    case 100:
      return 'Gnosis Chain';
    case 10200:
      return 'Gnosis Chain Testnet';
    default:
      return 'Unknown Network';
  }
};

export const getExplorerURL = (chainId = 1) => {
  switch (chainId) {
    case 5:
      return `https://goerli.etherscan.io`;
    case 56:
    case 97:
      return `https://bscscan.com`;
    case 137:
      return `https://polygonscan.com`;
    case 80001:
      return `https://mumbai.polygonscan.com`;
    case 43114:
    case 43113:
      return `https://cchain.explorer.avax.network`;
    case 250:
      return `https://ftmscan.com`;
    case 1287:
      return `https://explorer.devv.finance`;
    case 100:
      return `https://gnosisscan.io`;
    case 10200:
      return `https://gnosis.blockscout.com`;
    default:
      return `https://etherscan.io`;
  }
};

/**
 * returns the env name from process.env for the given chainId
 */
export const getNextEnvName = (chainId: number) => {
  switch (chainId) {
    case 1:
      return 'NEXT_PUBLIC_MAINNET_URL';
    case 5:
      return 'NEXT_PUBLIC_GOERLI_URL';
    case 100:
      return 'NEXT_PUBLIC_GNOSIS_URL';
    case 137:
      return 'NEXT_PUBLIC_POLYGON_URL';
    case 80001:
      return 'NEXT_PUBLIC_POLYGON_MUMBAI_URL';
    case 10200:
      return 'NEXT_PUBLIC_GNOSIS_CHIADO_URL';
    case 31337:
      return 'NEXT_PUBLIC_AUTONOLAS_URL';
    default:
      return null;
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

// notifications
export const notifySuccess = (message = 'Successful') =>
  notification.success({ message });
export const notifyError = (message = 'Some error occured') =>
  notification.error({ message });
export const notifyWarning = (message = 'Some error occured') =>
  notification.warning({ message });
