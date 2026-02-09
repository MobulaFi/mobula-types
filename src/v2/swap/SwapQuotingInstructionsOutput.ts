import { z } from 'zod';

/**
 * Solana instruction schema - represents a single instruction that can be
 * added to a transaction. This allows clients to add their own instructions
 * (e.g., fee transfers, Jito tips) before building the transaction.
 */
export const SolanaInstructionSchema = z.object({
  /** Program ID that will process this instruction */
  programId: z.string(),
  /** Account keys involved in the instruction */
  accounts: z.array(
    z.object({
      pubkey: z.string(),
      isSigner: z.boolean(),
      isWritable: z.boolean(),
    }),
  ),
  /** Instruction data as base64 encoded string */
  data: z.string(),
});

/**
 * Solana instructions response schema
 * Contains all the instructions needed to execute a swap, which the client
 * can combine with their own instructions before building and signing.
 */
export const SolanaInstructionsSchema = z.object({
  /** Instructions to set compute budget (priority fees, compute limits) */
  computeBudgetInstructions: z.array(SolanaInstructionSchema).optional(),
  /** Setup instructions (e.g., create token accounts) */
  setupInstructions: z.array(SolanaInstructionSchema).optional(),
  /** Swap instructions (can be multiple for multi-hop routes) */
  swapInstructions: z.array(SolanaInstructionSchema),
  /** Cleanup instructions (e.g., close token accounts) */
  cleanupInstructions: z.array(SolanaInstructionSchema).optional(),
  /** Address lookup table addresses for versioned transactions */
  addressLookupTableAddresses: z.array(z.string()).optional(),
});

const TokenInfoSchema = z.object({
  address: z.string(),
  name: z.string().optional(),
  symbol: z.string().optional(),
  decimals: z.number(),
  logo: z.string().nullable().optional(),
});

const RouteHopSchema = z.object({
  poolAddress: z.string(),
  tokenIn: TokenInfoSchema,
  tokenOut: TokenInfoSchema,
  amountInTokens: z.string(),
  amountOutTokens: z.string(),
  exchange: z.string().optional(),
  poolType: z.string().optional(),
  feePercentage: z.number().optional(),
  feeBps: z.number().optional(),
});

const RouteDetailsSchema = z.object({
  hops: z.array(RouteHopSchema),
  totalFeePercentage: z.number().optional(),
  aggregator: z.string().optional(),
});

/**
 * Integration fee schema - represents a fee charged by the integrator
 * Fee is taken from native SOL (input or output depending on swap direction)
 */
const IntegrationFeeSchema = z.object({
  /** Fee amount in human-readable format (e.g., "0.01" for 0.01 SOL) */
  amount: z.string(),
  /** Fee percentage applied (0.01 to 99) */
  percentage: z.number(),
  /** Wallet address receiving the fee */
  wallet: z.string(),
  /** Whether fee is deducted from input (SOL→token) or output (token→SOL) */
  deductedFrom: z.enum(['input', 'output']),
});

/**
 * Data schema for swap quoting instructions endpoint
 * Returns instructions instead of a serialized transaction
 */
export const SwapQuotingInstructionsDataSchema = z.object({
  /** Estimated output amount in tokens */
  amountOutTokens: z.string().optional(),
  /** Slippage percentage */
  slippagePercentage: z.number().optional(),
  /** Input amount in USD */
  amountInUSD: z.number().optional(),
  /** Output amount in USD */
  amountOutUSD: z.number().optional(),
  /** Market impact percentage */
  marketImpactPercentage: z.number().optional(),
  /** Pool fees percentage */
  poolFeesPercentage: z.number().optional(),
  /** Token input metadata */
  tokenIn: TokenInfoSchema.optional(),
  /** Token output metadata */
  tokenOut: TokenInfoSchema.optional(),
  /** Unique request ID */
  requestId: z.string(),
  /** Route details */
  details: z
    .object({
      route: RouteDetailsSchema.optional(),
      aggregator: z.string().optional(),
      raw: z.record(z.unknown()).optional(),
    })
    .optional(),
  /** Solana instructions data */
  solana: z.object({
    /** All instructions needed to execute the swap */
    instructions: SolanaInstructionsSchema,
    /** The last block height at which the blockhash will be valid */
    lastValidBlockHeight: z.number(),
    /** Recent blockhash to use when building the transaction */
    recentBlockhash: z.string(),
  }),
  /** Integration fee details (if feePercentage and feeWallet were provided) */
  fee: IntegrationFeeSchema.optional(),
});

export const SwapQuotingInstructionsOutputSchema = z.object({
  data: SwapQuotingInstructionsDataSchema,
  error: z.string().optional(),
});

export type SolanaInstruction = z.infer<typeof SolanaInstructionSchema>;
export type SolanaInstructions = z.infer<typeof SolanaInstructionsSchema>;
export type SwapQuotingInstructionsData = z.infer<typeof SwapQuotingInstructionsDataSchema>;
export type SwapQuotingInstructionsResponse = z.infer<typeof SwapQuotingInstructionsOutputSchema>;
