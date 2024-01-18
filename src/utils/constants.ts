// chain Ids
export const STAGING_CHAIN_ID = 31337;
export const LOCAL_FORK_ID = 100000; // used for testing

export const NA = 'n/a';

export const GATEWAY_URL = 'https://gateway.autonolas.tech/ipfs/';

export const HASH_PREFIX = 'f01701220';
export const HASH_PREFIXES = {
  type1: HASH_PREFIX,
  type2: 'bafybei',
};

// These constants define the types of virtual machines supported
export const VM_TYPE = {
  EVM: 'evm', // Ethereum Virtual Machine
  SVM: 'svm', // Solana Virtual Machine
};

// Constants for Solana chain names
export const SOLANA_CHAIN_NAMES = {
  MAINNET: 'solana',
  DEVNET: 'solana-devnet',
} as const;
