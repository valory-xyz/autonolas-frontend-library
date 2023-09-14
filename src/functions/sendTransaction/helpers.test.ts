/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  pollTransactionDetails,
  getIsValidChainId,
  getProvider,
  getChainIdOrDefaultToMainnet,
  getChainId,
} from './helpers';

const mockWalletProvider = {
  chainId: 1,
  isMetaMask: false,
  isConnected: () => true,
  request: jest.fn(),
};

const mockEthereumProvider = {
  chainId: 1,
  isMetaMask: false,
  isConnected: () => true,
  request: jest.fn(),
};

afterEach(() => {
  jest.resetAllMocks();
  (window as any).MODAL_PROVIDER = undefined;
  (window as any).ethereum = undefined;
});

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

describe('getProvider', () => {
  it('should throw an error if supported chain is empty array', () => {
    expect(() => getProvider([])).toThrowError(
      'Supported chains cannot be empty',
    );
  });

  it('should return RPC URL from process.env if window is undefined', () => {
    const SUPPORTED_CHAINS = [{ id: 5 }];
    const result = getProvider(SUPPORTED_CHAINS);

    expect(result).toBe('https://eth-goerli.g.alchemy.com/v2/demo');
  });

  it('should return provider from `MODAL_PROVIDER` if it is defined', () => {
    (window as any).MODAL_PROVIDER = mockWalletProvider;

    const SUPPORTED_CHAINS = [{ id: 1 }, { id: 5 }];
    const result = getProvider(SUPPORTED_CHAINS);

    expect(result).toBe(mockWalletProvider);
  });

  it('should return RPC URL if chainId from `MODAL_PROVIDER` is not supported', () => {
    (window as any).MODAL_PROVIDER = { chainId: 4 };

    const SUPPORTED_CHAINS = [{ id: 1 }, { id: 5 }];
    const result = getProvider(SUPPORTED_CHAINS);

    expect(result).toBe('https://eth-mainnet.g.alchemy.com/v2/demo');
  });

  it('should return provider from `ethereum` if it is defined', () => {
    (window as any).ethereum = mockEthereumProvider;

    const SUPPORTED_CHAINS = [{ id: 1 }, { id: 5 }];
    const result = getProvider(SUPPORTED_CHAINS);

    expect(result).toBe(mockEthereumProvider);
  });

  it('should return RPC URL if chainId from `ethereum` is not supported', () => {
    (window as any).ethereum = { chainId: 4 };

    const SUPPORTED_CHAINS = [{ id: 1 }, { id: 5 }];
    const result = getProvider(SUPPORTED_CHAINS);

    expect(result).toBe('https://eth-mainnet.g.alchemy.com/v2/demo');
  });
});

describe('getChainIdOrDefaultToMainnet', () => {
  it('should return chainId if valid chainId is passed', () => {
    const SUPPORTED_CHAINS = [{ id: 1 }, { id: 5 }];
    const chainId = 5;
    const result = getChainIdOrDefaultToMainnet(SUPPORTED_CHAINS, chainId);

    expect(result).toBe(5);
  });

  it('should return chainId from `MODAL_PROVIDER` if chainId is not passed & it is supported', () => {
    const SUPPORTED_CHAINS = [{ id: 5 }, { id: 31337 }];
    const chainId = 10;
    const result = getChainIdOrDefaultToMainnet(SUPPORTED_CHAINS, chainId);

    expect(result).toBe(5);
  });
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
