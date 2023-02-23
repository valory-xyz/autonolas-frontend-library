import { ethers, Contract } from 'ethers';
import * as HELPER_METHODS from './helpers';
import { getUrl, SAFE_API_MAINNET, SAFE_API_GOERLI, sendTransaction } from '.';

const dummyReceipt = {
  blockHash: 'abcd',
  blockNumber: 1,
  contractAddress: 'contractAddress',
  cumulativeGasUsed: 1,
  from: 'fromAddress',
  gasUsed: 1,
  logs: [],
  logsBloom: 'logsBloomString',
  status: true,
  to: 'toAddress',
  transactionHash: 'transactionHash',
  transactionIndex: 1,
};

const dummyAccount = '0xdD2FD4581271e230360230F9337D5c0430Bf44C0';

// mock the helper methods
const mockGetProvider = jest.spyOn(HELPER_METHODS, 'getProvider');
const mockChainId = jest.spyOn(HELPER_METHODS, 'getChainId');
const mockPollTransactionDetails = jest.spyOn(
  HELPER_METHODS,
  'pollTransactionDetails',
);

describe('getUrl', () => {
  it.each([
    { chainId: 1, hash: 'aaaa', url: `${SAFE_API_MAINNET}/aaaa` },
    { chainId: 5, hash: 'bbbb', url: `${SAFE_API_GOERLI}/bbbb` },
    { chainId: 31337, hash: 'cccc', url: `${SAFE_API_MAINNET}/cccc` },
  ])('should return the correct url', async ({ chainId, hash, url }) => {
    const temp = getUrl(hash, chainId);
    expect(temp).toBe(url);
  });
});

describe('sendTransaction', () => {
  it('should call the send transaction passed as a param (non gnosis safe)', async () => {
    // mock the provider to return a non gnosis safe address
    mockGetProvider.mockImplementation(() => {
      return {
        getCode: jest.fn(() => Promise.resolve('0x')),
      } as unknown as ethers.providers.Web3Provider;
    });

    // resolving the callback function `sendFn` with a dummy receipt
    const dummySendFn = Promise.resolve(dummyReceipt) as unknown as Contract;

    const receiptReceived = await sendTransaction(dummySendFn, dummyAccount);

    // receipt should be returned
    expect(receiptReceived).toBe(dummyReceipt);
  });

  it('should call the transactionHash of send transaction and poll to gnosis safe API', async () => {
    // mock the provider to return a gnosis safe address
    mockGetProvider.mockImplementation(() => {
      return {
        getCode: jest.fn(() => Promise.resolve('random-string')),
      } as unknown as ethers.providers.Web3Provider;
    });

    mockChainId.mockImplementation(() => Promise.resolve(5));

    // mock the pollTransactionDetails to return a dummy receipt
    mockPollTransactionDetails.mockImplementation(() =>
      Promise.resolve(dummyReceipt),
    );

    // resolving the callback function `sendFn` with `on` function
    // which will call the `transactionHash` callback & poll to gnosis safe API
    const dummySendFn = {
      on: jest.fn((event, callback) => {
        if (event === 'transactionHash') {
          callback('safeTxHash');
        }
      }),
    } as unknown as Contract;

    const receiptReceived = await sendTransaction(dummySendFn, dummyAccount);

    // receipt should be returned
    expect(receiptReceived).toBe(dummyReceipt);
  });
});
