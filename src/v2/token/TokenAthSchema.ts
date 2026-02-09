import { z } from 'zod';
import { CurrenciesParamSchema } from '../../utils/schemas/CurrencySchema.ts';

const TokenAthItemParams = z.object({
  blockchain: z.string().optional(),
  address: z.string().optional(),
  currencies: CurrenciesParamSchema,
  instanceTracking: z.preprocess((val) => {
    if (val === 'true') return true;
    if (val === 'false') return false;
    return val;
  }, z.boolean().optional()),
});

export const TokenAthParamsSchema = TokenAthItemParams;

export const TokenAthBatchParamsSchema = z.union([
  z.array(TokenAthItemParams),
  z.object({
    items: z.array(TokenAthItemParams),
    instanceTracking: z.preprocess((val) => {
      if (val === 'true') return true;
      if (val === 'false') return false;
      return val;
    }, z.boolean().optional()),
  }),
]);

export type TokenAthParams = z.input<typeof TokenAthParamsSchema>;
export type TokenAthBatchParams = z.input<typeof TokenAthBatchParamsSchema>;

export const TokenAthOutput = z.object({
  address: z.string(),
  chainId: z.string(),
  symbol: z.string().nullable(),
  name: z.string().nullable(),
  athUSD: z.coerce.number().optional(),
  atlUSD: z.coerce.number().optional(),
  athDate: z.coerce.date().optional(),
  atlDate: z.coerce.date().optional(),
  priceUSD: z.coerce.number().default(0),
});

export type TokenAthOutputType = z.infer<typeof TokenAthOutput>;

export const TokenAthResponseSchema = z.object({
  data: TokenAthOutput,
  hostname: z.string().optional(),
});
export type TokenAthResponse = z.infer<typeof TokenAthResponseSchema>;

export const TokenAthBatchResponseSchema = z.object({
  payload: z.array(TokenAthOutput.or(z.object({ error: z.string().optional() })).nullable()),
  hostname: z.string().optional(),
});
export type TokenAthBatchResponse = z.infer<typeof TokenAthBatchResponseSchema>;
