import { z } from 'zod';

/**
 * Wallet metadata from scraping_wallets table
 * Contains entity information about the wallet (e.g., CEX, LP, known project)
 */
export const WalletMetadataOutput = z.object({
  entityName: z.string().nullable(),
  entityLogo: z.string().nullable(),
  entityLabels: z.array(z.string()),
});

export type WalletMetadataOutput = z.infer<typeof WalletMetadataOutput>;
