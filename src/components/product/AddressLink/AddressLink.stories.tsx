import React from 'react';
import { Typography, Card } from 'antd';
import { AddressLink } from './AddressLink';

const { Text, Title } = Typography;

export default { title: 'AddressLink' };

const ADDRESS = '0x02c26437b292d86c5f4f21bbcce0771948274f84';
const TRANSACTION =
  '0x58945534a33e768f3806847a4cd32dc87565590053806b3686cb8beb6c91e0ce';
const IPFS =
  '0x30a9a0e6f9dbb2cd0dd40151644299137c40a6a78042bb492e25c6a7336b407f';
const IPFS_1 =
  'f01701220e0ed9d9a7e4ec046989c1c91f8fe367cf63681e75f75d6d0606105043048f5f9';

export const Default = (): JSX.Element => {
  const list = [
    { textToShow: 'Address', text: ADDRESS },
    { textToShow: 'Transaction', text: TRANSACTION },
    {
      textToShow: 'IPFS',
      text: IPFS,
      isIpfsLink: true,
    },
    {
      textToShow: 'IPFS 1',
      text: IPFS_1,
      isIpfsLink: true,
    },
  ];

  return (
    <Card style={{ width: 400, margin: '0 auto' }}>
      <Title level={5}>Change the chain to see different explorer URL</Title>
      {list.map(({ textToShow, ...rest }, index) => (
        <div key={`address-link-${index}`}>
          <Text>{textToShow}</Text>:&nbsp;
          <AddressLink {...rest} />
        </div>
      ))}
    </Card>
  );
};
