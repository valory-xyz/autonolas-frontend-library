/* eslint-disable @typescript-eslint/no-explicit-any */
import { Contract } from 'ethers';
import { notification } from 'antd';
import { getChainId, getProvider, pollTransactionDetails } from './helpers';
import { Web3ReceiptType } from '../../types';

export const SAFE_API_MAINNET =
  'https://safe-transaction-mainnet.safe.global/api/v1/multisig-transactions';
export const SAFE_API_GOERLI =
  'https://safe-transaction-goerli.safe.global/api/v1/multisig-transactions';

export const getUrl = (hash: string, chainId: number) => {
  const mainnetUrl =
    process.env.NEXT_PUBLIC_GNOSIS_SAFE_API_MAINNET || SAFE_API_MAINNET;
  const goerliUrl =
    process.env.NEXT_PUBLIC_GNOSIS_SAFE_API_GOERLI || SAFE_API_GOERLI;

  return chainId === 5 ? `${goerliUrl}/${hash}` : `${mainnetUrl}/${hash}`;
};

/**
 * poll until the hash has been approved before deploy
 */
export const sendTransaction = (
  sendFn: Contract,
  account = (window as any)?.MODAL_PROVIDER?.accounts[0],
) => {
  return new Promise((resolve, reject) => {
    const provider = getProvider();

    provider
      .getCode(account)
      .then(async (code) => {
        // console.log(code);
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
              const chainId = await getChainId();

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
          sendFn
            .then((receipt: Web3ReceiptType) => {
              resolve(receipt);
            })
            .catch((e: Error) => {
              reject(e);
            });
        }
      })
      .catch((error) => {
        console.error('Error on fetching code');
        reject(error);
      });
  });
};
