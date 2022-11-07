import React from 'react';
import { Description } from './Description';

export default { title: 'Description' };

export const Default = (): JSX.Element => (
  <>
    <Description type={1} title="Hello world!" />
    <Description type={2} title="Hello world!" />
    <Description type={3} title="Hello world!" />
    <Description type={4} title="Hello world!" />
    <Description title="Default type" />
  </>
);
