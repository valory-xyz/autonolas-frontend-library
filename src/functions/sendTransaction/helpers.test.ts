/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  pollTransactionDetails,
  getIsValidChainId,
  getChainId,
} from './helpers';

describe('pollTransactionDetails', () => {
  it('should return valid transaction details', async () => {
    const hash = '0x123';
    const chainId = 1;
    const mockResponse = {
      isSuccessful: true,
      data: { hash, chainId },
    };
    const mockJsonPromise = Promise.resolve(mockResponse);
    const mockFetchPromise = Promise.resolve({ json: () => mockJsonPromise });

    global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    const result = await pollTransactionDetails(hash, chainId);
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if transaction details are not valid', async () => {
    const hash = '0x123';
    const chainId = 1;

    // mock the fetch function to throw an error
    global.fetch = jest.fn().mockImplementation(() => {
      throw new Error('Invalid transaction details');
    });

    async function fetchTransactionDetails() {
      await pollTransactionDetails(hash, chainId);
    }

    await expect(fetchTransactionDetails).rejects.toThrowError(
      'Invalid transaction details',
    );
  });
});

describe('getIsValidChainId', () => {
  it('should return true if chainId is valid', () => {
    const SUPPORTED_CHAINS = [{ id: 1 }, { id: 5 }];
    const chainId = 1;
    const result = getIsValidChainId(SUPPORTED_CHAINS, chainId);
    expect(result).toBe(true);
  });

  it('should return false if chainId is invalid', () => {
    const SUPPORTED_CHAINS = [{ id: 1 }, { id: 5 }];
    const chainId = 4;
    const result = getIsValidChainId(SUPPORTED_CHAINS, chainId);
    expect(result).toBe(false);
  });
});

afterEach(() => {
  jest.resetAllMocks();
  (window as any).MODAL_PROVIDER = undefined;
  (window as any).ethereum = undefined;
});

describe('getChainId', () => {
  it('should return chainId if valid chainId is passed', () => {
    const SUPPORTED_CHAINS = [{ id: 1 }, { id: 5 }];
    const chainId = 1;
    const result = getChainId(SUPPORTED_CHAINS, chainId);
    expect(result).toBe(1);
  });

  it('should return chainId from `MODAL_PROVIDER` if chainId is not passed & it is supported', () => {
    (window as any).MODAL_PROVIDER = { chainId: 1 };

    const SUPPORTED_CHAINS = [{ id: 1 }, { id: 5 }];
    const result = getChainId(SUPPORTED_CHAINS);

    expect(result).toBe(1);
  });

  it('should return default chainId (mainnet) if chainId from `MODAL_PROVIDER` is NOT supported', () => {
    (window as any).MODAL_PROVIDER = { chainId: 4 };

    const SUPPORTED_CHAINS = [{ id: 1 }, { id: 5 }];
    const result = getChainId(SUPPORTED_CHAINS);

    expect(result).toBe(1);
  });

  it('should return chainId from `ethereum` if chainId is not passed & it is supported', () => {
    (window as any).ethereum = { chainId: 1 };

    const SUPPORTED_CHAINS = [{ id: 1 }, { id: 5 }];
    const result = getChainId(SUPPORTED_CHAINS);

    expect(result).toBe(1);
  });

  it('should return default chainId (mainnet) if chainId from `ethereum` is NOT supported', () => {
    (window as any).ethereum = { chainId: 4 };

    const SUPPORTED_CHAINS = [{ id: 1 }, { id: 5 }];
    const result = getChainId(SUPPORTED_CHAINS);

    expect(result).toBe(1);
  });

  it('should return default chainId (mainnet) if chainId is not passed & `MODAL_PROVIDER` & `ethereum` are undefined', () => {
    const SUPPORTED_CHAINS = [{ id: 1 }, { id: 5 }];
    const result = getChainId(SUPPORTED_CHAINS);

    expect(result).toBe(1);
  });
});
