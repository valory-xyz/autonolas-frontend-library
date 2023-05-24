import React from 'react';
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, gnosis, polygon, goerli, polygonMumbai } from 'wagmi/chains';
import { Web3Button } from '@web3modal/react';

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

export const LoginV2 = () => {
  console.log(process.env);
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <HomePage />
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
};
