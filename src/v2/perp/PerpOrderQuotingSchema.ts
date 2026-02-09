import { z } from 'zod';

const SupportedDexSchema = z.enum(['gains']);

const TradeTypeSchema = z.enum(['market', 'limit', 'stop_limit']);

const PerpOrderQuotingParamsSchema = z.object({
  user: z.string(),
  baseToken: z.string(),
  quote: z.string(),
  leverage: z.coerce.number(),
  long: z.union([z.boolean(), z.string()]).transform((val) => (typeof val === 'string' ? val === 'true' : val)),
  collateralAmount: z.coerce.number(),
  openPrice: z.coerce.number().optional(),
  tp: z.coerce.number().optional(),
  sl: z.coerce.number().optional(),
  tradeType: TradeTypeSchema.optional().default('market'),
  amountRaw: z.coerce.number().optional(),
  maxSlippageP: z.coerce.number().optional(),
  chainId: z.string().optional(),
  dex: SupportedDexSchema.optional(),
  referrer: z.string().optional(),
});

type TradeType = z.infer<typeof TradeTypeSchema>;
type SupportedDex = z.infer<typeof SupportedDexSchema>;
type PerpOrderQuotingParams = z.infer<typeof PerpOrderQuotingParamsSchema>;

export { PerpOrderQuotingParamsSchema, type TradeType, type SupportedDex, type PerpOrderQuotingParams };
