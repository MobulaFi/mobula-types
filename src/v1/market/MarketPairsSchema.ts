import { z } from 'zod';
import { EnrichedPoolDataSchema } from '../../utils/schemas/EnrichedMarketData.ts';

export const MarketPairsParamsSchema = z.object({
  // Common pagination parameters
  limit: z.coerce.number().max(25).default(25),
  offset: z.string().default('0'),
  // Asset identification fields (mutually exclusive in behavior)
  id: z.coerce.number().optional(),
  asset: z.string().optional(),
  symbol: z.string().optional(),
  blockchain: z.string().optional(),
  tokens: z.string().optional(),
  blockchains: z.string().optional(),
  excludeBonded: z.coerce.boolean().optional().default(false),
  poolType: z.string().optional(),
});

export type MarketPairsParams = z.input<typeof MarketPairsParamsSchema>;
export type MarketPairInferParams = z.infer<typeof MarketPairsParamsSchema>;

export const MarketPairsResponseSchema = z.object({
  data: z.object({
    pairs: z.array(EnrichedPoolDataSchema),
    total_count: z.number(),
  }),
});

export type MarketPairsResponse = z.infer<typeof MarketPairsResponseSchema>;
