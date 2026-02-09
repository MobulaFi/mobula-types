import { z } from 'zod';

const BlockQueryParams = z.object({
  address: z.string(),
  blockchain: z.string(),
});

export type BlockQueryParams = z.infer<typeof BlockQueryParams>;

export const BlockQueryParamsSchema = BlockQueryParams;
