import { z } from 'zod';
import normalizePeriod from '../../utils/functions/period.ts';

export const MarketHistoryParamsSchema = z.object({
  blockchain: z.string().optional(),
  asset: z.string().optional(),
  symbol: z.string().optional(),
  period: z
    .string()
    .optional()
    .transform((val) => {
      if (val) {
        return normalizePeriod(val);
      }
      return undefined;
    }),
  id: z.coerce.number().optional(),
  from: z.coerce.number().default(0),
  to: z.coerce.number().default(() => Date.now()),
});

export type MarketHistoryParams = z.input<typeof MarketHistoryParamsSchema>;

export const MarketHistoryResponseSchema = z.object({
  data: z.object({
    price_history: z.array(z.array(z.number().nullable())),
    volume_history: z.array(z.array(z.number().nullable())).optional(),
    market_cap_history: z.array(z.array(z.number().nullable())).optional(),
    market_cap_diluted_history: z.array(z.array(z.number().nullable())).optional(),
    name: z.string().optional(),
    symbol: z.string().optional(),
    blockchain: z.string().optional(),
    address: z.string().optional(),
  }),
});

export type MarketHistoryResponse = z.infer<typeof MarketHistoryResponseSchema>;
