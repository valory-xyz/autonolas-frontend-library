import React from 'react';
import { Loader } from './Loader';

export default {
  title: 'Loader',
};

export const Default = (): JSX.Element => <Loader />;

export const IfAccountRequired = (): JSX.Element => (
  <Loader isAccountRequired account="0xABCD" timeoutSeconds={2} />
);

export const NotConnectedMessage = (): JSX.Element => (
  <Loader
    isAccountRequired
    account={null}
    timeoutSeconds={2}
    notConnectedMessage={
      <>No account, please connect. This is custom message</>
    }
  />
);

export const CustomTimeoutMessage = (): JSX.Element => (
  <Loader
    timeoutMessage={<>This is custom timeout message</>}
    timeoutSeconds={2}
  />
);
