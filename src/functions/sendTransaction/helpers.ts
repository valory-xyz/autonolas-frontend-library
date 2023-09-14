/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers } from 'ethers';
import { getUrl } from './index';
import { Chain } from '../../types/types';
import { DEFAULT_CHAIN_ID } from '../../utils/constants';
import { getNextEnvName } from '../functions';

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
        const isSuccessful = json?.isSuccessful;

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

/**
 * checks if the chainId is supported
 * @example
 * Supported chains: [1, 5]
 * i/p: getIsValidChainId(1);
 * o/p: true
 */
export const getIsValidChainId = (
  SUPPORTED_CHAINS: Chain[],
  chainId: number | string,
) => {
  if (!chainId) return false;

  return SUPPORTED_CHAINS.some((e) => e.id === Number(chainId));
};

const getRpcUrlBasedOnChainId = (chainId: number) => {
  const envName = getNextEnvName(chainId);
  if (!envName || !process.env[envName]) {
    throw new Error(`No RPC URL found for chainId: ${chainId}`);
  }

  return process.env[envName];
};

/**
 * provider
 */
export const getModalProvider = () => (window as any)?.MODAL_PROVIDER;

export const getWindowEthereum = () => (window as any)?.ethereum;

/**
 * gets provider from the connected wallet or installed wallet or fallback to mainnet
 */
export const getProvider = (supportedChains: Chain[]) => {
  if (supportedChains?.length === 0) {
    throw new Error('Supported chains cannot be empty');
  }

  const rpcUrl = getRpcUrlBasedOnChainId(
    supportedChains[0].id || DEFAULT_CHAIN_ID,
  );

  if (typeof window === 'undefined') {
    console.warn(
      'No provider found, fetching RPC URL from first supported chain',
    );
    return rpcUrl;
  }

  // connected via wallet-connect
  const walletProvider = getModalProvider();
  if (walletProvider) {
    const walletConnectChainId = Number(walletProvider.chainId);

    // if logged in via wallet-connect but chainId is not supported,
    // default to mainnet (ie. Use JSON-RPC provider)
    return getIsValidChainId(supportedChains, walletConnectChainId)
      ? walletProvider
      : rpcUrl;
  }

  // NOT logged in but has wallet installed (eg. Metamask).
  // If chainId is not supported, default to mainnet (ie. Use JSON-RPC provider)
  const windowEthereum = getWindowEthereum();
  if (windowEthereum?.chainId) {
    const walletChainId = Number(windowEthereum.chainId);
    return getIsValidChainId(supportedChains, walletChainId)
      ? windowEthereum
      : rpcUrl;
  }

  // fallback to mainnet JSON RPC provider
  return rpcUrl;
};

/**
 * gets ethers provider from the connected wallet or
 * installed wallet or fallback to mainnet
 */
export const getEthersProvider = (supportedChains: Chain[]) => {
  const provider = getProvider(supportedChains);
  return new ethers.providers.Web3Provider(provider, 'any');
};

/**
 * helper function to get chainId, if chainId is not supported, default to mainnet
 * @param {number | string} chainIdPassed valid chainId
 * @returns
 */
export const getChainIdOrDefaultToMainnet = (
  SUPPORTED_CHAINS: Chain[],
  chainIdPassed: string | number,
) => {
  if (!chainIdPassed) {
    throw new Error('chainId is not provided');
  }

  const chain = Number(chainIdPassed);
  return getIsValidChainId(SUPPORTED_CHAINS, chain)
    ? chain
    : SUPPORTED_CHAINS[0].id || DEFAULT_CHAIN_ID;
};

/**
 * get chainId from the providers or fallback to default chainId (mainnet)
 * first element of supportedChains is the default chainId
 */
export const getChainId = (
  supportedChains: Chain[],
  chainId?: string | number | null,
) => {
  if (typeof window === 'undefined') {
    console.error('No provider found');
  }

  // if chainId is provided, return it
  if (chainId) {
    return Number(chainId);
  }

  // connected via wallet-connect
  const walletProvider = getModalProvider();
  if (walletProvider?.chainId) {
    const walletConnectChainId = walletProvider.chainId;
    return getChainIdOrDefaultToMainnet(supportedChains, walletConnectChainId);
  }

  // NOT logged in but has wallet installed (eg. metamask).
  // window?.ethereum?.chainId is chainId set by wallet
  const windowEthereum = getWindowEthereum();
  if (windowEthereum?.chainId) {
    const walletChainId = windowEthereum.chainId;
    return getChainIdOrDefaultToMainnet(supportedChains, walletChainId);
  }

  // has no wallet (eg. incognito mode or no wallet installed)
  return supportedChains[0].id || DEFAULT_CHAIN_ID;
};
