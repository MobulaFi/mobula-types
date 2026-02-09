import { z } from 'zod';
import {
  tokenPositionSchema,
  WalletDeployerQuery,
  walletDeployerOutputSchema,
} from '../../utils/schemas/WalletDeployerSchema.ts';

export type TokenPositionSchema = z.infer<typeof tokenPositionSchema>;
export const WalletV2DeployerParamsSchema = WalletDeployerQuery;
export type WalletV2DeployerParams = z.input<typeof WalletV2DeployerParamsSchema>;

export const WalletV2DeployerResponseSchema = walletDeployerOutputSchema;
export type WalletV2DeployerResponse = z.infer<typeof WalletV2DeployerResponseSchema>;
