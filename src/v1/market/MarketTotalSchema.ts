import { z } from 'zod';

export const MarketTotalResponseSchema = z.object({
  market_cap_history: z.array(z.tuple([z.number(), z.number()])),
  market_cap_change_24h: z.string(),
  btc_dominance_history: z.array(z.tuple([z.number(), z.number()])),
});

export type MarketTotalResponse = z.infer<typeof MarketTotalResponseSchema>;
