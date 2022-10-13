import React, { useState, createContext, ReactNode, FC } from 'react';
import Web3 from 'web3';

// TODO: check type of provider
type ProviderType = any | null;
type Web3ProviderType = Web3 | null;

type ProviderContextType = {
  provider: ProviderType;
  setProvider: (provider: ProviderType) => void;
  web3Provider: Web3ProviderType;
  setWeb3Provider: (provider: Web3ProviderType) => void;
};

export const Web3DataContext = createContext<ProviderContextType>(
  {} as ProviderContextType,
);

export const Web3DataProvider: FC = ({ children }: { children: ReactNode }) => {
  const [provider, setProvider] = useState<ProviderType>(null);
  const [web3Provider, setWeb3Provider] = useState<Web3ProviderType>(null);

  return (
    <div>
      <Web3DataContext.Provider
        value={{
          provider,
          setProvider,
          web3Provider,
          setWeb3Provider,
        }}
      >
        {children}
      </Web3DataContext.Provider>
    </div>
  );
};
