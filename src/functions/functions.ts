import { ethers } from 'ethers';
import Web3 from 'web3';

export const convertToEth = (value: string) => ethers.utils.formatEther(value);

export const getBalance = (account: string, p: Web3) =>
  new Promise((resolve, reject) => {
    p.eth
      .getBalance(account)
      .then((balance: string) => {
        const balanceInEth: string = ethers.utils.formatEther(balance);
        resolve(balanceInEth);
      })
      .catch((e: Error) => {
        reject(e);
      });
  });

/**
 * Trim text
 * @example
 * i/p: getTrimmedText("ABCD", 1);
 * o/p: A...D
 */
export const getTrimmedText = (str: string, suffixCount: number) => {
  const text = str.trim();
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
      return 'Mainnet';
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
      return `https://mumbai.polygonscan.com/`;
    case 80001:
      return `https://polygonscan.com`;
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
      return `https://blockscout.com/xdai/mainnet`;
    default:
      return `https://etherscan.io`;
  }
};
