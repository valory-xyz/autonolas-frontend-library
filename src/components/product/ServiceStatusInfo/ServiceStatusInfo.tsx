import React, { useState, useEffect, ReactNode } from 'react';
import { Typography, Statistic, Button } from 'antd';
import { ShrinkOutlined } from '@ant-design/icons';
import { isUndefined, isNil } from 'lodash';
import PoweredBy from './svgs/powered-by';
import { MinimizedStatus } from './svgs/minimized-status';
import {
  ContractsInfoContainer,
  PoweredByLogo,
  NextUpdateTimer,
  OffChainContainer,
} from './styles';

const { Text } = Typography;
const { Countdown } = Statistic;

type ServiceStatusInfoDetails = {
  isHealthy?: boolean;
  secondsLeftReceived?: number;
  extra?: ReactNode;
  onTimerFinish?: () => void;
};

const DotSpace = () => <>&nbsp;&nbsp;•&nbsp;&nbsp;</>;

export const ServiceStatusInfo = ({
  isHealthy,
  secondsLeftReceived,
  extra,
  onTimerFinish,
}: ServiceStatusInfoDetails) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number | undefined>(0);

  useEffect(() => {
    if (!isUndefined(secondsLeftReceived)) {
      setSeconds(secondsLeftReceived);
    }
  }, [secondsLeftReceived]);

  const timerCountdown = isUndefined(secondsLeftReceived) ? undefined : (
    <Countdown
      value={Date.now() + Math.round(seconds || 0) * 1000}
      format="ss"
      suffix="s"
      onFinish={async () => {
        window.console.log('timer completed!');
        if (onTimerFinish) onTimerFinish();
      }}
      onChange={(e: number) => setSeconds(parseInt(`${e / 1000}`))}
    />
  );

  /**
   * show operations status (status, timer)
   * even if one of them is defined (hide if both are not defined)
   */
  const showOperationStatus =
    !isUndefined(isHealthy) || !isUndefined(secondsLeftReceived);

  if (isMinimized)
    return (
      <MinimizedStatus
        isOperational={isHealthy}
        onMaximize={() => setIsMinimized(false)}
        timerCountdown={timerCountdown}
      />
    );

  return (
    <ContractsInfoContainer>
      <PoweredByLogo>
        <a href="https://autonolas.network" target="_blank" rel="noreferrer">
          <PoweredBy />
        </a>
      </PoweredByLogo>

      {showOperationStatus && (
        <OffChainContainer>
          <Text className="off-chain-text">Off-chain Service Status</Text>
          <div className="status-timer-row">
            <div>
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
              <DotSpace />
            </div>

            <NextUpdateTimer>
              Next Update:&nbsp;
              {isNil(seconds) ? '--' : timerCountdown}
            </NextUpdateTimer>
          </div>
        </OffChainContainer>
      )}

      {extra || null}

      <Button
        type="link"
        size="small"
        icon={<ShrinkOutlined />}
        onClick={() => setIsMinimized(true)}
        className="minimize-btn"
      >
        Minimize
      </Button>
    </ContractsInfoContainer>
  );
};
