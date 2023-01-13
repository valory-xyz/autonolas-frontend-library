import React from 'react';
import { render } from '@testing-library/react';
import { ServiceStatusInfo } from './ServiceStatusInfo';

describe('<ServiceStatusInfo>', () => {
  it('should render empty content', async () => {
    expect.hasAssertions();
    const { container } = render(<ServiceStatusInfo />);
    expect(container).toBeInTheDocument();
  });
});
