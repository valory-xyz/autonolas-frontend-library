export type AppType = 'contribution';
// export type AppType = 'el-collectooorr' | 'protocol' | 'contribution';

export type LinksSectionType = {
  appType?: AppType;
  isMidSize?: boolean;
  chainId?: 1 | 5 | 31337;
};

export type EachLink = {
  text: string;
  redirectTo: string;
  isInternal?: boolean;
};

export type LinkType = Record<
  AppType,
  {
    kit: {
      link: string;
      name: string;
    };
    largeBuiltWith: EachLink[];
    midBuiltWith: EachLink[];
    docs: EachLink[];
  }
>;
