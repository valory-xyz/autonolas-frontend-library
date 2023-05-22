/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useCallback, useState } from 'react';
// import Core
import Core from 'web3modal';
import { ethers } from 'ethers';
import { Button, ButtonProps, Popover } from 'antd';
import round from 'lodash/round';
import isNil from 'lodash/isNil';
import { WarningOutlined, CaretDownOutlined } from '@ant-design/icons';

import Web3 from 'web3';

import { SUPPORTED_NETWORKS, SUPPORTED_TEST_NETWORKS } from '../../../utils';
import { getBalance, getSymbolName } from '../../../functions';
import { GenericObject } from '../../../types';
import { EllipsisMiddle } from '../Ellipsis';
import { Web3DataContext } from '../Web3DataProvider';
import { ProviderOptions } from './helpers';
// import { EthereumProvider } from '@walletconnect/ethereum-provider';
import { Container, DetailsContainer, WalletContainer } from './styles';

/* --------------- Login component --------------- */
type ConnectType = {
  address?: string | null;
  balance?: string | null;
  chainId?: number | null;
};
type LoginProps = {
  onConnect?: ({}: ConnectType) => void;
  onDisconnect?: () => void;
  onError?: (error: Error) => void;
  rpc?: GenericObject;
  buttonProps?: ButtonProps;
  /**
   * TODO: make it more generic
   * if the application uses both blockchain node & backend,
   * then it is not considered as complete dapp. Hence point
   * to mainnet only on production
   */
  isDapp?: boolean;
  backendUrl?: string;
  supportedNetworks?: number[];
};

export const Login = ({
  rpc,
  onConnect,
  onDisconnect,
  onError,
  buttonProps,
  isDapp = true,
  backendUrl,
  supportedNetworks,
}: LoginProps) => {
  const web3Modal = ProviderOptions.getWeb3ModalInstance(rpc);

  // const web3Modal = await NewProviderOptions(rpc);
  // const web3Modal = myNewProvider;

  const { provider, web3Provider, setProvider, setWeb3Provider } =
    useContext(Web3DataContext);

  const [account, setUserAccount] = useState<string | null>(null);
  const [balance, setUserBalance] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<Error | null>(null);

  const setBalance = async (accountPassed: string) => {
    try {
      const result = await getBalance(accountPassed, web3Provider as Web3);
      setUserBalance(result as string);
    } catch (error) {
      setErrorMessage(error);
    }
  };

  useEffect(() => {
    if (account && web3Provider) {
      setBalance(account);
    }
  }, [account, web3Provider]);

  const handleLogin = useCallback(async () => {
    // This is the initial `provider` that is returned when
    // using web3Modal to connect. Can be MetaMask or WalletConnect.
    try {
      // const modalProvider = await EthereumProvider.init({
      //   projectId: '1b87939bfd17a9b5104e180353f4ff67',
      //   chains: [1, 5, 31337],
      // });

      // console.log(modalProvider)

      // await modalProvider.enable();

      const modalProvider = await web3Modal.connect();

      // We plug the initial `provider` and get back
      // a Web3Provider. This will add on methods and
      // event listeners such as `.on()` will be different.
      const wProvider = new Web3(modalProvider);
      // const abcd = new ethers.providers.Web3Provider(modalProvider);

      const address = await wProvider.eth.getAccounts();
      const currentChainId = await wProvider.eth.getChainId();

      // *******************************************************
      // ************ setting to the window object! ************
      // *******************************************************
      (window as any).MODAL_PROVIDER = modalProvider;
      (window as any).WEB3_PROVIDER = wProvider;

      // console.log({
      //   modalProvider,
      //   wProvider,
      //   abcd,
      // });

      setUserAccount(address[0]);
      setProvider(modalProvider);
      setWeb3Provider(wProvider);
      setChainId(currentChainId || null);
    } catch (error) {
      window.console.error(error);
    }
  }, []);

  const disconnectAccount = useCallback(async () => {
    if (provider?.disconnect && typeof provider.disconnect === 'function') {
      await provider.disconnect();
    }

    setUserAccount(null);
    setUserBalance(null);
    setErrorMessage(null);
    setProvider(null);

    if (onDisconnect) onDisconnect();
  }, [provider]);

  // Auto connect to the cached provider
  // useEffect(() => {
  //   if (web3Modal && web3Modal.cachedProvider) {
  //     handleLogin();
  //   }
  // }, [handleLogin]);

  // A `provider` should come with EIP-1193 events. We'll listen for those events
  // here so that when a user switches accounts or networks, we can update the
  // local React state with that new information.
  useEffect(() => {
    if (provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        window.console.log('accountsChanged', accounts);
        setUserAccount(accounts[0]);
      };

      // https://docs.ethers.io/v5/concepts/best-practices/#best-practices--network-changes
      const handleChainChanged = () => {
        window.location.reload();
      };

      const handleDisconnect = (error: Error) => {
        window.console.log('disconnect', error);
        disconnectAccount();
      };

      provider.on('accountsChanged', handleAccountsChanged);
      provider.on('chainChanged', handleChainChanged);
      provider.on('disconnect', handleDisconnect);

      // cleanup
      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', handleAccountsChanged);
          provider.removeListener('chainChanged', handleChainChanged);
          provider.removeListener('disconnect', handleDisconnect);
        }
      };
    }

    return undefined;
  }, [provider, disconnectAccount]);

  /**
   * trigger callback if the values are changed
   */
  useEffect(() => {
    const values: ConnectType = { address: account, balance, chainId };
    if (account && onConnect) onConnect(values);
  }, [account, balance, chainId]);

  useEffect(() => {
    if (errorMessage && onError) onError(errorMessage);
  }, [errorMessage]);

  const isStaging = () => {
    return (backendUrl || '').includes('staging');
  };

  /**
   * returns if the current network is supported based on backend URL configured
   */
  const isValidNetwork = () => {
    // staging and other preview env
    if (isStaging()) {
      return SUPPORTED_TEST_NETWORKS.some((e) => e.id === chainId);
    }

    // production env
    return chainId === 1;
  };

  // if (errorMessage) {
  //   return (
  //     <Container>
  //       <WalletContainer data-testid="login-error">
  //         {errorMessage}
  //       </WalletContainer>
  //     </Container>
  //   );
  // }

  if (!account || !chainId) {
    return (
      <Container>
        <Button type="primary" onClick={handleLogin} {...(buttonProps || {})}>
          Connect Wallet
        </Button>
      </Container>
    );
  }

  const unsupportedText = (
    <>
      <WarningOutlined />
      Unsupported network
    </>
  );

  return (
    <Container>
      <DetailsContainer>
        <WalletContainer>
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

          <div>
            {isNil(balance)
              ? '--'
              : `${round(Number(balance), 2)} ${getSymbolName(
                  Number(chainId),
                )}`}
          </div>
          <div className="dash" />
          <EllipsisMiddle data-testid="wallet-address">
            {account ? `${account}` : 'NA'}
          </EllipsisMiddle>
          <Button type="ghost" onClick={disconnectAccount}>
            Disconnect
          </Button>
        </WalletContainer>
      </DetailsContainer>
    </Container>
  );
};
