import { z } from 'zod';
import normalizePeriod from '../../utils/functions/period.ts';

export const MarketMultiHistoryParamsSchema = z.object({
  assets: z
    .string()
    .optional()
    .transform((val) => {
      if (val) {
        return val.split(',');
      }
      return [];
    }),
  period: z
    .string()
    .optional()
    .transform((val) => {
      if (val) {
        return normalizePeriod(val);
      }
      return undefined;
    }),
  symbols: z
    .string()
    .optional()
    .transform((val) => {
      if (val) {
        return val.split(',');
      }
      return [];
    }),
  blockchains: z
    .string()
    .optional()
    .transform((val) => {
      if (val) {
        return val
          .split(',')
          .map((b) => b.trim())
          .filter((b) => b.length > 0);
      }
      return [];
    }),
  ids: z
    .string()
    .optional()
    .transform((val) => {
      if (val) {
        return val.split(',').map((i) => Number(i));
      }
      return [];
    }),
  from: z.string().optional(),
  froms: z
    .string()
    .optional()
    .transform((val) => {
      if (val) {
        return val.split(',').map((v) => Number(v));
      }
      return undefined;
    }),
  to: z.string().optional(),
  tos: z
    .string()
    .optional()
    .transform((val) => {
      if (val) {
        return val.split(',').map((v) => Number(v));
      }
      return undefined;
    }),
});

export type MarketMultiHistoryParams = z.input<typeof MarketMultiHistoryParamsSchema>;

export const MarketMultiHistoryResponseSchema = z.object({
  data: z.array(
    z.object({
      price_history: z.array(z.array(z.number().nullable())).optional(),
      volume_history: z.array(z.array(z.number().nullable())).optional(),
      market_cap_history: z.array(z.array(z.number().nullable())).optional(),
      market_cap_diluted_history: z.array(z.array(z.number().nullable())).optional(),
      name: z.string(),
      symbol: z.string(),
      address: z.string(),
      id: z.number().nullable().optional(),
    }),
  ),
});

export type MarketMultiHistoryResponse = z.infer<typeof MarketMultiHistoryResponseSchema>;
