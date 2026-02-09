import { z } from 'zod';
import DateQuery from '../../utils/schemas/DateQuery.ts';
import { TokenTradeOutput } from '../token/TokenTradesSchema.ts';

/**
 * Maximum timeframe allowed for trades/filters endpoint (default: 1 hour in milliseconds)
 * Configurable via TRADES_FILTERS_MAX_TIMEFRAME_MS env variable
 */
export const TRADES_FILTERS_MAX_TIMEFRAME_MS = Number(process.env['TRADES_FILTERS_MAX_TIMEFRAME_MS']) || 60 * 60 * 1000;

/**
 * Maximum number of trades that can be returned per request
 * Configurable via TRADES_FILTERS_MAX_LIMIT env variable (default: 5000)
 */
export const TRADES_FILTERS_MAX_LIMIT = Number(process.env['TRADES_FILTERS_MAX_LIMIT']) || 5000;

/**
 * TradesFiltersParams - Query parameters for the trades/filters endpoint
 *
 * This endpoint allows batch downloading trades with filters:
 * - Filter by token address (optional)
 * - Filter by blockchain/chain (optional)
 * - Required timeframe (from/to) with max 1 hour window
 * - Cursor-based pagination for fetching more results
 */
export const TradesFiltersParamsSchema = z
  .object({
    // Filter by token address (optional - if not provided, returns all trades)
    tokenAddress: z.string().optional(),

    // Filter by blockchain name or chain ID (optional - if not provided, returns all chains)
    blockchain: z.string().optional(),

    // Timeframe - REQUIRED
    from: DateQuery.refine((val) => val !== undefined, { message: 'from date is required' }),
    to: DateQuery.refine((val) => val !== undefined, { message: 'to date is required' }),

    // Pagination
    limit: z.coerce.number().min(1).max(TRADES_FILTERS_MAX_LIMIT).optional().default(1000),

    // Cursor-based pagination (format: "timestamp_ms:id")
    cursor: z.string().optional(),

    // Sort order (default: asc for batch downloading)
    sortOrder: z.enum(['asc', 'desc']).default('asc'),
  })
  .refine(
    (data) => {
      if (!data.from || !data.to) return false;
      const fromTime = data.from.getTime();
      const toTime = data.to.getTime();
      return toTime - fromTime <= TRADES_FILTERS_MAX_TIMEFRAME_MS;
    },
    {
      message: `Timeframe cannot exceed 1 hour (${TRADES_FILTERS_MAX_TIMEFRAME_MS}ms)`,
    },
  )
  .refine(
    (data) => {
      if (!data.from || !data.to) return false;
      return data.from.getTime() < data.to.getTime();
    },
    {
      message: 'from date must be before to date',
    },
  );

export type TradesFiltersParams = z.input<typeof TradesFiltersParamsSchema>;
export type TradesFiltersInferType = z.infer<typeof TradesFiltersParamsSchema>;

/**
 * Pagination info for trades/filters response
 */
export const TradesFiltersPaginationSchema = z.object({
  // Number of items returned in this response
  count: z.number(),
  // Cursor for next page (null if no more results)
  nextCursor: z.string().nullable(),
  // Whether there are more results available
  hasMore: z.boolean(),
  // Total timeframe covered
  from: z.number(),
  to: z.number(),
});

/**
 * Response schema for trades/filters endpoint
 * Uses same output format as TokenTradeOutput for consistency
 */
export const TradesFiltersResponseSchema = z.object({
  data: z.array(TokenTradeOutput),
  pagination: TradesFiltersPaginationSchema,
});

export type TradesFiltersResponse = z.infer<typeof TradesFiltersResponseSchema>;
