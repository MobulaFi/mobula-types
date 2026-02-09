import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { extractAllZodKeys } from './zodUtils.ts';

describe('extractAllZodKeys', () => {
  it('should extract keys from simple schema', () => {
    const simpleSchema = z.object({
      id: z.number(),
      name: z.string(),
      email: z.string().email(),
      isActive: z.boolean(),
      tags: z.array(z.string()),
      metadata: z.record(z.string()),
    });

    const simpleKeys = extractAllZodKeys(simpleSchema);
    expect(simpleKeys).toEqual(['id', 'name', 'email', 'isActive', 'tags', 'metadata']);
  });

  it('should extract top-level keys only when includeNested is false', () => {
    const nestedSchema = z.object({
      user: z.object({
        id: z.number(),
        profile: z.object({
          firstName: z.string(),
          lastName: z.string(),
        }),
      }),
      posts: z.array(
        z.object({
          id: z.number(),
          title: z.string(),
        }),
      ),
    });

    const nestedKeysNoInclude = extractAllZodKeys(nestedSchema, false);
    expect(nestedKeysNoInclude).toEqual(['user', 'posts']);
  });

  it('should extract all nested keys when includeNested is true', () => {
    const nestedSchema = z.object({
      user: z.object({
        id: z.number(),
        profile: z.object({
          firstName: z.string(),
          lastName: z.string(),
        }),
      }),
      posts: z.array(
        z.object({
          id: z.number(),
          title: z.string(),
        }),
      ),
    });

    const nestedKeysWithInclude = extractAllZodKeys(nestedSchema, true);
    expect(nestedKeysWithInclude).toEqual([
      'user',
      'user.id',
      'user.profile',
      'user.profile.firstName',
      'user.profile.lastName',
      'posts',
    ]);
  });

  it('should extract deeply nested keys', () => {
    const deepSchema = z.object({
      company: z.object({
        name: z.string(),
        address: z.object({
          street: z.string(),
          city: z.string(),
          coordinates: z.object({
            lat: z.number(),
            lng: z.number(),
          }),
        }),
        employees: z.array(
          z.object({
            id: z.number(),
            department: z.object({
              name: z.string(),
              manager: z.object({
                id: z.number(),
                name: z.string(),
              }),
            }),
          }),
        ),
      }),
    });

    const deepKeys = extractAllZodKeys(deepSchema, true);
    expect(deepKeys).toContain('company');
    expect(deepKeys).toContain('company.name');
    expect(deepKeys).toContain('company.address');
    expect(deepKeys).toContain('company.address.street');
    expect(deepKeys).toContain('company.address.city');
    expect(deepKeys).toContain('company.address.coordinates');
    expect(deepKeys).toContain('company.address.coordinates.lat');
    expect(deepKeys).toContain('company.address.coordinates.lng');
    expect(deepKeys).toContain('company.employees');
  });

  it('should handle empty schema', () => {
    const emptySchema = z.object({});
    const emptyKeys = extractAllZodKeys(emptySchema);
    expect(emptyKeys).toEqual([]);
  });
});
