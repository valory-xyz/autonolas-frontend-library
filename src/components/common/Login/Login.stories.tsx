import React from 'react';
import { Login } from './Login.tsx';
import Web3  from 'web3';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3DataProvider } from '../Web3DataProvider.tsx';

const getLibrary = (provider: any) => new Web3.default(provider);

export default { title: 'Login' };

export const Default = (): JSX.Element => (
  <Web3DataProvider>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Login
        onConnect={(e) => console.log(e)}
        onDisconnect={() => console.log('disconnect')}
      />
    </Web3ReactProvider>
  </Web3DataProvider>
);

export const LinkButton = (): JSX.Element => (
  <Web3DataProvider>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Login
        onConnect={(e) => console.log(e)}
        onDisconnect={() => console.log('disconnect')}
        buttonProps={{ type: 'link' }}
        isDapp={false}
        backendUrl="https://contribution-service-backend.staging.autonolas.tech"
        showNetworkName={false}
      />
    </Web3ReactProvider>
  </Web3DataProvider>
);
