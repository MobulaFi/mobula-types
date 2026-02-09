import { z } from 'zod';

export const logoUrlSchema = z.object({
  assetName: z.string(),
  logoUrl: z.string(),
});
