import { z } from 'zod';

/**
 * Supported fiat currencies for multi-currency price display
 */
export const SupportedCurrency = z.enum(['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'CAD', 'AUD', 'CNY', 'KRW', 'INR', 'BRL']);

export type SupportedCurrencyType = z.infer<typeof SupportedCurrency>;

/**
 * Default currency when none is specified
 */
export const DEFAULT_CURRENCY: SupportedCurrencyType = 'USD';

/**
 * Schema for currencies query parameter
 * Accepts comma-separated list of currencies, defaults to USD
 * Example: currencies=EUR,USD
 */
export const CurrenciesParamSchema = z
  .string()
  .optional()
  .default('USD')
  .transform((val) => {
    const currencies = val
      .split(',')
      .map((c) => c.trim().toUpperCase())
      .filter((c) => SupportedCurrency.safeParse(c).success) as SupportedCurrencyType[];
    // Always include USD as it's the base currency
    if (!currencies.includes('USD')) {
      currencies.unshift('USD');
    }
    return [...new Set(currencies)];
  });

export type CurrenciesParam = z.infer<typeof CurrenciesParamSchema>;

/**
 * All currencies except USD (currencies that need conversion)
 */
export const NON_USD_CURRENCIES = SupportedCurrency.options.filter((c) => c !== 'USD');
