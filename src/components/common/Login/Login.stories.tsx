import React from 'react';
import { Login } from './Login';
import Web3 from 'web3';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3DataProvider } from '../Web3DataProvider';

const getLibrary = (provider: any) => new Web3(provider);

export default { title: 'Login' };

export const Default = (): JSX.Element => (
  <Web3DataProvider>
    <Web3ReactProvider getLibrary={getLibrary}>
      <Login
        onConnect={(e) => {
          console.log(e);
          console.log((window as any).MODAL_PROVIDER);
          console.log((window as any).WEB3_PROVIDER);
        }}
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
      />
    </Web3ReactProvider>
  </Web3DataProvider>
);
