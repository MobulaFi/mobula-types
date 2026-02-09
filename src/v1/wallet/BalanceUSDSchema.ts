import { z } from 'zod';

export const WalletBalanceUSDParamsSchema = z.object({
  portfolioId: z.string().min(1, 'portfolioId is required').regex(/^\d+$/, 'portfolioId must be a valid number'),
});

export type WalletBalanceUSDParams = z.input<typeof WalletBalanceUSDParamsSchema>;

export const WalletBalanceUSDResponseSchema = z.object({
  success: z.number(),
});

export type WalletBalanceUSDResponse = z.infer<typeof WalletBalanceUSDResponseSchema>;
