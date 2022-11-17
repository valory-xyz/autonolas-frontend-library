import React from 'react';
import { Button } from './Button';

export default { title: 'Button' };

export const Default = (): JSX.Element => (
  <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '2rem' }}>
    <Button hasArrowSuffix type="purple" title="Button with Arrow" />
    <Button title="Button wth className 'mini'" type="black" className="mini" />
    <Button title="Default button" />
  </div>
);
