import React from 'react';
import { useNetwork } from 'wagmi';
import { Switch } from 'antd';
import { LoginV2 } from './LoginV2';

export default { title: 'LoginV2' };

export const Default = (): JSX.Element => {
  const { chain, chains } = useNetwork();
  const [theme, setTheme] = React.useState<'light' | 'dark'>('light');
  window?.console.log({ chain, chains });

  return (
    <div
      style={{
        height: '95vh',
        backgroundColor: theme === 'dark' ? '#2E261C' : 'transparent',
        padding: '1rem',
      }}
    >
      <Switch
        checkedChildren="Light"
        unCheckedChildren="Dark"
        defaultChecked
        onChange={(e) => {
          setTheme(e ? 'light' : 'dark');
        }}
        style={{ display: 'flex', marginBottom: '1rem' }}
      />

      <LoginV2 theme={theme} />
    </div>
  );
};

export const NotDapp = (): JSX.Element => (
  <LoginV2
    onConnect={(e) => console.log(e)}
    onDisconnect={() => console.log('disconnected')}
    // onError={(e) => console.log(e)}
    isDapp={false}
    backendUrl="https://contribution-service-backend.staging.autonolas.tech"
  />
);
