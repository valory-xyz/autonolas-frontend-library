import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import styled from 'styled-components';
import { Typography } from 'antd';

const { Title } = Typography;

type SimpleMarkdownBlockProps = {
  title?: string;
  content: string;
};

const MardownContainer = styled.div``;

export const SimpleMarkdown = ({
  title,
  content,
}: SimpleMarkdownBlockProps) => (
  <MardownContainer>
    {title && <Title style={{ textAlign: 'center' }}>{title}</Title>}
    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
  </MardownContainer>
);
