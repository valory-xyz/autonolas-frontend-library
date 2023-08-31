import { removeSubdomainFrom } from './functions';

describe('removeSubdomainFrom()', () => {
  it.each([
    { input: 'https://sub.domain.com', output: 'https://domain.com' },
    { input: 'https://registry.olas.network', output: 'https://olas.network' },
    { input: 'http://registry.olas.network', output: 'http://olas.network' },
    { input: 'https://autonolas.network', output: 'https://autonolas.network' },
    { input: 'randomString', output: 'randomString' },
  ])(
    'should return the correct url for input $input',
    async ({ input, output }) => {
      const trimmedUrl = removeSubdomainFrom(input);
      expect(trimmedUrl).toBe(output);
    },
  );
});
