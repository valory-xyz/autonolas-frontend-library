import React, { Fragment, useState, useEffect, ReactNode } from 'react';
import { Typography, Statistic } from 'antd/lib';
import isNil from 'lodash/isNil';
import PoweredBy from './images/powered-by';
import {
  ContractsInfoContainer,
  PoweredByLogo,
  NextUpdateTimer,
} from './styles';

const { Text } = Typography;
const { Countdown } = Statistic;

type ServiceStatusInfoDetails = {
  isHealthy: boolean;
  secondsLeftReceived: number;
};

export const ServiceStatusInfo = ({
  isHealthy,
  secondsLeftReceived,
}: ServiceStatusInfoDetails) => {
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    setSeconds(secondsLeftReceived);
  }, [secondsLeftReceived]);

  const LIST = [
    {
      id: 'health',
      component: (
        <>
          {isHealthy ? (
            <>
              <span className="dot dot-online" />
              &nbsp;Operational
            </>
          ) : (
            <>
              <span className="dot dot-offline" />
              &nbsp;Disrupted
            </>
          )}
        </>
      ),
    },
    {
      id: 'next-update',
      component: (
        <NextUpdateTimer>
          Next Update:&nbsp;
          {isNil(seconds) ? (
            '--'
          ) : (
            <Countdown
              value={Date.now() + Math.round(seconds) * 1000}
              format="ss"
              suffix="s"
              onFinish={async () => {
                window.console.log('completed');
              }}
            />
          )}
        </NextUpdateTimer>
      ),
    },
  ];

  return (
    <ContractsInfoContainer>
      <PoweredByLogo>
        <a href="https://autonolas.network" target="_blank" rel="noreferrer">
          <PoweredBy />
        </a>
      </PoweredByLogo>

      {LIST.map(({ id, component }, index) => (
        <Fragment key={id}>
          <Text type="secondary">
            {component}
            {index !== LIST.length - 1 && <>&nbsp;&nbsp;•&nbsp;&nbsp;</>}
          </Text>
        </Fragment>
      ))}
    </ContractsInfoContainer>
  );
};
