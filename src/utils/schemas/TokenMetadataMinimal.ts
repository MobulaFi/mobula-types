import { z } from 'zod';

/**
 * Minimal token metadata for trade responses
 * Contains only essential display information (name, symbol, logo, decimals)
 */
export const TokenMetadataMinimal = z.object({
  address: z.string(),
  name: z.string().nullable(),
  symbol: z.string().nullable(),
  logo: z.string().nullable(),
  decimals: z.number(),
});

export type TokenMetadataMinimal = z.infer<typeof TokenMetadataMinimal>;
