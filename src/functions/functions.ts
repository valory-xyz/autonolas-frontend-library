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
