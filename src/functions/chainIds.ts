import { STAGING_CHAIN_ID } from '../utils/constants';

export const getChainId = (chainId?: number | null) => {
  if (typeof window === 'undefined') return null;

  return Number(
    chainId ||
      (window as any).MODAL_PROVIDER?.chainId ||
      window?.ethereum?.chainId,
  );
};

/**
 * returns true if the chain is goerli or mainnet or local or null
 */
export const isL1Network = (chainId?: number) => {
  const chain = getChainId(chainId);

  // even if chainId is null, we still show everything as shown in goerli or mainnet
  return (
    chain === 5 || chain === 1 || chain === STAGING_CHAIN_ID || chainId === null
  );
};

export const isGoerli = (chainId: number) => getChainId(chainId) === 5;

export const isGnosis = (chainId: number) => getChainId(chainId) === 100;

export const isPolygon = (chainId: number) => getChainId(chainId) === 137;

export const isPolygonMumbai = (chainId: number) =>
  getChainId(chainId) === 80001;
