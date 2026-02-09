import { z } from 'zod';

/**
 * Platform metadata for trading dashboards (Photon, BullX, Maestro, etc.)
 * Used across trade/swap endpoints to provide full platform information.
 */
export const PlatformMetadataOutput = z.object({
  id: z.string(),
  name: z.string(),
  logo: z.string().nullable(),
});

export type PlatformMetadataOutputType = z.infer<typeof PlatformMetadataOutput>;
