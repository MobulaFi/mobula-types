import { z } from 'zod';

// Zod schema for wallet funding query parameters
export const WalletFundingParamsSchema = z.object({
  wallet: z.string().min(1, 'Wallet address is required'),
});

export type WalletFundingParams = z.input<typeof WalletFundingParamsSchema>;

// Zod schema for wallet funding response
export const WalletFundingResponseSchema = z.object({
  data: z.object({
    from: z.string().nullable(),
    chainId: z.string().nullable(),
    date: z.coerce.date().nullable(),
    txHash: z.string().nullable(),
    amount: z.string().nullable(),
    fromWalletLogo: z.string().nullable(),
    fromWalletTag: z.string().nullable(),
  }),
});

export type WalletFundingResponse = z.infer<typeof WalletFundingResponseSchema>;
