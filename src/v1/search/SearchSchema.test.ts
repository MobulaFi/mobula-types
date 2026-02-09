import { describe, expect, it } from 'vitest';
import { SearchParamsSchema } from './SearchSchema.ts';

describe.skip('SearchParamsSchema - blockchains filter parsing', () => {
  it.skip('accepts numeric chain ID (e.g., "56" for BSC)', async () => {
    const result = await SearchParamsSchema.parseAsync({
      input: 'test',
      filters: JSON.stringify({ blockchains: '56' }),
    });

    expect(result.filters.blockchains).toEqual(['evm:56']);
  });

  it.skip('accepts chain name (e.g., "BNB Smart Chain (BEP20)")', async () => {
    const result = await SearchParamsSchema.parseAsync({
      input: 'test',
      filters: JSON.stringify({ blockchains: 'BNB Smart Chain (BEP20)' }),
    });

    expect(result.filters.blockchains).toEqual(['evm:56']);
  });

  it.skip('accepts full chain ID format (e.g., "evm:56")', async () => {
    const result = await SearchParamsSchema.parseAsync({
      input: 'test',
      filters: JSON.stringify({ blockchains: 'evm:56' }),
    });

    expect(result.filters.blockchains).toEqual(['evm:56']);
  });

  it.skip('accepts Solana full chain ID format (e.g., "solana:solana")', async () => {
    const result = await SearchParamsSchema.parseAsync({
      input: 'test',
      filters: JSON.stringify({ blockchains: 'solana:solana' }),
    });

    expect(result.filters.blockchains).toEqual(['solana:solana']);
  });

  it.skip('accepts multiple chains with mixed formats', async () => {
    const result = await SearchParamsSchema.parseAsync({
      input: 'test',
      filters: JSON.stringify({ blockchains: '56,evm:1,solana:solana,Ethereum' }),
    });

    expect(result.filters.blockchains).toEqual(['evm:56', 'evm:1', 'solana:solana', 'evm:1']);
  });

  it.skip('trims whitespace around chain identifiers', async () => {
    const result = await SearchParamsSchema.parseAsync({
      input: 'test',
      filters: JSON.stringify({ blockchains: ' 56 , evm:1 , solana:solana ' }),
    });

    expect(result.filters.blockchains).toEqual(['evm:56', 'evm:1', 'solana:solana']);
  });

  it.skip('accepts Polygon with numeric ID', async () => {
    const result = await SearchParamsSchema.parseAsync({
      input: 'test',
      filters: JSON.stringify({ blockchains: '137' }),
    });

    expect(result.filters.blockchains).toEqual(['evm:137']);
  });

  it.skip('accepts Polygon with full format', async () => {
    const result = await SearchParamsSchema.parseAsync({
      input: 'test',
      filters: JSON.stringify({ blockchains: 'evm:137' }),
    });

    expect(result.filters.blockchains).toEqual(['evm:137']);
  });

  it.skip('returns empty array when no blockchains filter provided', async () => {
    const result = await SearchParamsSchema.parseAsync({
      input: 'test',
      filters: JSON.stringify({}),
    });

    expect(result.filters.blockchains).toEqual([]);
  });

  it.skip('returns empty array when filters string is empty', async () => {
    const result = await SearchParamsSchema.parseAsync({
      input: 'test',
    });

    expect(result.filters.blockchains).toEqual([]);
  });
});

describe.skip('SearchParamsSchema - other filters', () => {
  it.skip('parses factory filter correctly', async () => {
    const result = await SearchParamsSchema.parseAsync({
      input: 'test',
      filters: JSON.stringify({ factory: 'uniswap-v2' }),
    });

    expect(result.filters.factory).toBe('uniswap-v2');
  });

  it.skip('parses poolTypes filter correctly', async () => {
    const result = await SearchParamsSchema.parseAsync({
      input: 'test',
      filters: JSON.stringify({ poolTypes: 'v2,v3' }),
    });

    expect(result.filters.poolTypes).toEqual(['v2', 'v3']);
  });

  it.skip('parses excludeBonded filter correctly', async () => {
    const result = await SearchParamsSchema.parseAsync({
      input: 'test',
      filters: JSON.stringify({ excludeBonded: true }),
    });

    expect(result.filters.excludeBonded).toBe(true);
  });

  it.skip('parses bondedOnly filter correctly', async () => {
    const result = await SearchParamsSchema.parseAsync({
      input: 'test',
      filters: JSON.stringify({ bondedOnly: true }),
    });

    expect(result.filters.bondedOnly).toBe(true);
  });

  it.skip('parses all filters together', async () => {
    const result = await SearchParamsSchema.parseAsync({
      input: 'test',
      filters: JSON.stringify({
        blockchains: 'evm:56,1',
        factory: 'pancakeswap',
        poolTypes: 'v2,v3',
        excludeBonded: true,
      }),
    });

    expect(result.filters.blockchains).toEqual(['evm:56', 'evm:1']);
    expect(result.filters.factory).toBe('pancakeswap');
    expect(result.filters.poolTypes).toEqual(['v2', 'v3']);
    expect(result.filters.excludeBonded).toBe(true);
  });
});
