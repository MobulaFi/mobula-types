import { z } from 'zod';

export const MetadataCategoriesResponseSchema = z.array(
  z.object({
    name: z.string(),
    market_cap: z.number(),
    market_cap_change_24h: z.number(),
    market_cap_change_7d: z.number(),
  }),
);
export type MetadataCategoriesResponse = z.infer<typeof MetadataCategoriesResponseSchema>;
