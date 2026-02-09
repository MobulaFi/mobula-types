import { z } from 'zod';

export const MarketNftParamsSchema = z.object({
  asset: z.string(),
  chain: z.string(),
});

export type MarketNftParams = z.input<typeof MarketNftParamsSchema>;

export const MarketNftResponseSchema = z.object({
  data: z.object({
    price: z.number(),
    priceETH: z.number(),
  }),
});

export type MarketNftResponse = z.infer<typeof MarketNftResponseSchema>;
