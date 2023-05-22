import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
// import { EthereumProvider } from '@walletconnect/ethereum-provider';
// import type { EthereumRpcMap } from '@walletconnect/ethereum-provider/dist/types/EthereumProvider';
import { GenericObject } from '../../../types';

type rcpType = GenericObject | undefined;

const PROJECT_ID = '1b87939bfd17a9b5104e180353f4ff67';

const localRpc = {
  1: process.env.RPC_MAINNET_URL,
  5: process.env.RPC_GOERLI_URL,
  31337: process.env.RPC_LOCAL_URL,
};

/**
 * Singleton class to create only one instance of `web3Modal`
 */
export const ProviderOptions = (function () {
  let web3Modal: Web3Modal;

  function createInstance(rpc: rcpType) {
    if (typeof window !== 'undefined') {
      web3Modal = new Web3Modal({
        network: 'mainnet', // optional
        cacheProvider: true,
        providerOptions: {
          walletconnect: {
            // version: 1, 
            // package: EthereumProvider.init({
            //   projectId: PROJECT_ID,
            //   chains: [1, 5, 31337], // REQUIRED chain ids
            //   rpcMap: (rpc || localRpc) as EthereumRpcMap, // OPTIONAL rpc urls for each chain
            // }), // required
            package: WalletConnectProvider, // required
            // package: EthereumProvider, // required
            options: {
              infuraId: undefined, // required
              rpc: rpc || localRpc,

              // rpcMap: rpc || localRpc,
              // projectId: PROJECT_ID,

            },
          },
        },
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

// export const NewProviderOptions = (function (rpc) {
//   const provider = EthereumProvider.init({
//     projectId: PROJECT_ID,
//     chains: [1, 5, 31337], // REQUIRED chain ids
//     rpcMap: (rpc || localRpc) as EthereumRpcMap, // OPTIONAL rpc urls for each chain
//   });

//   return provider;
// })();

// export const myNewProvider = EthereumProvider.init({
//   projectId: PROJECT_ID,
//   chains: [1, 5, 31337], // REQUIRED chain ids
//   rpcMap: localRpc as EthereumRpcMap, // OPTIONAL rpc urls for each chain
// });

// export const options = {
//   projectId, // REQUIRED your projectId
//   chains, // REQUIRED chain ids
//   methods, // OPTIONAL ethereum methods
//   events, // OPTIONAL ethereum events
//   rpcMap, // OPTIONAL rpc urls for each chain
//   metadata, // OPTIONAL metadata of your app
//   showQrModal, // OPTIONAL - `true` by default
// };
