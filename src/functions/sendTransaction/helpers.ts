/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import { get } from 'lodash';
import { getUrl } from './index.ts';

/**
 * poll gnosis-safe API every 3 seconds
 */
export const pollTransactionDetails = async (hash: string, chainId: number) => {
  return new Promise((resolve, reject) => {
    /* eslint-disable-next-line consistent-return */
    const interval = setInterval(async () => {
      window.console.log('Fetching transaction receipt...');

      try {
        const response = await fetch(getUrl(hash, chainId));
        const json = await response.json();
        const isSuccessful = get(json, 'isSuccessful');

        if (isSuccessful) {
          window.console.log('Transaction details: ', json);
          clearInterval(interval);
          resolve(json);
        }
      } catch (error) {
        clearInterval(interval);
        reject(error);
      }
    }, 3000);
  });
};

export const getProvider = () => {
  if (typeof window !== 'undefined' && (window as any)?.MODAL_PROVIDER) {
    return new ethers.providers.Web3Provider(
      (window as any).MODAL_PROVIDER,
      'any',
    );
  }

  throw new Error('No provider found');
};

export const getChainId = async () => {
  if (typeof window !== 'undefined' && (window as any)?.WEB3_PROVIDER) {
    const chainId: number = await (
      window as any
    ).WEB3_PROVIDER.eth?.getChainId();
    return chainId || 1;
  }

  throw new Error('No provider found to fetch chainId');
};
