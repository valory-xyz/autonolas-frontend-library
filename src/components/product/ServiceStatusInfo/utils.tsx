import React, { Fragment, ReactNode } from 'react';
import { Typography } from 'antd';
import { LinkType, LinksSectionType, EachLink } from './types';

const { Text } = Typography;

const DOCS_LINK = 'https://docs.autonolas.network/product';
const ML_APY_DOCS = `${DOCS_LINK}/mlkit/`;
const COORDTINATION_KIT_URL = `${DOCS_LINK}/coordinationkit/`;

export const DotSpace = () => <>&nbsp;&nbsp;•&nbsp;&nbsp;</>;

const getList = (contents: EachLink[]) =>
  contents.map(({ text, redirectTo, isInternal = true }, index) => (
    <Fragment key={`link-${redirectTo}`}>
      <Text type="secondary">
        {redirectTo ? (
          <>
            <a
              href={redirectTo}
              target={isInternal ? '_self' : '_blank'}
              rel="noreferrer"
            >
              {text}
            </a>
          </>
        ) : (
          <>{`${text} (link coming soon)`}</>
        )}

        {index !== contents.length - 1 && <>&nbsp;&nbsp;•&nbsp;&nbsp;</>}
      </Text>
    </Fragment>
  ));

const LINKS: LinkType = {
  // {
  //   'el-collectooorr': {
  //     kitName: 'El Collectooorr',
  //     largeBuiltWith: [
  //       { text: 'What is this?', whatIsThis: ML_APY_DOCS },
  //       { text: 'Run the Code', link: `${ML_APY_DOCS}#demo` },
  //       { text: 'Build your own', link: `${ML_APY_DOCS}#build` },
  //     ],
  //     midBuiltWith: [],
  //   },
  // },
  // {
  //   protocol: {
  //     largeBuiltWith: [],
  //     midBuiltWith: [],
  //   },
  // },
  // {oracle: {
  //   largeBuiltWith: [
  //     { text: 'What is this?', whatIsThis: ML_APY_DOCS },
  //     { text: 'Run the Code', link: `${ML_APY_DOCS}#demo` },
  //     { text: 'Build your own', link: `${ML_APY_DOCS}#build` },
  //   ],
  //   midBuiltWith: [],
  // }},

  contribution: {
    kit: {
      link: COORDTINATION_KIT_URL,
      name: 'CONTRIBUTIONKIT',
    },
    largeBuiltWith: [
      {
        text: 'Run demo code',
        redirectTo: `${COORDTINATION_KIT_URL}#demo`,
      },
      {
        text: 'Get help building',
        redirectTo: 'https://propel.valory.xyz',
        isInternal: false,
      },
    ],
    midBuiltWith: [
      {
        text: 'Run demo code',
        redirectTo: `${COORDTINATION_KIT_URL}#demo`,
      },
      {
        text: 'Get help',
        redirectTo: 'https://propel.valory.xyz',
        isInternal: false,
      },
    ],
    docs: [
      {
        text: 'Live service',
        redirectTo: 'https://protocol.autonolas.network/services',
      },
      {
        text: 'Service code',
        redirectTo: 'https://github.com/valory-xyz/contribution-service',
        isInternal: false,
      },
      {
        text: 'Contracts',
        redirectTo:
          Number((window as any)?.MODAL_PROVIDER?.chainId || 1) === 5
            ? 'https://goerli.etherscan.io/address/0x7C3B976434faE9986050B26089649D9f63314BD8'
            : 'https://etherscan.io/address/0x02c26437b292d86c5f4f21bbcce0771948274f84',
        isInternal: false,
      },
    ],
  },
};

export const LinksSection = ({
  appType,
  isMidSize,
  // chainId,
}: LinksSectionType) => {
  // const LINKS: LinkType = {
  //   ...constantLinks,
  //   ...getContributionList(),
  // };

  // if no appType, return null
  if (!appType) return null;

  // for mid-size
  if (isMidSize) return <>{LINKS[appType].midBuiltWith}</>;

  return (
    <>
      {[
        {
          id: 'code',
          list: LINKS[appType].largeBuiltWith,
          name: (
            <>
              BUILT WITH&nbsp;
              <a href={LINKS[appType].kit.link} rel="noreferrer">
                {LINKS[appType].kit.name || ''}
              </a>
            </>
          ),
        },
        { id: 'docs', name: 'CODE', list: LINKS[appType].docs },
      ].map((e) => (
        <div key={e.id}>
          <div>
            <Text className="status-sub-header">{e.name}</Text>
          </div>

          <div className="status-sub-content">{getList(e.list)}</div>
        </div>
      ))}
    </>
  );
};
