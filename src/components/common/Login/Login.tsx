import React, { useEffect, useContext, useCallback, useState } from 'react';
import { Button } from 'antd';
import round from 'lodash/round';
import isNil from 'lodash/isNil';

import Web3 from 'web3';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

import { SUPPORTED_NETWORKS } from '../../../utils';
import { EllipsisMiddle } from '../Ellipsis';
import { getBalance } from '../functions';
import { Web3DataContext } from '../Web3DataProvider';
import { Container, DetailsContainer, WalletContainer } from './styles';

/* --------------- web3Modal --------------- */
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: undefined, // required
      rpc: {
        1: process.env.NEXT_PUBLIC_MAINNET_URL,
        5: process.env.NEXT_PUBLIC_GOERLI_URL,
        31337: process.env.NEXT_PUBLIC_AUTONOLAS_URL,
      },
    },
  },
};

let web3Modal: Web3Modal;
if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({
    network: 'mainnet', // optional
    cacheProvider: true,
    providerOptions, // required
  });
}

/* --------------- Login component --------------- */
type LoginProps = {
  onClick?: () => { account?: string; balance?: string; chainId?: number };
};

export const Login = ({ onClick }: LoginProps) => {
  const { provider, web3Provider, setProvider, setWeb3Provider } =
    useContext(Web3DataContext);

  const [account, setUserAccount] = useState<string | null>(null);
  const [balance, setUserBalance] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const setBalance = async (accountPassed: string) => {
    try {
      const result = await getBalance(accountPassed, web3Provider as Web3);
      setUserBalance(result as string);
    } catch (error) {
      window.console.log(error);
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
      const modalProvider = await web3Modal.connect();

      // We plug the initial `provider` and get back
      // a Web3Provider. This will add on methods and
      // event listeners such as `.on()` will be different.
      const wProvider = new Web3(modalProvider);

      const address = await wProvider.eth.getAccounts();
      const currentChainId = await wProvider.eth.getChainId();

      // *******************************************************
      // ************ setting to the window object! ************
      // *******************************************************
      (window as any).MODAL_PROVIDER = modalProvider;
      (window as any).WEB3_PROVIDER = wProvider;

      setUserAccount(address[0]);
      setProvider(modalProvider);
      setWeb3Provider(wProvider);
      setChainId(currentChainId || null);
      // onClick({ address: address[0], chain: currentChainId || null });
    } catch (error) {
      window.console.error(error);
    }
  }, []);

  const disconnectAccount = useCallback(async () => {
    await web3Modal.clearCachedProvider();
    if (provider?.disconnect && typeof provider.disconnect === 'function') {
      await provider.disconnect();
    }

    setUserAccount(null);
    setUserBalance(null);
    setErrorMessage(null);
    setProvider(null);
  }, [provider]);

  // Auto connect to the cached provider
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      handleLogin();
    }
  }, [handleLogin]);

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

  if (errorMessage) {
    return (
      <Container>
        <WalletContainer data-testid="login-error">
          {errorMessage}
        </WalletContainer>
      </Container>
    );
  }

  if (!account || !chainId) {
    return (
      <Container>
        <Button type="primary" onClick={handleLogin}>
          Connect Wallet
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <DetailsContainer>
        <WalletContainer>
          {!SUPPORTED_NETWORKS.includes(chainId) && (
            <div className="unsupported-network">Unsupported network</div>
          )}
          <div>
            {isNil(balance) ? '--' : `${round(Number(balance), 2)} ETH`}
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
