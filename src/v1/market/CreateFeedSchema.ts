import { z } from 'zod';

export const createFeedQuery = z.object({
  quoteId: z.coerce.number().optional(),
  assetId: z.coerce.number(),
});
