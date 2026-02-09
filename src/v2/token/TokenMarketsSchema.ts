import { z } from 'zod';
import { MarketDetailsOutput } from '../../utils/schemas/MarketDetailsOutput.ts';

const DEFAULT_MARKETS_RES_LIMIT = 10;
const MARKETS_MAX__RES_LIMIT = 25;

export const TokenMarketsParamsSchema = z.object({
  blockchain: z.string().optional(),
  address: z.string(),
  limit: z.coerce.number().min(1).max(MARKETS_MAX__RES_LIMIT).default(DEFAULT_MARKETS_RES_LIMIT),
});

export type TokenMarketsParams = z.input<typeof TokenMarketsParamsSchema>;

/**
 * The resolved data for TokenMarkets is an array of what MarketDetails resolve, so we
 * use the same schema as a base.
 */
export const TokenMarketsOutput = z.array(MarketDetailsOutput);

export const TokenMarketsResponseSchema = z.object({
  data: TokenMarketsOutput,
  totalCount: z.number(),
});

export type TokenMarketsResponse = z.infer<typeof TokenMarketsResponseSchema>;
