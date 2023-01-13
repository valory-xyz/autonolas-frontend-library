import React, { useState, useEffect, ReactNode } from 'react';
import { Typography, Statistic, Button, Grid } from 'antd';
import { ShrinkOutlined } from '@ant-design/icons';
import { isUndefined, isNil } from 'lodash';
import { PoweredBy } from './helpers/PoweredBySvg';
import { MinimizedStatus } from './helpers/MinimizedStatus';
import {
  ContractsInfoContainer,
  PoweredByLogo,
  NextUpdateTimer,
  OffChainContainer,
  MobileOffChainContainer,
} from './styles';

const { Text } = Typography;
const { Countdown } = Statistic;
const { useBreakpoint } = Grid;

type ServiceStatusInfoDetails = {
  isHealthy?: boolean;
  secondsLeftReceived?: number;
  extra?: ReactNode;
  /**
   * extra content to be displayed on mobile size.
   * if not defined, will use the same content as `extra`
   */
  extraMd?: ReactNode;
  onTimerFinish?: () => void;
};

const DotSpace = () => <>&nbsp;&nbsp;•&nbsp;&nbsp;</>;

export const ServiceStatusInfo = ({
  isHealthy,
  secondsLeftReceived,
  extra,
  extraMd,
  onTimerFinish,
}: ServiceStatusInfoDetails) => {
  const screens = useBreakpoint();
  const isMobile = (screens.xs || screens.sm) && !screens.md;
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

  const actualStatus = isHealthy ? (
    <>
      <span className="dot dot-online" />
      &nbsp;Operational
    </>
  ) : (
    <>
      <span className="dot dot-offline" />
      &nbsp;Disrupted
    </>
  );

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

      {/* status (green/orange dot) & timers */}
      {isMobile ? (
        <MobileOffChainContainer>
          {!isUndefined(isHealthy) && <div>{actualStatus}</div>}
          <div>{extraMd || extra}</div>
        </MobileOffChainContainer>
      ) : (
        <>
          {showOperationStatus && (
            <OffChainContainer>
              <Text className="off-chain-text">Off-chain Service Status</Text>
              <div className="status-timer-row">
                {!isUndefined(isHealthy) && (
                  <div>
                    {actualStatus}
                    <DotSpace />
                  </div>
                )}

                {!isUndefined(secondsLeftReceived) && (
                  <NextUpdateTimer>
                    Next Update:&nbsp;
                    {isNil(seconds) ? '--' : timerCountdown}
                  </NextUpdateTimer>
                )}
              </div>
            </OffChainContainer>
          )}
          {extra}
        </>
      )}

      <Button
        type="link"
        size="small"
        icon={<ShrinkOutlined />}
        onClick={() => setIsMinimized(true)}
        className="minimize-btn"
      >
        {isMobile ? '' : 'Minimize'}
      </Button>
    </ContractsInfoContainer>
  );
};
