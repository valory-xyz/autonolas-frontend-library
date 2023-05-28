import React, { useEffect } from 'react';
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

  // hooks
  useAccount,
  useConnect,
  useBalance,
  useNetwork,

  // types
  Address,
} from 'wagmi';
import { mainnet, gnosis, polygon, goerli, polygonMumbai } from 'wagmi/chains';
import { Web3Button } from '@web3modal/react';
import { Button, Popover } from 'antd';
import { WarningOutlined, CaretDownOutlined } from '@ant-design/icons';
import {
  COLOR,
  SUPPORTED_NETWORKS,
  SUPPORTED_TEST_NETWORKS,
} from '../../../utils';
import { GenericObject } from '../../../types';
import { LoginContainer } from './styles';

/**
 * configs and helpers
 */

const chains = [mainnet, gnosis, polygon, goerli, polygonMumbai];
const projectId = process.env.WALLET_PROJECT_ID as string;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 2, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

/**
 * types
 */

type ConnectType = {
  address?: string | null;
  balance?: string | null;
  chainId?: number | null;
};

type LoginProps = {
  // similar props to v1
  onConnect?: ({}: ConnectType) => void; // TODO: pass balance, chainId
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
  // rpc?: GenericObject;
  // buttonProps?: ButtonProps;
  // /**
  //  * TODO: make it more generic
  //  * if the application uses both blockchain node & backend,
  //  * then it is not considered as complete dapp. Hence point
  //  * to mainnet only on production
  //  */
  isDapp?: boolean;
  backendUrl?: string;
  supportedNetworks?: number[];

  // more props for v2
  theme: 'light' | 'dark';
};

const useLoginHelpers = (account: Address) => {
  const { data } = useBalance({ address: account });
  const { chain, chains } = useNetwork();
  // console.log(chain, chains);

  return {
    balance: data,
    chain,
  };
};

export const LoginV2 = ({
  onConnect: onConnectCb,
  onDisconnect: onDisconnectCb,
  onError: onErrorCb, // TODO: fix this
  isDapp = true,
  backendUrl,
  supportedNetworks,
  theme = 'light',
}: LoginProps) => {
  // console.log(process.env);
  const [account, setAccount] = React.useState<Address | undefined>(undefined);
  const { chain, chains } = useNetwork();
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

  // useConnect({
  //   onError: (error) => {
  //     if (onErrorCb) onErrorCb(error);
  //   },
  // });

  useEffect(() => {
    if (account && onConnectCb) {
      onConnectCb({ address: account });
    }
  }, [account, onConnectCb]);

  const unsupportedText = (
    <>
      <WarningOutlined />
      Unsupported network
    </>
  );

  const isStaging = () => {
    return (backendUrl || '').includes('staging');
  };

  const isValidNetwork = () => {
    // staging and other preview env
    if (isStaging()) {
      return SUPPORTED_TEST_NETWORKS.some((e) => e.id === chainId);
    }

    // production env
    return chainId === 1;
  };

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
              {!isValidNetwork() && (
                <div className="unsupported-network">
                  {unsupportedText}
                  <Popover
                    getPopupContainer={(triggerNode) =>
                      triggerNode.parentNode as HTMLElement
                    }
                    content={
                      <div>
                        {isStaging() ? (
                          <>
                            {SUPPORTED_TEST_NETWORKS.map((e) => (
                              <div key={`supported-chain-${e.id}`}>
                                {e.name}
                              </div>
                            ))}
                          </>
                        ) : (
                          <div>Ethereum</div>
                        )}
                      </div>
                    }
                    title="Switch to a supported network:"
                  >
                    <CaretDownOutlined />
                  </Popover>
                </div>
              )}
            </>
          )}
        </>
      )}

      <WagmiConfig config={wagmiConfig}>
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
