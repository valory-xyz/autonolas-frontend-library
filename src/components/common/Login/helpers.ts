import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { GenericObject } from '../../../types/index.ts';

type rcpType = GenericObject | undefined;

const localRpc = {
  1: process.env.RPC_MAINNET_URL,
  5: process.env.RPC_GOERLI_URL,
  100: process.env.RPC_GNOSIS_URL,
  31337: process.env.RPC_LOCAL_URL,
};

/**
 * Singleton class to create only one instance of `web3Modal`
 */
export const ProviderOptions = (function () {
  let web3Modal: any;

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
      web3Modal = new Web3Modal.default({
        network: 'mainnet', // optional
        cacheProvider: true,
        providerOptions,
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
