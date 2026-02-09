import { z } from 'zod';

const DateQuery = z.union([z.coerce.number().int().optional(), z.coerce.date().optional()]).transform((val) => {
  if (typeof val === 'undefined') {
    return val;
  }

  if (typeof val === 'number') {
    return new Date(val);
  }

  if (val instanceof Date) {
    return val;
  }

  throw new Error('Invalid date');
});
export type DateQuery = z.infer<typeof DateQuery>;
export default DateQuery;
