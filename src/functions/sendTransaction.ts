/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers, Contract } from 'ethers';
import { notification } from 'antd';
import get from 'lodash/get';
import { Web3ReceiptType } from '../types';
// import { GenericObject } from '../types';

const SAFE_API_MAINNET =
  'https://safe-transaction-mainnet.safe.global/api/v1/multisig-transactions';
const SAFE_API_GOERLI =
  'https://safe-transaction-goerli.safe.global/api/v1/multisig-transactions';

const getUrl = (hash: string, chainId: number) => {
  const mainnetUrl =
    process.env.NEXT_PUBLIC_GNOSIS_SAFE_API_MAINNET || SAFE_API_MAINNET;
  const goerliUrl =
    process.env.NEXT_PUBLIC_GNOSIS_SAFE_API_GOERLI || SAFE_API_GOERLI;

  return chainId === 5 ? `${goerliUrl}/${hash}` : `${mainnetUrl}/${hash}`;
};

/**
 * poll gnosis-safe API every 3 seconds
 */
async function pollTransactionDetails(hash: string, chainId: number) {
  return new Promise((resolve, reject) => {
    /* eslint-disable-next-line consistent-return */
    const interval = setInterval(async () => {
      window.console.log('Fetching transaction receipt...');

      try {
        const response = await fetch(getUrl(hash, chainId));
        const json = await response.json();
        const isSuccessful = get(json, 'isSuccessful');

        if (isSuccessful) {
          window.console.log('Transaction details: ', json);
          clearInterval(interval);
          resolve(json);
        }
      } catch (error) {
        clearInterval(interval);
        reject(error);
      }
    }, 3000);
  });
}

/**
 * poll until the hash has been approved before deploy
 */
export const sendTransaction = (
  sendFn: Contract,
  account = (window as any)?.MODAL_PROVIDER?.accounts[0],
  // extra: GenericObject,
) => {
  return new Promise((resolve, reject) => {
    const provider = new ethers.providers.Web3Provider(
      (window as any).MODAL_PROVIDER,
      'any',
    );

    provider
      .getCode(account)
      .then(async (code) => {
        const isGnosisSafe = code !== '0x';

        if (isGnosisSafe) {
          /**
           * Logic to deal with gnosis-safe
           * - show notification on to check gnosis-safe
           * - poll until transaction is completed
           * - return response
           */
          notification.warning({
            message: 'Please submit the transaction in your safe app.',
          });

          sendFn
            .on('transactionHash', async (safeTx: string) => {
              window.console.log('safeTx', safeTx);

              /**
               * use `transactionHash`, get the hash, then poll until
               * it resolves with Output
               */
              const chainId =
                (await (window as any).WEB3_PROVIDER?.eth?.getChainId()) || 1;
              pollTransactionDetails(safeTx, chainId)
                .then((receipt) => {
                  resolve(receipt);
                })
                .catch((e) => {
                  console.error('Error on fetching transaction details');
                  reject(e);
                });
            })
            .catch((e: Error) => {
              reject(e);
            });
        } else {
          // usual send function
          sendFn
            .then((receipt: Web3ReceiptType) => {
              resolve(receipt);
            })
            .catch((e: Error) => {
              reject(e);
            });
        }
      })
      .catch(() => {
        console.error('Error on fetching code');
      });
  });
};
