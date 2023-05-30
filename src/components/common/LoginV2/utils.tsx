import React, { FC, ReactElement } from 'react';
import { WarningOutlined, CaretDownOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { SUPPORTED_TEST_NETWORKS } from '../../../utils';

/**
 * helpers
 */

export const unsupportedText = (
  <>
    <WarningOutlined />
    Unsupported network
  </>
);

/**
 * COMPONENTS
 */

type UnsupportedNetworksProps = {
  isStaging: boolean;
};

export const UnsupportedNetworks: FC<UnsupportedNetworksProps> = ({
  isStaging,
}: UnsupportedNetworksProps): ReactElement => {
  return (
    <div className="unsupported-network">
      {unsupportedText}
      <Popover
        getPopupContainer={(triggerNode) =>
          triggerNode.parentNode as HTMLElement
        }
        content={
          <div>
            {isStaging ? (
              <>
                {SUPPORTED_TEST_NETWORKS.map((e) => (
                  <div key={`supported-chain-${e.id}`}>{e.name}</div>
                ))}
              </>
            ) : (
              <div>Ethereum</div>
            )}
          </div>
        }
        title="Switch to a supported network:"
      >
        <CaretDownOutlined />
      </Popover>
    </div>
  );
};
