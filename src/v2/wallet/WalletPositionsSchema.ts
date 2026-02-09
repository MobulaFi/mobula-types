import { z } from 'zod';
import { tokenPositionSchema, WalletMetadataSchema } from '../../utils/schemas/WalletDeployerSchema.ts';

/**
 * Sort options for wallet positions (camelCase API values)
 * - lastActivity: Sort by last trade date (default)
 * - realizedPnl: Sort by realized PnL USD
 *
 * Internally mapped to snake_case for SQL queries:
 * - lastActivity → last_activity
 * - realizedPnl → realized_pnl
 */
export const PositionSortBySchema = z.enum(['lastActivity', 'realizedPnl']).default('lastActivity');
export type PositionSortBy = z.infer<typeof PositionSortBySchema>;

/**
 * Map camelCase sortBy values to internal snake_case values for SQL queries
 */
export const positionSortByToInternal = (sortBy: PositionSortBy): 'last_activity' | 'realized_pnl' => {
  const mapping: Record<PositionSortBy, 'last_activity' | 'realized_pnl'> = {
    lastActivity: 'last_activity',
    realizedPnl: 'realized_pnl',
  };
  return mapping[sortBy];
};

export const WalletPositionsParamsSchema = z.object({
  wallet: z.string(),
  blockchain: z.string().optional(),

  // Pagination
  limit: z.coerce.number().min(1).max(500).optional().default(100),
  offset: z.coerce.number().min(0).optional().default(0),

  // Cursor-based pagination (takes precedence over offset)
  cursor: z.string().optional(),
  cursorDirection: z.enum(['before', 'after']).optional().default('after'),

  // Sorting
  sortBy: PositionSortBySchema.optional(),
  order: z.enum(['asc', 'desc']).optional().default('desc'),

  // Internal backfill options (not documented)
  _backfillPositions: z
    .union([z.boolean(), z.string()])
    .default(false)
    .transform((val) => (typeof val === 'string' ? val === 'true' : val)),
  _backfillSwapsAndPositions: z
    .union([z.boolean(), z.string()])
    .default(false)
    .transform((val) => (typeof val === 'string' ? val === 'true' : val)),
  /** Include fees in PnL calculation (deduct total_fees_paid_usd from PnL) */
  includeFees: z
    .union([z.boolean(), z.string()])
    .default(false)
    .transform((val) => (typeof val === 'string' ? val === 'true' : val)),
  /** Use swap recipient mode (query wallet_positions_recipients table instead of wallet_positions) */
  useSwapRecipient: z
    .union([z.boolean(), z.string()])
    .default(false)
    .transform((val) => (typeof val === 'string' ? val === 'true' : val)),
});

export type WalletPositionsParams = z.input<typeof WalletPositionsParamsSchema>;

export const SinglePositionQuery = z.object({
  wallet: z.string(),
  asset: z.string(),
  blockchain: z.string(),
  /** Include fees in PnL calculation (deduct total_fees_paid_usd from PnL) */
  includeFees: z
    .union([z.boolean(), z.string()])
    .default(false)
    .transform((val) => (typeof val === 'string' ? val === 'true' : val)),
  /** Use swap recipient mode (query wallet_positions_recipients table instead of wallet_positions) */
  useSwapRecipient: z
    .union([z.boolean(), z.string()])
    .default(false)
    .transform((val) => (typeof val === 'string' ? val === 'true' : val)),
});

// Batch position query - single item schema
const SinglePositionItemSchema = z.object({
  wallet: z.string(),
  asset: z.string(),
  blockchain: z.string(),
  /** Include fees in PnL calculation (deduct total_fees_paid_usd from PnL) */
  includeFees: z
    .union([z.boolean(), z.string()])
    .default(false)
    .transform((val) => (typeof val === 'string' ? val === 'true' : val)),
  /** Use swap recipient mode (query wallet_positions_recipients table instead of wallet_positions) */
  useSwapRecipient: z
    .union([z.boolean(), z.string()])
    .default(false)
    .transform((val) => (typeof val === 'string' ? val === 'true' : val)),
});

// Batch position params - supports array or object with items
export const SinglePositionBatchParamsSchema = z.union([
  z.array(SinglePositionItemSchema),
  z.object({
    items: z.array(SinglePositionItemSchema),
    instanceTracking: z.preprocess((val) => {
      if (val === 'true') return true;
      if (val === 'false') return false;
      return val;
    }, z.boolean().optional()),
  }),
]);

export type SinglePositionBatchParams = z.input<typeof SinglePositionBatchParamsSchema>;

export type TokenPositionType = z.infer<typeof tokenPositionSchema>;

// Pagination schema aligned with WalletActivityV2
export const WalletPositionsPaginationSchema = z.object({
  page: z.number(),
  offset: z.number(),
  limit: z.number(),
  pageEntries: z.number(), // Number of items actually returned
});

export const WalletPositionsResponseSchema = z.object({
  data: z.array(tokenPositionSchema),
  // Wallet-level metadata (funding info, global labels)
  wallet: WalletMetadataSchema.optional(),
  // Pagination info
  pagination: WalletPositionsPaginationSchema.optional(),
});

export type WalletPositionsResponse = z.infer<typeof WalletPositionsResponseSchema>;

export const singlePositionOutputSchema = z.object({
  data: tokenPositionSchema,
  // Wallet-level metadata (funding info, global labels)
  wallet: WalletMetadataSchema.optional(),
});

// Batch position item schema - includes wallet for identification
export const batchPositionItemSchema = tokenPositionSchema.extend({
  wallet: z.string(),
});

// Batch response schema
export const SinglePositionBatchResponseSchema = z.object({
  payload: z.array(
    batchPositionItemSchema.or(z.object({ error: z.string().optional(), wallet: z.string().optional() })).nullable(),
  ),
  hostname: z.string().optional(),
});

export type SinglePositionBatchResponse = z.infer<typeof SinglePositionBatchResponseSchema>;
export type BatchPositionItem = z.infer<typeof batchPositionItemSchema>;

// Type aliases for SDK consistency
export type WalletPositionParams = z.input<typeof SinglePositionQuery>;
export type WalletPositionResponse = z.infer<typeof singlePositionOutputSchema>;
export type WalletPositionBatchParams = z.input<typeof SinglePositionBatchParamsSchema>;
export type WalletPositionBatchResponse = z.infer<typeof SinglePositionBatchResponseSchema>;
