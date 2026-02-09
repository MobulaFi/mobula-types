import { z } from 'zod';

export const MarketSparklineResponseSchema = z.object({
  url: z.string(),
});

export type MarketSparklineResponse = z.infer<typeof MarketSparklineResponseSchema>;

export const MarketSparklineParamsSchema = z.object({
  asset: z.string().optional(),
  blockchain: z.string().optional(),
  symbol: z.string().optional(),
  id: z.string().optional(),
  timeFrame: z.string().optional().default('24h'),
  png: z.string().optional().default('false'),
});

export type MarketSparklineParams = z.input<typeof MarketSparklineParamsSchema>;
