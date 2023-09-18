import dayjs from 'dayjs';
import { isNil } from 'lodash';

import { NA } from '../utils/constants';

/**
 * Converts a number to a comma separated format
 */
export const getCommaSeparatedNumber = (
  x: number | bigint | null,
  maxFraction = 2,
) => {
  if (isNil(x) || Number(x) === 0) return '0.0';

  return new Intl.NumberFormat('en', {
    maximumFractionDigits: maxFraction,
  }).format(x);
};

/**
 * Get formatted date from milliseconds
 * example, 1678320000000 => Mar 09 '23
 */
export const getFormattedDate = (ms?: string | number | null) => {
  if (!ms) return NA;
  return dayjs(ms).format("MMM DD 'YY");
};

/**
 * Get formatted date from milliseconds including time
 * example, 1678320000000 => Mar 09 '2023 16:00
 */
export const getFullFormattedDate = (ms?: string | number | null) => {
  if (!ms) return NA;
  return dayjs(ms).format("MMM DD 'YYYY, HH:mm");
};
