import { z } from 'zod';

export const ExchangesIds = z.enum(['gains', 'hyperliquid', 'gte', 'lighter', 'drift']);

const tpSlSchema = z.object({ size: z.bigint(), price: z.number(), id: z.number() });
export const PerpsPositionSchema = z.object({
  id: z.string(),
  entryPriceQuote: z.number(),
  currentLeverage: z.number(),
  amountUSD: z.number(),
  amountRaw: z.bigint(),
  side: z.enum(['BUY', 'SELL']),
  liquidationPriceQuote: z.number(),
  currentPriceQuote: z.number(),
  realizedPnlUSD: z.number(),
  unrealizedPnlUSD: z.number(),
  realizedPnlPercent: z.number(),
  unrealizedPnlPercent: z.number(),
  tp: z.array(tpSlSchema),
  sl: z.array(tpSlSchema),
  marketId: z.string(),
  exchange: ExchangesIds,
  feesOpeningUSD: z.number(),
  feesClosingUSD: z.number(),
  feesFundingUSD: z.number(),
  openDate: z.coerce.date(),
  lastUpdate: z.coerce.date(),
  address: z.string(),
  chainId: z.string(),
  collateralAsset: z.string(),
});

export type PerpsPosition = z.infer<typeof PerpsPositionSchema>;
export const PerpsPositionNonExecutedSchema = PerpsPositionSchema.extend({
  type: z.enum(['STOP', 'LIMIT']),
});

export type PerpsPositionNonExecuted = z.infer<typeof PerpsPositionNonExecutedSchema>;

export const WalletPerpsPositionsResponseSchema = z.object({
  data: z.array(PerpsPositionSchema),
});

export const WalletPerpsPositionsNonExecutedResponseSchema = z.object({
  data: z.array(PerpsPositionNonExecutedSchema),
});
