import { z } from 'zod';

export const PausePulsePayloadSchema = z.object({
  action: z.enum(['pause', 'unpause']),
  views: z.array(z.string()).min(1),
});

export type PausePulsePayloadType = z.input<typeof PausePulsePayloadSchema>;
