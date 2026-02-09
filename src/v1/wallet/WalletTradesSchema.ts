import { z } from 'zod';
import { PlatformMetadataOutput } from '../../utils/schemas/PlatformMetadataOutput.ts';
import { TokenDetailsOutput } from '../../utils/schemas/TokenDetailsOutput.ts';
import { WalletMetadataOutput } from '../../utils/schemas/WalletMetadataOutput.ts';

export const WalletTradesParamsSchema = z.object({
  limit: z.string().optional().default('100'),
  offset: z.string().optional().default('0'),
  page: z.string().optional().default('1'),
  order: z.string().optional(),
  wallet: z.string().optional(),
  wallets: z.string().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
});

export type WalletTradesParams = z.input<typeof WalletTradesParamsSchema>;
export type WalletTradesInferType = z.infer<typeof WalletTradesParamsSchema>;

export const WalletTradesResponseSchema = z.object({
  data: z.array(
    z.object({
      chain_id: z.string(),
      swap_type: z.string(),
      raw_amount0: z.string(),
      raw_amount1: z.string(),
      raw_post_balance0: z.string().optional().nullable(),
      raw_post_balance1: z.string().optional().nullable(),
      raw_pre_balance0: z.string().optional().nullable(),
      raw_pre_balance1: z.string().optional().nullable(),
      amount0: z.coerce.number(),
      amount1: z.coerce.number(),
      ratio: z.number(),
      price_usd_token0: z.number(),
      price_usd_token1: z.number(),
      date: z.coerce.date(),
      amount_usd: z.number(),
      pool_address: z.string(),
      token0_address: z.string(),
      token1_address: z.string(),
      transaction_sender_address: z.string(),
      transaction_hash: z.string(),
      base: z.string(),
      quote: z.string(),
      side: z.string(),
      amount_quote: z.coerce.number(),
      amount_base: z.coerce.number(),
      amount_quote_raw: z.string(),
      amount_base_raw: z.string(),
      base_token: TokenDetailsOutput.optional().nullable(),
      // Labels (sniper, bundler, insider, dev, proTrader, smartTrader, freshTrader)
      labels: z.array(z.string()),
      // Wallet metadata from scraping_wallets (entity info)
      walletMetadata: WalletMetadataOutput.nullable().optional(),
      // Platform where the trade was executed (e.g. Photon, BullX, Maestro, etc.)
      platform: PlatformMetadataOutput.nullable().optional(),
      // Fees breakdown
      totalFeesUSD: z.number().nullable().optional(),
      gasFeesUSD: z.number().nullable().optional(),
      platformFeesUSD: z.number().nullable().optional(),
      mevFeesUSD: z.number().nullable().optional(),
    }),
  ),
});

export type WalletTradesResponse = z.infer<typeof WalletTradesResponseSchema>;
