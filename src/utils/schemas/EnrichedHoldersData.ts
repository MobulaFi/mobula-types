import { z } from 'zod';
import BigIntLax from './BigIntLax.ts';

export const HolderSchema = z.object({
  address: z.string(),

  balanceRaw: BigIntLax,
  nativeBalanceRaw: BigIntLax,
  balance: z.coerce.number(),
  nativeBalance: z.coerce.number(),
  balanceUSD: z.coerce.number(),

  boughtAmountRaw: BigIntLax,
  boughtAmount: z.coerce.number(),
  boughtAmountUSD: z.coerce.number(),

  soldAmount: z.coerce.number(),
  soldAmountRaw: BigIntLax,
  soldAmountUSD: z.coerce.number(),

  realizedPnlUSD: z.coerce.number(),
  unrealizedPnlUSD: z.coerce.number(),

  tags: z.string().array(),

  createdAt: z.coerce.date().nullable(),
  updatedAt: z.coerce.date().nullable(),
});

export type HolderSchema = z.infer<typeof HolderSchema>;

export const HoldersStatsSchema = z.object({
  holdersCount: z.coerce.number().nullable().optional(),
  top10HoldingsPercentage: z.coerce.number().nullable().optional(),
  top50HoldingsPercentage: z.coerce.number().nullable().optional(),
  top100HoldingsPercentage: z.coerce.number().nullable().optional(),
  top200HoldingsPercentage: z.coerce.number().nullable().optional(),

  devHoldingsPercentage: z.coerce.number().nullable().optional(),
  insidersHoldingsPercentage: z.coerce.number().nullable().optional(),
  bundlersHoldingsPercentage: z.coerce.number().nullable().optional(),
  snipersHoldingsPercentage: z.coerce.number().nullable().optional(),
  proTradersHoldingsPercentage: z.coerce.number().nullable().optional(),
  freshTradersHoldingsPercentage: z.coerce.number().nullable().optional(),
  smartTradersHoldingsPercentage: z.coerce.number().nullable().optional(),

  insidersCount: z.coerce.number().nullable().optional(),
  bundlersCount: z.coerce.number().nullable().optional(),
  snipersCount: z.coerce.number().nullable().optional(),
  freshTradersCount: z.coerce.number().nullable().optional(),
  proTradersCount: z.coerce.number().nullable().optional(),
  smartTradersCount: z.coerce.number().nullable().optional(),

  freshTradersBuys: z.coerce.number().nullable().optional(),
  proTradersBuys: z.coerce.number().nullable().optional(),
  smartTradersBuys: z.coerce.number().nullable().optional(),
});

export type HoldersStatsSchema = z.infer<typeof HoldersStatsSchema>;

export const HoldersStreamNewTokenPayload = HoldersStatsSchema.extend({
  holders: z.array(HolderSchema),
});

export type HoldersStreamNewTokenPayload = z.infer<typeof HoldersStreamNewTokenPayload>;

export type HoldersStreamStats = HoldersStatsSchema & {
  holders: HolderSchema[];
};

export type HoldersStreamUpdatePayload = HoldersStatsSchema & {
  tokenPrice: number | null;
  holders: Record<string, HoldersStreamStats['holders'][number]>;
};
