import { z } from 'zod';

const TokenSchema = z.object({
  name: z.string(),
  symbol: z.string(),
  address: z.string(),
  type: z.enum(['eth', 'stable', 'other']),
  decimals: z.number(),
  denom: z.string().optional(),
});

const ExtendedTokenSchema = TokenSchema.extend({
  logo: z.string(),
  blockchain: z.string(),
  blockchains: z.array(z.string()),
  contracts: z.array(z.string()),
});

export const BlockchainsResponseSchema = z.object({
  data: z.array(
    z.object({
      name: z.string(),
      shortName: z.string().optional(),
      explorer: z.string(),
      color: z.string(),
      chainId: z.string(),
      evmChainId: z.number().optional(),
      cosmosChainId: z.string().optional(),

      testnet: z.boolean().optional(),

      multicall_contract: z.string().optional(),

      uniswapV3Factory: z.array(z.string()).optional(),

      eth: TokenSchema.extend({
        logo: z.string(),
        id: z.number().optional(),
      }).optional(),
      stable: ExtendedTokenSchema.optional(),

      routers: z.array(
        z.object({
          address: z.string(),
          name: z.string(),
          factory: z.string().optional(),
          fee: z.number().optional(),
        }),
      ),
      tokens: z.array(
        z.object({
          address: z.string(),
          name: z.string(),
          symbol: z.string().optional(),
          decimals: z.number().optional(),
          type: z.string().optional(),
        }),
      ),

      supportedProtocols: z.array(z.string()),
      logo: z.string(),

      coingeckoChain: z.string().optional(),
      dexscreenerChain: z.string().optional(),
      isLayer2: z.boolean().optional(),
      coverage: z.array(z.string().optional()).optional(),
    }),
  ),
});

export type BlockchainsResponse = z.infer<typeof BlockchainsResponseSchema>;
