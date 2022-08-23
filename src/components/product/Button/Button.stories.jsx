import React from 'react';

import { Button } from './index';

export default {
  title: 'Button',
};

export const Default = () => (
  <>
    <Button>Default 1</Button>
    <div style={{ height: 20 }} />
    <Button type="primary">Default 2</Button>
  </>
);

export const Disabled = () => <Button type="disabled">Disabled</Button>;

export const Danger = () => <Button type="danger">Danger</Button>;
