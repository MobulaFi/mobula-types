import { z } from 'zod';

export const PerpBlocksQueryParamsSchema = z.object({
  exchange: z.string().optional(),
  chain_id: z.string().optional(),
  block_number: z.coerce.number().optional(),
  batch_number: z.coerce.number().optional(),
  block_status: z.string().optional(),
  from_block_time: z.string().optional(),
  to_block_time: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(25),
});

export type PerpBlocksQueryParams = z.infer<typeof PerpBlocksQueryParamsSchema>;

export const PerpBlockSchema = z.object({
  exchange: z.string().nullable(),
  chain_id: z.string().nullable(),
  block_number: z.number(),
  batch_number: z.number(),
  block_status: z.string().nullable(),
  block_time: z.string(),
  total_transactions: z.number(),
  logs_count: z.number(),
  trades_count: z.number(),
  commit_tx_hash: z.string().nullable(),
  verify_tx_hash: z.string().nullable(),
  execute_tx_hash: z.string().nullable(),
  scraped_at: z.string(),
});

export type PerpBlock = z.infer<typeof PerpBlockSchema>;

export const PerpBlocksResponseSchema = z.object({
  data: z.array(PerpBlockSchema),
  pagination: z.object({
    page: z.number(),
    totalPages: z.number(),
    totalItems: z.number(),
    limit: z.number(),
  }),
});

export type PerpBlocksResponse = z.infer<typeof PerpBlocksResponseSchema>;
