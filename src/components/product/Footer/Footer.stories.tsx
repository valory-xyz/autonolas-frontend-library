import React from 'react';
import { Footer } from './index.tsx';

export default {
  title: 'Footer',
};

export const Default = (): JSX.Element => (
  <Footer leftContent={<>Left Side Content</>} rightContent={<>Right Side Content</>}></Footer>
);
