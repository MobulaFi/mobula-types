import { z } from 'zod';

export const TokenFirstBuyersParamsSchema = z.object({
  blockchain: z.string().optional(),
  asset: z.string(),
  limit: z.coerce.number().max(100).min(1).optional().default(70),
});

export type TokenFirstBuyersParams = z.input<typeof TokenFirstBuyersParamsSchema>;

export const TokenFirstBuyersResponseSchema = z.object({
  data: z.array(
    z.object({
      address: z.string(),
      blockchain: z.string(),
      initialAmount: z.string(),
      currentBalance: z.string(),
      firstHoldingDate: z.coerce.date(),
      tags: z.array(z.string()),
      lastUpdate: z.coerce.date().nullable().optional(),
    }),
  ),
});

export type TokenFirstBuyersResponse = z.infer<typeof TokenFirstBuyersResponseSchema>;
