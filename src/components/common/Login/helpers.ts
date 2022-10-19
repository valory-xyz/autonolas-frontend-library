import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { GenericObject } from 'src/components/types';

type rcpType = GenericObject | undefined;

const localRpc = {
  1: process.env.NEXT_PUBLIC_MAINNET_URL,
  5: process.env.NEXT_PUBLIC_GOERLI_URL,
  31337: process.env.NEXT_PUBLIC_AUTONOLAS_URL,
};

/**
 * Singleton class to create only one instance of `web3Modal`
 */
export const ProviderOptions = (function () {
  let web3Modal: Web3Modal;

  function createInstance(rpc: rcpType) {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: undefined, // required
          rpc: rpc || localRpc,
        },
      },
    };

    if (typeof window !== 'undefined') {
      web3Modal = new Web3Modal({
        network: 'mainnet', // optional
        cacheProvider: true,
        providerOptions, // required
      });
    }

    return web3Modal;
  }

  return {
    getWeb3ModalInstance: function (rpcDetails: rcpType) {
      if (!web3Modal) {
        web3Modal = createInstance(rpcDetails);
      }
      return web3Modal;
    },
  };
})();
