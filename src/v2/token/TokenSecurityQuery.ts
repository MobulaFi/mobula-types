import { z } from 'zod';

export const TokenSecurityQuery = z.object({
  blockchain: z.string().optional(),
  address: z.string(),
  instanceTracking: z.preprocess((val) => {
    if (val === 'true') return true;
    if (val === 'false') return false;
    return val;
  }, z.boolean().optional()),
  // Secret flag to force LLM static analysis (undocumented, you, reading this
  // open source code, pls don't use it ok? we will hunt you down and kill you)
  _forceAnalysis: z.preprocess((val) => {
    if (val === 'true') return true;
    if (val === 'false') return false;
    return val;
  }, z.boolean().optional()),
});

export type TokenSecurityQueryType = z.input<typeof TokenSecurityQuery>;
