import { z } from 'zod';

export const formattedJSONSchema = z.object({
  name: z.string(),
  symbol: z.string(),
  type: z.string(),
  description: z.string(),
  categories: z.array(z.string()),
  completed: z.boolean(),
  links: z.object({
    website: z.string(),
    twitter: z.string(),
    telegram: z.string(),
    discord: z.string(),
    github: z.string(),
    audits: z.array(z.string()),
    kycs: z.array(z.string()),
  }),
  contracts: z.array(
    z.object({
      address: z.string(),
      blockchain: z.string(),
      blockchain_id: z.number(),
    }),
  ),
  totalSupplyContracts: z.array(
    z.object({
      address: z.string(),
      blockchain: z.string(),
      blockchain_id: z.number(),
    }),
  ),
  excludedFromCirculationAddresses: z.array(z.string()),
  tokenomics: z.object({
    distribution: z.array(z.string()),
    sales: z.array(z.string()),
    vestingSchedule: z.array(z.string()),
    fees: z.array(z.string()),
  }),
  init: z.boolean(),
  logo: z.string(),
});
