import React, { FC } from 'react';
import { Typography } from 'antd';
import { getTrimmedText } from '../../../functions';

const { Text } = Typography;

const textStyle = { maxWidth: '100%' };

export const EllipsisMiddle: FC = ({
  suffixCount = 5,
  children,
  ...rest
}: {
  suffixCount?: number;
  children: string;
}) => {
  if (typeof children !== 'string') return <>{children}</>;

  if (children.length <= 12) return <Text {...rest}>{children}</Text>;

  /**
   * truncate only if the character exceeds more than 12
   */
  return (
    <Text style={textStyle} {...rest}>
      {getTrimmedText(children, suffixCount)}
    </Text>
  );
};
