import React, { ReactNode, MouseEvent } from 'react';
import { Alert, Button } from 'antd';

const btnLinkStyle = {
  padding: 0,
  margin: 0,
  height: 'auto',
  lineHeight: 'normal',
};

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
  const isInternalLink = href && href.startsWith('/');

  return (
    <Alert
      type="info"
      showIcon
      message={
        message || (
          <div>
            By accessing this app you agree to the&nbsp;
            <Button
              type="link"
              style={btnLinkStyle}
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
              Disclaimer
            </Button>
          </div>
        )
      }
    />
  );
};
