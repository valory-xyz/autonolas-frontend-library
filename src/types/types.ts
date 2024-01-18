import { SOLANA_CHAIN_NAMES } from '../utils';

export type Web3ReceiptType = {
  blockHash: string;
  blockNumber: number;
  contractAddress: string;
  cumulativeGasUsed: number;
  from: string;
  gasUsed: number;
  logs: unknown[];
  logsBloom: string;
  status: boolean;
  to: string;
  transactionHash: string;
  transactionIndex: number;
};

// refer to { Chain } from 'view' to see all the fields
// TODO: Chain should represent the "Chain from viem"
// eg. Chain = { id: 1, name: 'mainnet', rpcUrl: 'https://mainnet.infura.io/v3/...' }
export type Chain = {
  id: number;
};

export type RpcUrl = {
  [key: number]: string;
};

export type SolanaChainNames =
  typeof SOLANA_CHAIN_NAMES[keyof typeof SOLANA_CHAIN_NAMES];
