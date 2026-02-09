import { z } from 'zod';

export const stringOrArray = z.union([z.string(), z.array(z.string())]).transform((value) => {
  if (typeof value === 'string') {
    return value.split(',').map((item) => item.trim()); // Transform a string into an array, removing spaces
  }
  return value; // Return the array as is
});
