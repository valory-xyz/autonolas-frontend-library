import {
  getTrimmedText,
  removeSubdomainFrom,
  areAddressesEqual,
} from './functions';

describe('getTrimmedText()', () => {
  it('should return the correct trimmed text', () => {
    const text = 'random string';
    const trimmedText = getTrimmedText(text, 2);
    expect(trimmedText).toBe('ra...ng');
  });

  it('should return the same text if suffixCount is same as text length', () => {
    const text = 'random';
    const trimmedText = getTrimmedText(text, 5);
    expect(trimmedText).toBe(text);
  });

  it('should return the same text if suffixCount * 2 is greater than text length', () => {
    const text = 'random';
    const trimmedText = getTrimmedText(text, 3);
    expect(trimmedText).toBe(text);
  });
});

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

describe('areAddressesEqual()', () => {
  it('should return true if addresses are equal', () => {
    const add = '0x123';
    const result = areAddressesEqual(add, add);

    expect(result).toBe(true);
  });

  it('should return false if addresses are not equal', () => {
    const add1 = '0x123';
    const add2 = '0x456';
    const result = areAddressesEqual(add1, add2);

    expect(result).toBe(false);
  });

  it('should return true if one address has lower case', () => {
    const add1 = '0x123ABCD';
    const add2 = '0x123abcd';
    const result = areAddressesEqual(add1, add2);

    expect(result).toBe(true);
  });
});
