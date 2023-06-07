import React from 'react';
import styled from 'styled-components';
import { Divider, notification } from 'antd';
import { Disclaimer, DefaultDisclaimerText } from './index.tsx';

export default {
  title: 'Disclaimer',
};

const DummyDisclaimerContianer = styled.default.div`
  .ant-divider-horizontal {
    padding-top: 1rem;
  }
`;

export const Default = () => (
  <DummyDisclaimerContianer>
    <Divider orientation="left">Default</Divider>
    <Disclaimer />

    <Divider orientation="left">Disclaimer with custom HREF</Divider>
    <Disclaimer href="https://autonolas.network/" />

    <Divider orientation="left">
      On click callback on default disclaimer
    </Divider>
    <Disclaimer
      onDisclaimerClick={() =>
        notification.info({
          message: 'This is a callback message',
        })
      }
    />

    <Divider orientation="left">Custom Message</Divider>
    <Disclaimer message="This is a custom message" />
  </DummyDisclaimerContianer>
);

export const DisclaimerText = () => (
  <>
    <DefaultDisclaimerText />
  </>
);
