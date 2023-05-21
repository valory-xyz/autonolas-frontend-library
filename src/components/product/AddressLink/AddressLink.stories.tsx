import React from 'react';
import { Typography } from 'antd';
import { AddressLink } from './AddressLink';

const { Text } = Typography;

export default {
  title: 'AddressLink',
};

const ADDRESS = '0x02c26437b292d86c5f4f21bbcce0771948274f84';
const TRANSACTION =
  '0xed2ab9a875e5e2fbe72ad124d36c33b3ef508bed04abacef6ae9eec9c752f171';
const IPFS =
  'f01701220e0ed9d9a7e4ec046989c1c91f8fe367cf63681e75f75d6d0606105043048f5f9';

export const Default = (): JSX.Element => {
  const list = [
    {
      textToShow: 'Address',
      text: ADDRESS,
    },
    {
      textToShow: 'Transaction',
      text: TRANSACTION,
    },
    {
      textToShow: 'IPFS',
      text: IPFS,
      isIpfsLink: true,
    }
  ];

  return (
    <div
      style={{
        border: '1px solid black',
        borderRadius: '8px',
        width: 400,
        margin: '0 auto',
        padding: '8px 16px',
      }}
    >
      {list.map(({ textToShow, ...rest }, index) => (
        <div key={`address-link-${index}`}>
          <Text>{textToShow}</Text>:&nbsp;
          <AddressLink {...rest} />
        </div>
      ))}
    </div>
  );
};
