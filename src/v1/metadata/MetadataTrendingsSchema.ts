import { z } from 'zod';

export const MetadataTrendingsParamsSchema = z
  .object({
    platform: z.string().transform((x) => (x !== undefined && x !== null ? x.toLocaleLowerCase() : x)),
    blockchain: z.string().transform((x) => (x !== undefined && x !== null ? x.toLocaleLowerCase() : x)),
  })
  .partial();

export type MetadataTrendingsParams = z.input<typeof MetadataTrendingsParamsSchema>;

export const MetadataTrendingsResponseSchema = z.array(
  z.object({
    name: z.string().nullable(),
    symbol: z.string().nullable(),
    contracts: z.array(
      z
        .object({
          address: z.string(),
          blockchain: z.string(),
          decimals: z.number(),
        })
        .optional(),
    ),
    price_change_24h: z.number(),
    price: z.number(),
    logo: z.string().nullable(),
    trending_score: z.number(),
    pair: z.string().nullable(),
    platforms: z.array(
      z.object({
        name: z.string(),
        rank: z.number(),
        weigth: z.number(),
      }),
    ),
  }),
);

export type MetadataTrendingsResponse = z.infer<typeof MetadataTrendingsResponseSchema>;
