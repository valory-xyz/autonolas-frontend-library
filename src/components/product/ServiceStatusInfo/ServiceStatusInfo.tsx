import React, { useState, useEffect, ReactNode } from 'react';
import { Typography, Statistic, Button, Grid } from 'antd';
import { ShrinkOutlined } from '@ant-design/icons';
import { isUndefined, isNil } from 'lodash';
import { PoweredBy } from './helpers/PoweredBySvg';
import { MinimizedStatus } from './helpers/MinimizedStatus';
import {
  ContractsInfoContainer,
  Badge,
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
  onTimerFinish?: ({
    setSeconds,
  }: {
    setSeconds: (value: number | undefined) => void;
  }) => void;
  onMinimizeToggle?: (isMinimized: boolean) => void;
};

const DotSpace = () => <>&nbsp;&nbsp;•&nbsp;&nbsp;</>;

const timerStyle = { minWidth: '36px' };
const Dash = () => (
  <span style={{ display: 'inline-block', ...timerStyle }}>--</span>
);

export const ServiceStatusInfo = ({
  isHealthy,
  secondsLeftReceived,
  extra,
  extraMd,
  onTimerFinish,
  onMinimizeToggle,
}: ServiceStatusInfoDetails) => {
  const screens = useBreakpoint();
  const canMinimize = !screens.xl;
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
      format="s"
      suffix="s"
      onChange={(e: number) => setSeconds(parseInt(`${e / 1000}`, 10))}
      onFinish={async () => {
        window.console.log('timer completed!');

        setSeconds(0); // reseting timer to 0 as it is finished

        if (onTimerFinish) onTimerFinish({ setSeconds });
      }}
      style={timerStyle}
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
        onMaximize={() => {
          setIsMinimized(false);
          if (onMinimizeToggle) onMinimizeToggle(false);
        }}
        timerCountdown={timerCountdown}
      />
    );

  return (
    <ContractsInfoContainer className="service-status-maximized">
      <Badge>
        <a href="https://autonolas.network" target="_blank" rel="noreferrer">
          <PoweredBy />
        </a>
      </Badge>

      {/* status (green/orange dot) & timers */}
      {canMinimize ? (
        <MobileOffChainContainer>
          {!isUndefined(isHealthy) && <div>{actualStatus}</div>}
          <div>{extraMd || extra}</div>
        </MobileOffChainContainer>
      ) : (
        <>
          {showOperationStatus && (
            <OffChainContainer>
              <Text className="status-sub-header">
                Off-chain Service Status
              </Text>
              <div className="status-sub-content">
                {!isUndefined(isHealthy) && (
                  <div>
                    {actualStatus}
                    <DotSpace />
                  </div>
                )}

                {!isUndefined(secondsLeftReceived) && (
                  <NextUpdateTimer>
                    Next update:&nbsp;
                    {isNil(seconds) ? <Dash /> : timerCountdown}
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
        icon={<ShrinkOutlined />}
        onClick={() => {
          setIsMinimized(true);
          if (onMinimizeToggle) onMinimizeToggle(true);
        }}
        className="minimize-btn"
      >
        {canMinimize ? '' : 'Minimize'}
      </Button>
    </ContractsInfoContainer>
  );
};
