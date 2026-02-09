import { z } from 'zod';
import { CurrenciesParamSchema } from '../../utils/schemas/CurrencySchema.ts';
import { MarketDetailsOutput } from '../../utils/schemas/MarketDetailsOutput.ts';

const MarketDetailsItemParams = z
  .object({
    blockchain: z.string().optional(),
    address: z.string().optional(),
    baseToken: z.string().optional(),
    currencies: z.string().optional(),
  })
  .transform(({ blockchain, address, baseToken, currencies }) => ({
    blockchain,
    address,
    baseToken,
    currencies: CurrenciesParamSchema.parse(currencies),
    asset: address ? address : undefined,
  }));

const MarketDetailsParamsSchema = MarketDetailsItemParams;

const MarketDetailsBatchParamsSchema = z.union([
  z.array(MarketDetailsItemParams),
  z.object({
    items: z.array(MarketDetailsItemParams),
  }),
]);

export type MarketDetailsParams = z.input<typeof MarketDetailsParamsSchema>;
export type MarketDetailsInferType = z.infer<typeof MarketDetailsParamsSchema>;

export type MarketDetailsBatchParams = z.input<typeof MarketDetailsBatchParamsSchema>;

export const MarketDetailsResponseSchema = z.object({
  data: MarketDetailsOutput,
  hostname: z.string().optional(),
});
export type MarketDetailsResponse = z.infer<typeof MarketDetailsResponseSchema>;

export const MarketDetailsBatchResponseSchema = z.object({
  payload: z.array(MarketDetailsOutput.or(z.object({ error: z.string().optional() })).nullable()),
  hostname: z.string().optional(),
});
export type MarketDetailsBatchResponse = z.infer<typeof MarketDetailsBatchResponseSchema>;

export { MarketDetailsParamsSchema, MarketDetailsBatchParamsSchema };
