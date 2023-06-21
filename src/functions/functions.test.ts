import { removeSubdomainFrom } from './functions';

describe('removeSubdomainFrom', () => {
  it.each([
    {
      input: 'https://sub.domain.com',
      output: 'https://domain.com',
    },
    {
      input: 'https://protocol.autonolas.network',
      output: 'https://autonolas.network',
    },
    {
      input: 'http://protocol.autonolas.network',
      output: 'http://autonolas.network',
    },
    {
      input: 'https://autonolas.network',
      output: 'https://autonolas.network',
    },
    {
      input: 'randomString',
      output: 'randomString',
    },
  ])(
    'should return the correct url for chainId $chainId',
    async ({ input, output }) => {
      const trimmedUrl = removeSubdomainFrom(input);
      expect(trimmedUrl).toBe(output);
    },
  );
});
