import { z } from 'zod';

export const MarketBlockchainStatsParamsSchema = z.object({
  blockchain: z.string(),
  factory: z.string().optional(),
});

export type MarketBlockchainStatsParams = z.input<typeof MarketBlockchainStatsParamsSchema>;

export const MarketBlockchainStatsResponseSchema = z.object({
  data: z.object({
    volume_history: z.array(z.array(z.number())),
    volume_change_24h: z.number(),
    volume_change_total: z.number().nullable(),
    liquidity_history: z.array(z.array(z.number())),
    liquidity_change_24h: z.number(),
    liquidity_change_total: z.number().nullable(),
    tokens_history: z.array(z.array(z.number())),
    tokens_change_24h: z.number(),
    tokens_change_total: z.number().nullable(),
  }),
});

export type MarketBlockchainStatsResponse = z.infer<typeof MarketBlockchainStatsResponseSchema>;
