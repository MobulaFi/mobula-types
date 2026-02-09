import { z } from 'zod';
import { SwapQuotingDataSchema } from './SwapQuotingOutput.ts';

const SwapQuotingBatchResultSchema = z.object({
  data: SwapQuotingDataSchema,
  error: z.string().optional(),
  index: z.number(),
});

export const SwapQuotingBatchOutputSchema = z.object({
  results: z.array(SwapQuotingBatchResultSchema),
  totalRequests: z.number(),
  successCount: z.number(),
  errorCount: z.number(),
});

export type SwapQuotingBatchResult = z.infer<typeof SwapQuotingBatchResultSchema>;
export type SwapQuotingBatchResponse = z.infer<typeof SwapQuotingBatchOutputSchema>;
