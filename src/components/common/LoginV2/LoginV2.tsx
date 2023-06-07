import React, { FC, useEffect, useMemo, useState } from 'react';
const { EthereumClient, w3mConnectors, w3mProvider } = await import(
  '@web3modal/ethereum'
);
import { Web3Modal } from '@web3modal/react';
import {
  configureChains,
  createConfig,
  WagmiConfig,
  useAccount,
  useNetwork,
  Address,
} from 'wagmi';
import {
  mainnet,
  gnosis,
  polygon,
  goerli,
  polygonMumbai,
  gnosisChiado,
} from 'wagmi/chains';
import { Web3Button, Web3NetworkSwitch } from '@web3modal/react';
import { COLOR } from '../../../utils/theme.js';
import {
  SUPPORTED_NETWORKS,
  SUPPORTED_TEST_NETWORKS,
} from '../../../utils/constants.js';
import { UnsupportedNetworks, unsupportedText } from './utils.js';
import { LoginContainer } from './styles.js';

/**
 * configs
 */
const chains = [mainnet, goerli, gnosis, gnosisChiado, polygon, polygonMumbai];
const projectId = (process.env.NEXT_PUBLIC_WALLET_PROJECT_ID ||
  process.env.WALLET_PROJECT_ID) as string;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({
    projectId,
    version: 2, // v2 of wallet connect
    chains,
  }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

/**
 * types
 */
type ConnectType = {
  address: string | null;
  balance?: string | null;
  chainId?: number | null;
};

type LoginProps = {
  // similar props to v1
  onConnect?: ({}: ConnectType) => void; // TODO: pass balance, chainId
  onDisconnect?: () => void;
  // onError?: (error: Error) => void; // TODO: check if this is required
  // /**
  //  * TODO: make it more generic
  //  * if the application uses both blockchain node & backend,
  //  * then it is not considered as complete dapp. Hence point
  //  * to mainnet only on production
  //  */
  isDapp?: boolean;
  backendUrl?: string;
  supportedNetworks?: number[];

  // more props for v2 (new)
  theme?: 'light' | 'dark';
  showNetworkSwitch?: boolean;
  // buttonTheme // TODO
};

/**
 * Login component v2
 */
export const LoginV2: FC<LoginProps> = ({
  onConnect: onConnectCb,
  onDisconnect: onDisconnectCb,
  // onError: onErrorCb,
  isDapp = true,
  backendUrl,
  supportedNetworks,
  theme = 'light',
  showNetworkSwitch = true,
}) => {
  const [account, setAccount] = useState<Address | undefined>(undefined);
  const { chain } = useNetwork();
  const chainId = chain?.id;

  useAccount({
    onConnect: ({ address }) => {
      setAccount(address);
    },
    onDisconnect: () => {
      setAccount(undefined);
      if (onDisconnectCb) onDisconnectCb();
    },
  });

  useEffect(() => {
    if (account && onConnectCb) {
      onConnectCb({ address: account });
    }
  }, [account, onConnectCb]);

  const isStaging = useMemo(() => {
    return (backendUrl || '').includes('staging');
  }, [backendUrl]);

  const isValidNetwork = useMemo(() => {
    // staging and other preview env
    if (isStaging) {
      return SUPPORTED_TEST_NETWORKS.some((e) => e.id === chainId);
    }

    // production env
    return chainId === 1;
  }, [chainId, isStaging]);

  return (
    <LoginContainer>
      {chainId && (
        <>
          {isDapp ? (
            <>
              {!(supportedNetworks || SUPPORTED_NETWORKS).includes(chainId) && (
                <div className="unsupported-network">{unsupportedText}</div>
              )}
            </>
          ) : (
            <>
              {!isValidNetwork && <UnsupportedNetworks isStaging={isStaging} />}
            </>
          )}
        </>
      )}

      <WagmiConfig config={wagmiConfig}>
        {showNetworkSwitch && (
          <>
            <Web3NetworkSwitch />
            &nbsp;&nbsp;
          </>
        )}
        <Web3Button balance="show" avatar="hide" />
      </WagmiConfig>

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeMode={theme}
        themeVariables={{
          '--w3m-button-border-radius': '5px',
          '--w3m-accent-color': COLOR.PRIMARY,
          '--w3m-background-color': COLOR.PRIMARY,
        }}
      />
    </LoginContainer>
  );
};
