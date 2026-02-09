import { z } from 'zod';
import { WalletDeployerQuery, walletDeployerOutputSchema } from '../../utils/schemas/WalletDeployerSchema.ts';

export const WalletV1DeployerParamsSchema = WalletDeployerQuery;
export type WalletV1DeployerParams = z.input<typeof WalletV1DeployerParamsSchema>;

export const WalletV1DeployerResponseSchema = walletDeployerOutputSchema;
export type WalletV1DeployerResponse = z.infer<typeof WalletV1DeployerResponseSchema>;
