import { z } from 'zod';

export const WalletLabelsParamsSchema = z.object({
  walletAddresses: z.union([z.string(), z.array(z.string()).max(100)]).optional(),
  tokenAddress: z.string().optional(),
});

export type WalletLabelsParams = z.input<typeof WalletLabelsParamsSchema>;

export const WalletLabelsResponseSchema = z.object({
  data: z.array(
    z.object({
      walletAddress: z.string(),
      labels: z.array(z.string()),
    }),
  ),
});

export type WalletLabelsResponse = z.infer<typeof WalletLabelsResponseSchema>;
