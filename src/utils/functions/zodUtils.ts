import { z } from 'zod';

// Type utilities for extracting Zod schema keys with perfect type safety
type ExtractShape<T> = T extends z.ZodObject<infer S> ? S : never;
type ZodRawShape = Record<string, z.ZodTypeAny>;

// Advanced type-safe function to extract keys from Zod schema
export function extractZodSchemaKeys<TSchema extends z.ZodObject<ZodRawShape>, TShape = ExtractShape<TSchema>>(
  schema: TSchema,
): readonly (keyof TShape)[] {
  // Type assertion with runtime validation
  const schemaDef = schema._def;

  if (
    !schemaDef ||
    typeof schemaDef !== 'object' ||
    !('typeName' in schemaDef) ||
    schemaDef.typeName !== 'ZodObject' ||
    !('shape' in schemaDef)
  ) {
    throw new Error('Provided schema is not a valid ZodObject schema');
  }

  const shapeFn = schemaDef.shape;
  if (typeof shapeFn !== 'function') {
    throw new Error('Schema shape is not a function');
  }

  const shape = shapeFn();
  if (!shape || typeof shape !== 'object') {
    throw new Error('Schema shape function did not return a valid object');
  }

  // Extract keys with type safety
  const keys = Object.keys(shape) as unknown as readonly (keyof TShape)[];

  return keys;
}

// Alternative implementation using conditional types for more complex schemas
export function getZodKeysAdvanced<TSchema extends z.ZodTypeAny>(schema: TSchema): readonly string[] {
  const schemaDef = schema._def;

  if (
    !schemaDef ||
    typeof schemaDef !== 'object' ||
    !('typeName' in schemaDef) ||
    schemaDef.typeName !== 'ZodObject' ||
    !('shape' in schemaDef)
  ) {
    return [] as const;
  }

  const shapeFn = schemaDef.shape;
  if (typeof shapeFn !== 'function') {
    return [] as const;
  }

  const shape = shapeFn();
  if (!shape || typeof shape !== 'object') {
    return [] as const;
  }

  return Object.keys(shape) as readonly string[];
}

export type NestedObjectKeys<T> = T extends Record<string, unknown>
  ? {
      [K in keyof T]: T[K] extends Record<string, unknown>
        ? `${string & K}.${string & NestedObjectKeys<T[K]>}`
        : string & K;
    }[keyof T]
  : never;

export function extractAllZodKeys<TSchema extends z.ZodObject<ZodRawShape>>(
  schema: TSchema,
  includeNested: boolean = false,
): readonly string[] {
  const schemaDef = schema._def;

  if (
    !schemaDef ||
    typeof schemaDef !== 'object' ||
    !('typeName' in schemaDef) ||
    schemaDef.typeName !== 'ZodObject' ||
    !('shape' in schemaDef)
  ) {
    return [] as const;
  }

  const shapeFn = schemaDef.shape;
  if (typeof shapeFn !== 'function') {
    return [] as const;
  }

  const shape = shapeFn();
  if (!shape || typeof shape !== 'object') {
    return [] as const;
  }

  const keys: string[] = [];

  function extractKeys(obj: Record<string, z.ZodTypeAny>, prefix: string = ''): void {
    for (const [key, zodType] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}.${key}` : key;

      keys.push(fullKey);

      if (includeNested && zodType && typeof zodType === 'object' && '_def' in zodType) {
        const def = zodType._def;
        if (
          def &&
          typeof def === 'object' &&
          'typeName' in def &&
          def.typeName === 'ZodObject' &&
          'shape' in def &&
          typeof def.shape === 'function'
        ) {
          const nestedShape = def.shape();
          if (nestedShape && typeof nestedShape === 'object') {
            extractKeys(nestedShape, fullKey);
          }
        }
      }
    }
  }

  extractKeys(shape);
  return keys as readonly string[];
}

export const getZodDefaultValue = (zodType: unknown): unknown => {
  if (!zodType || typeof zodType !== 'object' || !('_def' in zodType) || !zodType._def) {
    return 0;
  }

  const def = zodType._def as Record<string, unknown>;

  if (def['typeName'] === 'ZodDefault') {
    const defaultValue = def['defaultValue'];
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  }

  if (def['typeName'] === 'ZodNullable') {
    return null;
  }

  if (def['typeName'] === 'ZodOptional') {
    return getZodDefaultValue(def['innerType']);
  }

  if (def['typeName'] === 'ZodEffects') {
    return getZodDefaultValue(def['schema']);
  }

  switch (def['typeName']) {
    case 'ZodString':
      return '';
    case 'ZodNumber':
      return 0;
    case 'ZodBoolean':
      return false;
    case 'ZodDate':
      return null;
    case 'ZodArray':
      return [];
    case 'ZodObject':
      return {};
    default:
      return 0;
  }
};

export const generateDefaultFromSchema = <T>(schema: unknown): T => {
  const result: Record<string, unknown> = {};

  if (
    schema &&
    typeof schema === 'object' &&
    '_def' in schema &&
    schema._def &&
    typeof schema._def === 'object' &&
    'typeName' in schema._def &&
    schema._def.typeName === 'ZodObject' &&
    'shape' in schema._def
  ) {
    const shapeFn = schema._def.shape as () => Record<string, unknown>;
    const shape = shapeFn();

    for (const [key, zodType] of Object.entries(shape)) {
      result[key] = getZodDefaultValue(zodType);
    }
  }

  return result as T;
};

export const getZodSchemaKeys = (schema: unknown): string[] => {
  if (
    schema &&
    typeof schema === 'object' &&
    '_def' in schema &&
    schema._def &&
    typeof schema._def === 'object' &&
    'typeName' in schema._def &&
    schema._def.typeName === 'ZodObject' &&
    'shape' in schema._def
  ) {
    const shapeFn = schema._def.shape as () => Record<string, unknown>;
    const shape = shapeFn();
    return Object.keys(shape);
  }

  return [];
};

export const generateMinimalistMapping = <T>(schema: unknown, data: unknown[]): T => {
  const keys = getZodSchemaKeys(schema);
  const result: Record<string, unknown> = {};

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key) {
      const value = data[i] ?? null;
      result[key] = value;
    }
  }

  return result as T;
};

export const generateAutomaticMinimalistParser = <T extends z.ZodTypeAny>(schema: T, data: unknown[]): z.infer<T> => {
  const keys = getZodSchemaKeys(schema);
  const result: Record<string, unknown> = {};

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key) {
      const value = data[i];

      if (value === null || value === undefined) {
        result[key] = null;
      } else if (typeof value === 'string') {
        if (key.includes('date') || key.includes('created') || key.includes('bonded_at')) {
          result[key] = new Date(value);
        } else {
          result[key] = value;
        }
      } else if (typeof value === 'number') {
        result[key] = value;
      } else if (typeof value === 'boolean') {
        result[key] = value;
      } else if (Array.isArray(value)) {
        result[key] = value;
      } else {
        result[key] = value;
      }
    }
  }

  return result as z.infer<T>;
};
