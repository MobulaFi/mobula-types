import { z } from 'zod';

export const SwapSendSchema = z.object({
  chainId: z.string(),
  signedTransaction: z
    .string()
    .min(1, 'signedTransaction is required')
    .transform((val) => {
      try {
        return Buffer.from(val, 'base64');
      } catch {
        throw new Error('signedTransaction must be a valid base64 string');
      }
    }),
});

export type SwapSendParams = z.infer<typeof SwapSendSchema>;
