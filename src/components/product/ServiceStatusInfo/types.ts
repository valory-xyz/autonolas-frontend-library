export type AppType = 'contributionkit' | 'mlkit' | 'oraclekit' | 'mintkit';

export type LinksSectionType = {
  appType?: AppType;
  isMidSize?: boolean;
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
    docs?: EachLink[];
  }
>;
