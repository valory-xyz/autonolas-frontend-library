import { toLower } from 'lodash';
import prohibitedAddresses from './prohibited-addresses.json';
import prohibitedCountries from './prohibited-countries.json';

/**
 * Check if the address is prohibited
 */
export const isAddressProhibited = (address: string | null) => {
  if (!address) return false;

  const addresses = prohibitedAddresses.map((e) => toLower(e));
  return addresses.includes(toLower(address));
};

/**
 * Check if the country is prohibited
 */
export const isCountryProhibited = (country: string | null) => {
  if (!country) return false;

  const prohibitedCountriesCode = Object.values(prohibitedCountries);
  return prohibitedCountriesCode.includes(country);
};
