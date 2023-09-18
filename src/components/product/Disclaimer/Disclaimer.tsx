import React, { ReactNode, MouseEvent } from 'react';
import { Alert, Button } from 'antd';
import styled from 'styled-components';

import { CustomThemeProvider } from '../../common/ThemeProvider';

const DisclaimerAlert = styled(Alert)`
  .ant-btn-link {
    padding: 0;
    margin: 0;
    height: auto;
    line-height: normal;
  }
`;

export const Disclaimer = ({
  message,
  href = '/disclaimer',
  onDisclaimerClick,
}: {
  message?: ReactNode;
  href?: string;
  onDisclaimerClick?: (e: MouseEvent) => void;
}) => {
  // if the href is internal, we don't want to open it in a new tab
  const isInternalLink = href ? href.startsWith('/') : false;

  const defaultMessage = (
    <div>
      By accessing this app you agree to the&nbsp;
      <Button
        type="link"
        // style={btnLinkStyle}
        href={href}
        target={isInternalLink ? undefined : '_blank'}
        onClick={(e) => {
          if (onDisclaimerClick) {
            // prevent default behavior of the link and call the callback
            e.preventDefault();
            onDisclaimerClick(e);
          }
        }}
      >
        disclaimer
      </Button>
    </div>
  );

  return (
    <CustomThemeProvider>
      <DisclaimerAlert
        type="warning"
        showIcon
        closable
        message={message || defaultMessage}
      />
    </CustomThemeProvider>
  );
};
