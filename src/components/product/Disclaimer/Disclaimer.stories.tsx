import React from 'react';
import styled from 'styled-components';
import { Divider, message } from 'antd';
import { Disclaimer } from './Disclaimer';

export default {
  title: 'Disclaimer',
};

const DummyDisclaimerContianer = styled.div`
  .ant-divider-horizontal {
    padding-top: 1rem;
  }
`;

export const Default = () => (
  <DummyDisclaimerContianer>
    <Divider orientation="left">Default</Divider>
    <Disclaimer />

    <Divider orientation="left">
      On click callback on default disclaimer
    </Divider>
    <Disclaimer
      onDisclaimerClick={() => message.info('This is a callback message')}
    />

    <Divider orientation="left">Custom Message</Divider>
    <Disclaimer message="This is a custom message" />
  </DummyDisclaimerContianer>
);
