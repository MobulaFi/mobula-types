import { z } from 'zod';
import { SecurityFlagsSchema } from '../../utils/schemas/SecuritySchemas.ts';

export const tokenHoldingSchema = z.object({
  token: z.object({
    address: z.string(),
    chainId: z.string(),
    name: z.string().nullable(),
    symbol: z.string().nullable(),
    logo: z.string().nullable(),
    decimals: z.coerce.number().default(0),
    holdersCount: z.coerce.number().default(0),
    deployer: z.string().nullable(),
    website: z.string().nullable(),
    x: z.string().nullable(),
    telegram: z.string().nullable(),
    description: z.string().nullable(),
    security: SecurityFlagsSchema.nullable(),
  }),
  balance: z.number(),
  rawBalance: z.string(),
  /** Rent lamports for Solana token accounts (returned when account is closed). Only present for Solana SPL tokens. */
  lamports: z.string().nullable().optional(),
});

export const WalletHoldingsResponseSchema = z.object({
  data: z.array(tokenHoldingSchema),
});

export type TokenHolding = z.infer<typeof tokenHoldingSchema>;
export type WalletHoldingsResponse = z.infer<typeof WalletHoldingsResponseSchema>;
