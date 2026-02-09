import { z } from 'zod';

const BaseFilter = z.object({
  eq: z.tuple([z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])]).optional(),
  neq: z.tuple([z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()])]).optional(),
  lt: z.tuple([z.string(), z.coerce.number()]).optional(),
  lte: z.tuple([z.string(), z.coerce.number()]).optional(),
  gt: z.tuple([z.string(), z.coerce.number()]).optional(),
  gte: z.tuple([z.string(), z.coerce.number()]).optional(),
  in: z
    .tuple([
      z.string(),
      z.union([
        z.string(),
        z.number(),
        z.boolean(),
        z.null(),
        z.array(z.union([z.string(), z.number(), z.boolean(), z.null()])),
      ]),
    ])
    .optional(),
});

type BaseFilter = z.infer<typeof BaseFilter>;
export type Filter = BaseFilter & ({ and?: Filter[] } | { or?: Filter[] });

const Filter: z.ZodType<Filter> = BaseFilter.and(
  z.union([
    BaseFilter.extend({ and: z.undefined(), or: z.undefined() }),
    BaseFilter.extend({ and: z.array(z.lazy(() => Filter)), or: z.undefined() }),
    BaseFilter.extend({ and: z.undefined(), or: z.array(z.lazy(() => Filter)) }),
  ]),
);

export function countOperations(filter: Filter | undefined): number {
  if (!filter) return 0;

  let count = 0;

  for (const key of ['eq', 'neq', 'lt', 'lte', 'gt', 'gte', 'in'] as const) {
    if (filter[key]) count += 1;
  }

  if ('and' in filter && Array.isArray(filter.and)) {
    for (const child of filter.and) {
      count += countOperations(child);
    }
  }

  if ('or' in filter && Array.isArray(filter.or)) {
    for (const child of filter.or) {
      count += countOperations(child);
    }
  }

  return count;
}

const FilterWithLimit = Filter.superRefine((val, ctx) => {
  const total = countOperations(val);
  const max = 1000;
  if (total > max) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Your filter contains ${total} leaf operations, exceeding the maximum of ${max}. Only leaf conditions like "eq", "neq", "lt", "lte", "gt", "gte", "in" are counted; logical operators ("and", "or") are ignored.`,
    });
  }
});

export default FilterWithLimit;
