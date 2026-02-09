import { z } from 'zod';
import { EnrichedPoolDataSchema } from '../../utils/schemas/EnrichedMarketData.ts';

export const MarketPairParamsSchema = z.object({
  blockchain: z.string().optional(),
  asset: z.string().optional(),
  symbol: z.string().optional(),
  address: z.string().optional(),
  baseToken: z.string().optional(),
  stats: z
    .union([z.boolean(), z.string()])
    .default(false)
    .transform((val) => (typeof val === 'string' ? val === 'true' : val)),
  force: z.coerce.boolean().optional().default(false),
});

export type MarketPairParams = z.input<typeof MarketPairParamsSchema>;

export const MarketPairResponseSchema = z.object({
  data: EnrichedPoolDataSchema,
});

export type MarketPairResponse = z.infer<typeof MarketPairResponseSchema>;
