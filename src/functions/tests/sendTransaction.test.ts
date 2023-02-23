import { ethers, Contract } from 'ethers';
import {
  getUrl,
  SAFE_API_MAINNET,
  SAFE_API_GOERLI,
  sendTransaction,
} from '../sendTransaction';
import * as HELPER_METHODS from '../sendTransaction';

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

const mockGetProvider = jest.spyOn(HELPER_METHODS, 'getProvider');
const mockChainId = jest.spyOn(HELPER_METHODS, 'getChainId');
const mockPollTransactionDetails = jest.spyOn(
  HELPER_METHODS,
  'pollTransactionDetails',
);

// jest.mock('../sendTransaction.ts', () => ({
//   getProvider: jest.fn(() => ({
//     getCode: Promise.resolve('0x'),
//   })),
// }));

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

// write a test case for sendTransaction function from sendTransaction.ts
describe('sendTransaction', () => {
  // Before each test, stub the fetch function
  // beforeEach(() => {
  //   window.fetch = jest.fn();
  // });

  // beforeEach(() => {
  //   window.fetch = jest.fn();
  // });

  // (getProvider as any).mockImplementation(() => ({
  //   getCode: Promise.resolve('0x'),
  // }));

  it('should call the send transaction passed as a param (non gnosis safe)', async () => {
    mockGetProvider.mockImplementation(() => {
      return {
        getCode: jest.fn(() => Promise.resolve('0x')),
      } as unknown as ethers.providers.Web3Provider;
    });

    // const dummySendFn = jest.fn(() =>
    //   Promise.resolve(dummyReceipt)
    // ) as unknown as Contract;

    const dummySendFn = Promise.resolve(dummyReceipt) as unknown as Contract;

    const receiptReceived = await sendTransaction(dummySendFn, '0x123');
    expect(receiptReceived).toBe(dummyReceipt);
  });

  it('should call the transactionHash of send transaction and poll to gnosis safe API', async () => {
    mockGetProvider.mockImplementation(() => {
      return {
        getCode: jest.fn(() => Promise.resolve('random-string')),
      } as unknown as ethers.providers.Web3Provider;
    });

    // 
    mockChainId.mockImplementation(() => Promise.resolve(5));


    mockPollTransactionDetails.mockImplementation(() =>
      Promise.resolve(dummyReceipt),
    );

    // ({
    //   on: jest.fn('transactionHash', () => 'safeTxHash'),
    // })
    const dummySendFn = {
      on: jest.fn((event, callback) => {
        if (event === 'transactionHash') {
          callback('safeTxHash');
        }
      }),
    } as unknown as Contract;

    const receiptReceived = await sendTransaction(dummySendFn, '0x123');

    // notifcation should be shown
    // expect(/Please submit the transaction on Gnosis Safe/).toBeInTheDocument();

    // receipt should be returned
    expect(receiptReceived).toBe(dummyReceipt);
  });
});
