import { z } from 'zod';

export const SystemMetadataResponseSchema = z.object({
  data: z.object({
    poolTypes: z.array(z.string()),
    chains: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        blockExplorers: z
          .object({
            default: z.object({
              name: z.string(),
              url: z.string(),
              apiUrl: z.string().optional(),
            }),
          })
          .optional(),
      }),
    ),
    factories: z.array(
      z.object({
        chainId: z.string(),
        address: z.string(),
        name: z.string().optional(),
        ui_name: z.string().optional(),
        logo: z.string().optional(),
      }),
    ),
  }),
});

export type SystemMetadataResponse = z.infer<typeof SystemMetadataResponseSchema>;
