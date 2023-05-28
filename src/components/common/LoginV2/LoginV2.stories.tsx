import React from 'react';
import { useNetwork } from 'wagmi';
import { LoginV2 } from './LoginV2';

export default { title: 'LoginV2' };

export const Default = (): JSX.Element => {
  const { chain } = useNetwork();
  console.log(chain);
  return (
    <>
      <LoginV2 />
    </>
  );
};

export const NotDapp = (): JSX.Element => (
  <LoginV2
    // onConnect={(e) => console.log(e)}
    // onDisconnect={() => console.log('disconnect')}
    // buttonProps={{ type: 'link' }}
    isDapp={false}
    backendUrl="https://contribution-service-backend.staging.autonolas.tech"
  />
);
