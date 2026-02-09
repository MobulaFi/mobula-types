import { z } from 'zod';

export const MarketTokenVsMarketParamsSchema = z.object({
  tag: z.string(),
});

export type MarketTokenVsMarketParams = z.input<typeof MarketTokenVsMarketParamsSchema>;

export const selectAssetTokenVsCategory = {
  marketCapUSD: true,
  priceUSD: true,
  priceChange1hPercent: true,
  priceChange24hPercent: true,
  priceChange7dPercent: true,
  priceChange1mPercent: true,
  name: true,
  symbol: true,
} as const;

export const selectCategoryTokenVsCategory = {
  id: true,
  marketCapUSD: true,
  marketCapChange24hPercent: true,
  marketCapChange7dPercent: true,
  marketCapChange1mPercent: true,
  name: true,
  volumeUSD: true,
} as const;

export const MarketTokenVsMarketResponseSchema = z.object({
  data: z.array(
    z.union([
      z
        .object({
          marketCapUSD: z.number(),
          priceUSD: z.number().nullable(),
          priceChange1hPercent: z.number(),
          priceChange24hPercent: z.number(),
          priceChange7dPercent: z.number(),
          priceChange1mPercent: z.number(),
          name: z.string(),
          symbol: z.string(),
        })
        .nullable(),
      z
        .object({
          id: z.number(),
          marketCapUSD: z.number(),
          marketCapChange24hPercent: z.number(),
          marketCapChange7dPercent: z.number(),
          marketCapChange1mPercent: z.number(),
          name: z.string(),
          volumeUSD: z.number(),
        })
        .nullable(),
    ]),
  ),
});

export type MarketTokenVsMarketResponse = z.infer<typeof MarketTokenVsMarketResponseSchema>;
