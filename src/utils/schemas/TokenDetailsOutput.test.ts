import { describe, expect, it } from 'vitest';
import { TokenDetailsOutput } from './TokenDetailsOutput.ts';

// Test cases for totalFeesPaidNativeRaw coercion in TokenDetailsOutput
describe.skip('TokenDetailsOutput totalFeesPaidNativeRaw Coercion', () => {
  it.skip('should coerce number to string for totalFeesPaidNativeRaw', () => {
    // Create minimal valid data with number for totalFeesPaidNativeRaw
    const dataWithNumber = {
      address: '0x1234567890123456789012345678901234567890',
      chainId: 1,
      symbol: 'TEST',
      name: 'Test Token',
      decimals: 18,
      priceTokenString: '1.0',
      approximateReserveTokenRaw: '1000000000000000000',
      totalFeesPaidNativeRaw: 123456789, // number instead of string
      bondedAt: null,
      createdAt: new Date(),
      latestTradeDate: null,
      socials: {
        twitter: null,
        website: null,
        telegram: null,
        others: null,
      },
      security: null,
    };

    // Validate against TokenDetailsOutput schema
    const validationResult = TokenDetailsOutput.safeParse(dataWithNumber);

    // Log validation errors if they exist
    if (!validationResult.success) {
      console.log('TokenDetailsOutput validation errors:', JSON.stringify(validationResult.error.issues, null, 2));
    }

    // The validation should succeed
    expect(validationResult.success).toBe(true);
    // The value should be coerced to string
    expect(validationResult.data?.totalFeesPaidNativeRaw).toBe('123456789');
  });

  it.skip('should accept string for totalFeesPaidNativeRaw', () => {
    const dataWithString = {
      address: '0x1234567890123456789012345678901234567890',
      chainId: 1,
      symbol: 'TEST',
      name: 'Test Token',
      decimals: 18,
      priceTokenString: '1.0',
      approximateReserveTokenRaw: '1000000000000000000',
      totalFeesPaidNativeRaw: '987654321', // string
      bondedAt: null,
      createdAt: new Date(),
      latestTradeDate: null,
      socials: {
        twitter: null,
        website: null,
        telegram: null,
        others: null,
      },
      security: null,
    };

    // Validate against TokenDetailsOutput schema
    const validationResult = TokenDetailsOutput.safeParse(dataWithString);

    // The validation should succeed
    expect(validationResult.success).toBe(true);
    // The value should remain as string
    expect(validationResult.data?.totalFeesPaidNativeRaw).toBe('987654321');
  });

  it.skip('should accept bigint for totalFeesPaidNativeRaw', () => {
    const dataWithBigInt = {
      address: '0x1234567890123456789012345678901234567890',
      chainId: 1,
      symbol: 'TEST',
      name: 'Test Token',
      decimals: 18,
      priceTokenString: '1.0',
      approximateReserveTokenRaw: '1000000000000000000',
      totalFeesPaidNativeRaw: 999999999999999999n, // bigint
      bondedAt: null,
      createdAt: new Date(),
      latestTradeDate: null,
      socials: {
        twitter: null,
        website: null,
        telegram: null,
        others: null,
      },
      security: null,
    };

    // Validate against TokenDetailsOutput schema
    const validationResult = TokenDetailsOutput.safeParse(dataWithBigInt);

    // The validation should succeed
    expect(validationResult.success).toBe(true);
    // The value should be coerced to string
    expect(validationResult.data?.totalFeesPaidNativeRaw).toBe('999999999999999999');
  });

  it.skip('should use default value when totalFeesPaidNativeRaw is missing', () => {
    const dataWithoutField = {
      address: '0x1234567890123456789012345678901234567890',
      chainId: 1,
      symbol: 'TEST',
      name: 'Test Token',
      decimals: 18,
      priceTokenString: '1.0',
      approximateReserveTokenRaw: '1000000000000000000',
      bondedAt: null,
      createdAt: new Date(),
      latestTradeDate: null,
      socials: {
        twitter: null,
        website: null,
        telegram: null,
        others: null,
      },
      security: null,
    };

    // Validate against TokenDetailsOutput schema
    const validationResult = TokenDetailsOutput.safeParse(dataWithoutField);

    // The validation should succeed
    expect(validationResult.success).toBe(true);
    // The value should use default
    expect(validationResult.data?.totalFeesPaidNativeRaw).toBe('0');
  });

  it.skip('should handle zero as number correctly', () => {
    const dataWithZero = {
      address: '0x1234567890123456789012345678901234567890',
      chainId: 1,
      symbol: 'TEST',
      name: 'Test Token',
      decimals: 18,
      priceTokenString: '1.0',
      approximateReserveTokenRaw: '1000000000000000000',
      totalFeesPaidNativeRaw: 0, // number zero
      bondedAt: null,
      createdAt: new Date(),
      latestTradeDate: null,
      socials: {
        twitter: null,
        website: null,
        telegram: null,
        others: null,
      },
      security: null,
    };

    // Validate against TokenDetailsOutput schema
    const validationResult = TokenDetailsOutput.safeParse(dataWithZero);

    // The validation should succeed
    expect(validationResult.success).toBe(true);
    // The value should be coerced to string '0'
    expect(validationResult.data?.totalFeesPaidNativeRaw).toBe('0');
  });
});
