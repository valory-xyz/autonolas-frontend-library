import React from 'react';
import { Typography, Card, Table } from 'antd';
import { AddressLink } from './AddressLink';
import type { ColumnsType } from 'antd/es/table';
import { StarOutlined } from '@ant-design/icons';
import { notifySuccess } from '../../../functions';

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
      canCopy: true,
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

interface DataType {
  id: string;
  owner: string;
  hash: string;
  mech: string;
  dependency: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 50,
  },
  {
    title: 'Etherscan',
    dataIndex: 'owner',
    key: 'owner',
    width: 140,
    render: (text) => (
      <AddressLink text={text} suffixCount={6} canCopy textMinWidth={160} />
    ),
  },
  {
    title: 'IPFS link',
    dataIndex: 'hash',
    key: 'hash',
    width: 160,
    render: (text) => (
      <AddressLink
        text={text}
        suffixCount={15}
        isIpfsLink
        canCopy
        textMinWidth={350}
      />
    ),
  },
  {
    title: 'Custom onClick',
    dataIndex: 'mech',
    width: 140,
    key: 'mech',
    render: (text, row) => (
      <AddressLink
        text={text}
        suffixCount={12}
        textMinWidth={350}
        extraRightContent={<StarOutlined />}
        onClick={(e) => {
          notifySuccess(`You clicked on ${e}`);
        }}
      />
    ),
  },
];

const dataSource = [
  {
    id: '1',
    owner: '0xEC58BEDB8DcFD77ca2BAf8B2D8D31204DD3D12ce',
    hash: '0x714ef7dafa358c7152f6703dd764a1df40d369dcf53275dd2543b0fdbf207298',
    mech: '0x3504fb5053ec12f748017248a395b4ed31739705',
    dependency: 0,
  },
  {
    id: '2',
    owner: '0x3F7276ED933F4cAA2bf5B8ca44688E4A1bbD2691',
    hash: '0x2e855f5bb18361913bd082dabd9a16a72a65fd98ae230c5462ace360e9466aa0',
    mech: '0x80f8cba027c830e06316e8d1fd9eb770772e3172',
    dependency: 0,
  },
  {
    id: '3',
    owner: '0x5e1D1eb61E1164D5a50b28C575dA73A29595dFf7',
    hash: '0xe4686b4d286200a693e22b26d6e207eafc1b9d26bfee56ed9f054a1a5a7a77c9',
    mech: '0xff82123dfb52ab75c417195c5fdb87630145ae81',
    dependency: 0,
  },
  {
    id: '4',
    owner: '0x7B2e78D4dFaABA045A167a70dA285E30E8FcA196',
    hash: '0x1d1c57866258349e5ddbdfb94f223cbf7b63f3389ebcd1b9cf7c924f2768667d',
    mech: '0x9e65d59eca2157eb87f95e41baaea57d647b0260',
    dependency: 0,
  },
  {
    id: '5',
    owner: '0xA97a53640d072642B2905da0Be798Cdd03ecEa67',
    hash: '0x11498c65afd0172b9129263f774c2fc19d101116d77c5dc57dbfb1a0fe927883',
    mech: '0x4e87bcea7108feae8d28c6117f30d552bae683f3',
    dependency: 0,
  },
];

export const LinkTable = (): JSX.Element => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: scrollX || 1200 }}
      rowKey={(record) => `row-${record.id}`}
    />
  );
};
