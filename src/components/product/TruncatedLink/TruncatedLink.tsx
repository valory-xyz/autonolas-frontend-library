import React from 'react';
import { Tooltip } from 'antd';

type AddressLink = {
  text: string;
  isTransaction?: boolean;
};

const TruncatedEthereumLink = ({ text, isTransaction }: AddressLink) => {
  const truncatedText = text.slice(0, 6) + '...' + text.slice(-4);

  const etherscanLink = `https://etherscan.io/${
    isTransaction ? 'tx' : 'address'
  }/${text}`;

  return (
    <Tooltip title={text}>
      <a href={etherscanLink} target="_blank" rel="noopener noreferrer">
        {truncatedText}
      </a>
    </Tooltip>
  );
};

export default TruncatedEthereumLink;
