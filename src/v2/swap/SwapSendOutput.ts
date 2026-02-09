import { z } from 'zod';

export const SwapSendResponseSchema = z.object({
  data: z.object({
    success: z.boolean(),
    transactionHash: z.string().optional(),
    requestId: z.string(),
  }),
  error: z.string().optional(),
});

export type SwapSendResponse = z.infer<typeof SwapSendResponseSchema>;
