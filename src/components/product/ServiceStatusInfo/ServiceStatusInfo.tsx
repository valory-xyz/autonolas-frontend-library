import React, { useState, useEffect, ReactNode } from 'react';
import { Typography, Statistic, Button, Grid } from 'antd';
import { ShrinkOutlined } from '@ant-design/icons';
import { isUndefined, isNil } from 'lodash';
import { PoweredBy, PoweredByForSmallDevice } from './helpers/PoweredBySvg';
import { MinimizedStatus } from './helpers/MinimizedStatus';
import { DotSpace, LinksSection } from './utils';
import { AppType } from './types';
import {
  ContractsInfoContainer,
  Badge,
  NextUpdateTimer,
  OffChainContainer,
  MobileOffChainContainer,
  ExtraContent,
  DisclaimerLink,
} from './styles';

const { Text } = Typography;
const { Countdown } = Statistic;
const { useBreakpoint } = Grid;

type ServiceStatusInfoDetails = {
  isHealthy?: boolean;
  secondsLeftReceived?: number;
  appType?: AppType;
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
  // show the disclaimer
  showDisclaimer?: boolean;
};

const timerStyle = { minWidth: '36px' };
const Dash = () => (
  <span style={{ display: 'inline-block', ...timerStyle }}>--</span>
);

export const ServiceStatusInfo = ({
  isHealthy,
  secondsLeftReceived,
  appType,
  extra,
  extraMd,
  onTimerFinish,
  onMinimizeToggle,
  showDisclaimer,
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
    <ContractsInfoContainer
      className="service-status-maximized"
      canMinimize={canMinimize}
    >
      <Badge canMinimize={canMinimize}>
        <a href="https://autonolas.network" target="_blank" rel="noreferrer">
          {canMinimize ? <PoweredByForSmallDevice /> : <PoweredBy />}
        </a>
      </Badge>

      {/* status (green/orange dot) & timers */}
      {canMinimize ? (
        <MobileOffChainContainer>
          <div>
            {!isUndefined(isHealthy) && <div>{actualStatus}</div>}
            <LinksSection appType={appType} isMidSize={true} />
          </div>
          <div className="extra-md-view">
            <div>{extraMd || null}</div>
          </div>
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
          <ExtraContent>
            <LinksSection appType={appType} isMidSize={false} />
            {extra || null}
          </ExtraContent>
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

      {showDisclaimer && (
        <DisclaimerLink href="/disclaimer" rel="noreferrer">
          Disclaimer
        </DisclaimerLink>
      )}
    </ContractsInfoContainer>
  );
};
