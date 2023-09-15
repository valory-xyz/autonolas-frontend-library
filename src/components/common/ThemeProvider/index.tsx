import React, { ReactNode } from 'react';
import { ConfigProvider } from 'antd';
import { THEME_CONFIG } from '../../../utils';

export const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  return <ConfigProvider theme={THEME_CONFIG}>{children}</ConfigProvider>;
};
