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
      return 'xDAI';
    default:
      return 'ETH';
  }
};
