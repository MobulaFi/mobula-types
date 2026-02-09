import { z } from 'zod';

/**
 * Schema for LLM-based static code analysis security flags
 * These are detected through AI analysis of verified contract source code
 */
export const LLMSecurityFlagsSchema = z.object({
  // Balance manipulation capabilities
  balanceMutable: z.boolean().optional(),
  balanceMutableReason: z.string().optional(),

  // Minting capabilities
  isMintable: z.boolean().optional(),
  isMintableReason: z.string().optional(),

  // Transfer restrictions
  transferPausable: z.boolean().optional(),
  transferPausableReason: z.string().optional(),

  // Blacklist/Whitelist mechanisms
  isBlacklisted: z.boolean().optional(),
  isBlacklistedReason: z.string().optional(),
  isWhitelisted: z.boolean().optional(),
  isWhitelistedReason: z.string().optional(),

  // Tax/Fee manipulation
  modifyableTax: z.boolean().optional(),
  modifyableTaxReason: z.string().optional(),

  // Ownership concerns
  hasHiddenOwner: z.boolean().optional(),
  hasHiddenOwnerReason: z.string().optional(),
  canTakeBackOwnership: z.boolean().optional(),
  canTakeBackOwnershipReason: z.string().optional(),

  // Destructive capabilities
  selfDestruct: z.boolean().optional(),
  selfDestructReason: z.string().optional(),

  // Honeypot indicators
  hasHoneypotMechanism: z.boolean().optional(),
  honeypotReason: z.string().optional(),

  // External call risks
  hasExternalCallRisk: z.boolean().optional(),
  externalCallRiskReason: z.string().optional(),

  // Analysis metadata
  analyzedAt: z.string(),
  contractVerified: z.boolean(),
  analysisConfidence: z.enum(['high', 'medium', 'low']),
  rawAnalysis: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type LLMSecurityFlags = z.infer<typeof LLMSecurityFlagsSchema>;

/**
 * Schema for security_sources column which stores results from multiple sources
 */
export const SecuritySourcesSchema = z.object({
  // GoPlus API results
  goplus: z
    .object({
      data: z.record(z.unknown()).optional(),
      updatedAt: z.string().optional(),
    })
    .optional(),

  // LLM static analysis results
  llm_analysis: LLMSecurityFlagsSchema.optional(),
});

export type SecuritySources = z.infer<typeof SecuritySourcesSchema>;
