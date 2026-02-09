import { z } from 'zod';
import { CurrenciesParamSchema } from '../../utils/schemas/CurrencySchema.ts';
import { TokenDetailsOutput } from '../../utils/schemas/TokenDetailsOutput.ts';

const TokenDetailsItemParams = z.object({
  blockchain: z.string().optional(),
  address: z.string().optional(),
  currencies: CurrenciesParamSchema,
  instanceTracking: z.preprocess((val) => {
    if (val === 'true') return true;
    if (val === 'false') return false;
    return val;
  }, z.boolean().optional()),
});

const TokenDetailsParamsSchema = TokenDetailsItemParams;

const TokenDetailsBatchParamsSchema = z.union([
  z.array(TokenDetailsItemParams),
  z.object({
    items: z.array(TokenDetailsItemParams),
    instanceTracking: z.preprocess((val) => {
      if (val === 'true') return true;
      if (val === 'false') return false;
      return val;
    }, z.boolean().optional()),
  }),
]);

export type TokenDetailsParams = z.input<typeof TokenDetailsParamsSchema>;

export const TokenDetailsResponseSchema = z.object({
  data: TokenDetailsOutput,
  hostname: z.string().optional(),
});
export type TokenDetailsResponse = z.infer<typeof TokenDetailsResponseSchema>;

export const TokenDetailsBatchResponseSchema = z.object({
  payload: z.array(TokenDetailsOutput.or(z.object({ error: z.string().optional() })).nullable()),
  hostname: z.string().optional(),
});
export type TokenDetailsBatchResponse = z.infer<typeof TokenDetailsBatchResponseSchema>;

export type TokenDetailsBatchParams = z.input<typeof TokenDetailsBatchParamsSchema>;

export { TokenDetailsParamsSchema, TokenDetailsBatchParamsSchema };
