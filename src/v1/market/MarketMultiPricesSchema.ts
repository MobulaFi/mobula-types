import { z } from 'zod';
import { stringOrArray } from '../../utils/schemas/StringOrArray.ts';

// Schema for assets (addresses or names)
const assetEntry = z.object({
  type: z.enum(['address', 'name']),
  value: z.string(),
});

export const MarketMultiPricesParamsSchema = z.object({
  // Blockchains (string or array, transformed into an array of chain IDs)
  blockchains: stringOrArray.optional(),

  // Assets (addresses or names, string or array of objects)
  assets: z
    .union([
      z.string(), // Ex. "0x123,bitcoin"
      z.array(assetEntry), // Or an array of objects { type, value }
    ])
    .optional(),
});

export type MarketMultiPricesParams = z.input<typeof MarketMultiPricesParamsSchema>;

export const MarketMultiPricesResponseSchema = z.object({
  data: z.record(
    z.string(),
    z.object({
      price: z.number().nullable(),
      name: z.string().nullable(),
      symbol: z.string().nullable(),
      logo: z.string().nullable(),
      marketCap: z.number().nullable(),
      marketCapDiluted: z.number().nullable(),
      liquidity: z.number().nullable(),
      liquidityMax: z.number().nullable(),
    }),
  ),
});

export type MarketMultiPricesResponse = z.infer<typeof MarketMultiPricesResponseSchema>;
