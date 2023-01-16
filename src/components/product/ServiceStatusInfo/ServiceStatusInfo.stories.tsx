import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { ServiceStatusInfo } from './ServiceStatusInfo';

export default {
  title: 'Service Status Info',
};

const { Text } = Typography;

const DummyContianer = styled.div`
  height: 300vh;
  a {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 4px;
    line-height: 1.5715;
  }
  .row-1 {
    font-size: 14px;
  }
`;

const DotSpace = () => <>&nbsp;&nbsp;•&nbsp;&nbsp;</>;

const temp = [
  {
    name: 'Contract One',
    link: 'https://etherscan.io/address/0x02c26437b292d86c5f4f21bbcce0771948274f84',
  },
  {
    name: 'Code',
    link: 'https://github.com/valory-xyz/contribution-service',
  },
];

export const Default = () => {
  const list = temp.map((contract, index) => (
    <>
      <Text type="secondary" className="row-2">
        <a href={contract.link} target="_blank" rel="noreferrer">
          {contract.name}
        </a>
      </Text>
      {temp.length - 1 !== index && <DotSpace />}
    </>
  ));

  return (
    <DummyContianer>
      <ServiceStatusInfo
        isHealthy={true}
        // isHealthy={undefined}
        secondsLeftReceived={15}
        extra={
          <div>
            <Text className="row-1">CODE</Text>
            <div>{list}</div>
          </div>
        }
        extraMd={<div>{list}</div>}
        onMinimizeToggle={(isMinimized) => console.log({ isMinimized })}
      />
    </DummyContianer>
  );
};
