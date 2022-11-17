import React from 'react';

type MetaProps = {
  meta: {
    title: string;
    description: string;
    siteUrl: string;
    image: string;
  };
};

export const Meta = ({ meta }: MetaProps) => {
  return (
    <>
      <title>{meta.title}</title>
      <meta name="title" content={meta.title} />
      <meta name="description" content={meta.description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={meta.siteUrl} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={meta.siteUrl} />
      <meta property="twitter:title" content={meta.description} />
      <meta property="twitter:description" content={meta.description} />
      <meta property="twitter:image" content={meta.image} />
    </>
  );
};
