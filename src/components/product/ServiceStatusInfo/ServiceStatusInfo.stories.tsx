import React from 'react';
import { ServiceStatusInfo } from './ServiceStatusInfo';

export default {
  title: 'Service Status Info',
};

export const Default = () => (
  <ServiceStatusInfo
    isHealthy={true}
    secondsLeftReceived={100}
    // rightContent={<>Right Side Content</>}
  />
);

// {
//   id: 'contract-code',
//   text: 'Contracts',
//   redirectTo: isGoerli(chainId)
//     ? 'https://goerli.etherscan.io/address/0x7C3B976434faE9986050B26089649D9f63314BD8'
//     : 'https://etherscan.io/address/0x02c26437b292d86c5f4f21bbcce0771948274f84',
// },
// {
//   id: 'service-code',
//   text: 'Service code',
//   redirectTo: 'https://github.com/valory-xyz/contribution-service',
// },
// {
//   id: '2',
//   text: 'Learn more',
//   redirectTo: `/docs#${DOCS_SECTIONS['how-it-works']}`,
//   isInternal: true,
// },
// {
//   id: '3',
//   text: 'Build your own',
//   // redirectTo: 'https://www.autonolas.network/coordinationkit',
//   redirectTo: null,
// },
