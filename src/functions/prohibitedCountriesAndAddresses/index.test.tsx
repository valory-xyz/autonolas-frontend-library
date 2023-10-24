import { isAddressProhibited, isCountryProhibited } from './index';

describe('isAddressProhibited', () => {
  it.each([
    { address: '0x01e2919679362dFBC9ee1644Ba9C6da6D6245BB1', output: true },
    { address: '0X1E34A77868E19A6647B1F2F47B51ED72DEDE95DD', output: true },
    { address: '0XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', output: false },
    { address: '', output: false },
    { address: null, output: false },
  ])(
    'should return $output for the address $chainId',
    async ({ address, output }) => {
      expect(isAddressProhibited(address)).toBe(output);
    },
  );
});

describe('isCountryProhibited', () => {
  it.each([
    { country: 'US', output: true },
    { country: 'KP', output: true },
    { country: 'IN', output: false },
    { country: '', output: false },
    { country: null, output: false },
  ])(
    'should return $output for the country $country',
    async ({ country, output }) => {
      expect(isCountryProhibited(country)).toBe(output);
    },
  );
});
