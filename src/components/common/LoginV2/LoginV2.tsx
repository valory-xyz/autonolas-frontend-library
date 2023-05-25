import React from 'react';
import { ButtonProps } from 'antd';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import {
  configureChains,
  createConfig,
  WagmiConfig,
  useAccount,
  useBalance,
  useNetwork
} from 'wagmi';
import { mainnet, gnosis, polygon, goerli, polygonMumbai } from 'wagmi/chains';
import { Web3Button } from '@web3modal/react';
import { GenericObject } from '../../../types';

const chains = [mainnet, gnosis, polygon, goerli, polygonMumbai];
const projectId = process.env.WALLET_PROJECT_ID as string;

function HomePage() {
  return <Web3Button />;
}
const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 2, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

type ConnectType = {
  address?: string | null;
  balance?: string | null;
  chainId?: number | null;
};

type LoginProps = {
  onConnect?: ({}: ConnectType) => void;
  // onDisconnect?: () => void;
  // onError?: (error: Error) => void;
  // rpc?: GenericObject;
  // buttonProps?: ButtonProps;
  // /**
  //  * TODO: make it more generic
  //  * if the application uses both blockchain node & backend,
  //  * then it is not considered as complete dapp. Hence point
  //  * to mainnet only on production
  //  */
  // isDapp?: boolean;
  // backendUrl?: string;
  // supportedNetworks?: number[];
};

const useLoginHelpers = (account: `0x${string}`) => {
  const { data } = useBalance({
    address: account,
  });

  return {
    balance: data,
  };
};

export const LoginV2 = ({}: LoginProps) => {
  // console.log(process.env);

  const account = useAccount({
    onConnect: (account) => {
      console.log(account);
      // const { balance } = useLoginHelpers(account);
      // console.log(balance);
    },
  });

  const { chain, chains } = useNetwork();

  console.log(chain, chains);

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <HomePage />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};
