import { z } from 'zod';
import normalizePeriod from '../../utils/functions/period.ts';
import DateQuery from '../../utils/schemas/DateQuery.ts';

export const MarketHistoryPairParamsSchema = z.object({
  blockchain: z.string().optional(),
  asset: z.string().optional(),
  symbol: z.string().optional(),
  address: z.string().optional(),
  baseToken: z.union([z.string(), z.array(z.string())]).optional(),
  from: DateQuery.transform((val) => val ?? 0),
  to: DateQuery.transform((val) => val ?? new Date()),
  period: z
    .string()
    .optional()
    .transform((val) => {
      if (val) {
        return normalizePeriod(val);
      }
      return '5m';
    }),
  amount: z.coerce.number().optional(),
  usd: z
    .union([z.boolean(), z.string()])
    .optional()
    .default(true)
    .transform((val) => {
      if (typeof val === 'boolean') return val;
      if (val === 'false' || val === '0') return false;
      return true;
    }),
  mode: z
    .enum(['asset', 'pair', 'pool'])
    .optional()
    .default('pair')
    .transform((val) => (val === 'pool' ? 'pair' : val) as 'pair' | 'asset'),
});

export type MarketHistoryPairParams = z.input<typeof MarketHistoryPairParamsSchema>;

export type MarketHistoryPairInferType = z.infer<typeof MarketHistoryPairParamsSchema>;

export const MarketHistoryPairResponseSchema = z.object({
  data: z.array(
    z.object({
      volume: z.number(),
      open: z.number(),
      high: z.number(),
      low: z.number(),
      close: z.number(),
      time: z.number(),
    }),
  ),
});

export type MarketHistoryPairResponse = z.infer<typeof MarketHistoryPairResponseSchema>;
