import { z } from 'zod';
export const walletSchema = z.object({
  wallet: z.string(),
});
