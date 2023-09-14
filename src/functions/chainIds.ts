import { STAGING_CHAIN_ID, LOCAL_FORK_ID } from '../utils/constants';
import { getModalProvider, getWindowEthereum } from './sendTransaction/helpers';

export const getCurrentChainId = (chainId?: string | number | null) => {
  // if chainId is provided, return it
  if (chainId) {
    return Number(chainId);
  }

  if (typeof window === 'undefined') {
    console.error('No provider found to find chainId');
    return undefined;
  }

  return Number(getModalProvider()?.chainId || getWindowEthereum()?.chainId);
};

export const isGoerli = (chainId: number) => getCurrentChainId(chainId) === 5;

export const isGnosis = (chainId: number) => getCurrentChainId(chainId) === 100;

export const isPolygon = (chainId: number) =>
  getCurrentChainId(chainId) === 137;

export const isPolygonMumbai = (chainId: number) =>
  getCurrentChainId(chainId) === 80001;

export const isGnosisChiado = (chainId: number) =>
  getCurrentChainId(chainId) === 10200;

export const isLocalNetwork = (chainId: number) =>
  getCurrentChainId(chainId) === STAGING_CHAIN_ID;

export const isL1OnlyNetwork = (chainId?: number) => {
  const chain = getCurrentChainId(chainId);
  return (
    chain === 1 ||
    chain === 5 ||
    chain === STAGING_CHAIN_ID ||
    chain === LOCAL_FORK_ID
  );
};

/**
 * returns true if the chain is goerli or mainnet or local or null
 */
export const isL1Network = (chainId?: number) => {
  const chain = getCurrentChainId(chainId);

  // even if chainId is null, we still show everything as shown in goerli or mainnet
  return chain === null || isL1OnlyNetwork(chain);
};
