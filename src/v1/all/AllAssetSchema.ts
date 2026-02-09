import { z } from 'zod';

export const AllAssetsParamsSchema = z.object({
  fields: z.string().optional().default(''),
});

export type AllAssetsParams = z.input<typeof AllAssetsParamsSchema>;

export const AllAssetsResponseSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      symbol: z.string(),
      logo: z.string().nullable().optional(),
      price: z.number().nullable().optional(),
      price_change_1h: z.number().optional(),
      price_change_24h: z.number().optional(),
      price_change_7d: z.number().optional(),
      price_change_1m: z.number().optional(),
      price_change_1y: z.number().optional(),
      market_cap: z.number().optional(),
      liquidity: z.number().optional(),
      volume: z.number().optional(),
      blockchains: z.array(z.string()).optional(),
      contracts: z.array(z.string()).optional(),
      decimals: z.array(z.number()).optional(),
      website: z.string().nullish().optional(),
      twitter: z.string().nullish().optional(),
      chat: z.string().nullish().optional(),
    }),
  ),
});

//Response Type
export type AllAssetsResponse = z.infer<typeof AllAssetsResponseSchema>;
