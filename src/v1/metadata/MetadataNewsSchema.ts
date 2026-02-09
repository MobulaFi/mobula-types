import { z } from 'zod';

export const MetadataNewsParamsSchema = z.object({
  symbols: z.string().transform((val, ctx) => {
    const values = val.split(',');
    if (values.length > 5) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Too many symbols',
      });
    }
    return values;
  }),
});

export type MetadataNewsParams = z.input<typeof MetadataNewsParamsSchema>;

export const CryptoNewsDataSchema = z.array(
  z.object({
    news_url: z.string(),
    image_url: z.string(),
    title: z.string(),
    text: z.string(),
    source_name: z.string(),
    date: z.string(),
    topics: z.array(z.string()),
    sentiment: z.string(),
    type: z.string(),
    tickers: z.array(z.string()),
  }),
);

export const MetadataNewsResponseSchema = z.object({
  data: z.array(
    z.object({
      news_url: z.string(),
      image_url: z.string(),
      title: z.string(),
      text: z.string(),
      source_name: z.string(),
      date: z.string(),
      topics: z.array(z.string()),
      sentiment: z.string(),
      type: z.string(),
      tickers: z.array(z.string()),
    }),
  ),
});

export type MetadataNewsResponse = z.infer<typeof MetadataNewsResponseSchema>;
