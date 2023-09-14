import { ThemeConfig } from 'antd';

export const COLOR = {
  PRIMARY: '#7A00F4',
  RED: '#EA3324',
  WHITE: '#FFFFFF',
  ORANGE: ' #FF9400',

  GREEN_1: '#00FC82',
  GREEN_2: '#00F422',
  GREEN_3: '#33FF00',
  GREEN_4: '#52C41A',

  GREY_1: '#C4C4C4',
  GREY_2: '#9A9A9A',
  GREY_3: '#f0f0f0',
  GREY_4: '#C6C6C6',
  BORDER_GREY: '#E3E3E3',

  BLACK: '#000000',
  TABLE_BLACK: '#1B1B1B',
};

export const BREAK_POINT = {
  xxs: '375px',
  xs: '480px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px',
  xxl: '1600px',
};

export const MEDIA_QUERY = {
  mobileS: `@media only screen and (max-width: ${BREAK_POINT.xxs})`,
  mobileM: `@media only screen and (max-width: ${BREAK_POINT.xs})`,
  mobileL: `@media only screen and (max-width: ${BREAK_POINT.sm})`,
  tablet: `@media only screen and (max-width: ${BREAK_POINT.md})`,
  tabletL: `@media only screen and (max-width: ${BREAK_POINT.lg})`,
  laptop: `@media only screen and (max-width: ${BREAK_POINT.xl})`,
  desktop: `@media only screen and (max-width: ${BREAK_POINT.xxl})`,
};

export const BORDER_RADIUS = '5px';

export const BOX_SHADOW = {
  light: '0px 1px 6px rgba(0, 0, 0, 0.15)',
};

export const THEME_CONFIG: ThemeConfig = {
  token: {
    colorPrimary: COLOR.PRIMARY,
    fontSize: 18,
    borderRadius: 5,
    colorBgBase: COLOR.WHITE,
    colorTextPlaceholder: COLOR.GREY_2,
    colorLink: COLOR.PRIMARY,
    controlHeight: 42,
  },
  components: {
    Anchor: {
      linkPaddingBlock: 8,
    },
    Layout: {
      headerBg: COLOR.WHITE,
      bodyBg: COLOR.WHITE,
    },
    Pagination: {
      itemSize: 30,
    },
    Tabs: {
      motionDurationMid: '0.1s',
      motionDurationSlow: '0.1s',
    },
    Table: {
      padding: 12,
      fontWeightStrong: 500,
    },
    Typography: {
      lineHeight: 1,
    },
  },
};
