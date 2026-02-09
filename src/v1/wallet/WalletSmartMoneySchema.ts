import { z } from 'zod';

export const WalletSmartMoneyResponseSchema = z.object({
  data: z.array(
    z.object({
      wallet_address: z.string(),
      realized_pnl: z.number(),
      unrealized_pnl: z.number(),
      txns_count: z.number(),
      volume: z.number(),
      blockchains: z.array(z.string()),
      win_rate: z.number(),
      tokens_distribution: z.object({
        '10x+': z.number(),
        '4x - 10x': z.number(),
        '2x - 4x': z.number(),
        '10% - 2x': z.number(),
        '-10% - 10%': z.number(),
        '-50% - -10%': z.number(),
        '-100% - -50%': z.number(),
      }),
      top_3_tokens: z.array(z.record(z.string(), z.number())),
    }),
  ),
});

export type WalletSmartMoneyResponse = z.infer<typeof WalletSmartMoneyResponseSchema>;
