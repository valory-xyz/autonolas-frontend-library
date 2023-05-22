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
