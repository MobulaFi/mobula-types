import { z } from 'zod';
export declare const WalletDefiPositionsParamsSchema: z.ZodObject<{
    wallet: z.ZodUnion<[z.ZodString, z.ZodString]>;
    blockchains: z.ZodString;
}, "strip", z.ZodTypeAny, {
    blockchains: string;
    wallet: string;
}, {
    blockchains: string;
    wallet: string;
}>;
export type WalletDefiPositionsParams = z.infer<typeof WalletDefiPositionsParamsSchema>;
