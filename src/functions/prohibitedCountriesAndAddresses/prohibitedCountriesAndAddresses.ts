import { toLower } from 'lodash';
import { PROHIBITED_ADDRESSES } from './prohibitedAddresses';
import { PROHIBITED_COUNTRIES } from './prohibitedCountries';

/**
 * Check if the address is prohibited
 */
export const isAddressProhibited = (address: string | null) => {
  if (!address) return false;

  const addresses = PROHIBITED_ADDRESSES.map((e) => toLower(e));
  return addresses.includes(toLower(address));
};

/**
 * Check if the country is prohibited
 */
export const isCountryProhibited = (country: string | null) => {
  if (!country) return false;

  const prohibitedCountriesCode = Object.values(PROHIBITED_COUNTRIES);
  return prohibitedCountriesCode.includes(country);
};
