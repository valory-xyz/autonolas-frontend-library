import WalletConnectProvider from '@walletconnect/web3-provider';

const NEXT_PUBLIC_MAINNET_URL =
  'https://eth-mainnet.g.alchemy.com/v2/BNoJd02lcSZ1ssRFoz-Rm3S_AMdVOYWd';
const NEXT_PUBLIC_GOERLI_URL =
  'https://eth-goerli.alchemyapi.io/v2/_SrakDJgKhVl19B6EUYK9LEiyU1auKsL';
const NEXT_PUBLIC_AUTONOLAS_URL = 'https://chain.staging.autonolas.tech/';

export const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: undefined, // required
      rpc: {
        1: NEXT_PUBLIC_MAINNET_URL,
        5: NEXT_PUBLIC_GOERLI_URL,
        31337: NEXT_PUBLIC_AUTONOLAS_URL,
      },
    },
  },
};
