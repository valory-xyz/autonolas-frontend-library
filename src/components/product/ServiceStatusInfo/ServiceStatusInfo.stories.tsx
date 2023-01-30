import React from 'react';
import styled from 'styled-components';
import { Typography, Divider } from 'antd';
import { ServiceStatusInfo } from './ServiceStatusInfo';

export default {
  title: 'Service Status Info',
};

const { Text } = Typography;

const DummyContianer = styled.div`
  font-family: system-ui;
  a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 4px;
    line-height: 1.5715;
  }
  .row-1 {
    font-size: 14px;
  }
  .service-status-maximized {
    /* just for storybook, else it will be always be sticky in footer */
    position: relative !important;
    bottom: 0;
    left: 0;
  }
  .ant-divider-horizontal {
    padding-top: 1rem;
  }
`;

export const Default = () => {
  return (
    <DummyContianer>
      <Divider orientation="left">Contribution Widget</Divider>
      <ServiceStatusInfo
        isHealthy={true}
        secondsLeftReceived={15}
        appType="contribution"
        onMinimizeToggle={(isMinimized) => console.log({ isMinimized })}
      />

      <Divider orientation="left">Generic without appType</Divider>
      <ServiceStatusInfo
        isHealthy={true}
        secondsLeftReceived={15}
        extra={
          <div>
            <Text className="row-1">CODE</Text>
            <div className="status-sub-content">Some text</div>
          </div>
        }
        extraMd={<div> Some text on md </div>}
        onMinimizeToggle={(isMinimized) => console.log({ isMinimized })}
      />
    </DummyContianer>
  );
};
