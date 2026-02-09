/**
 * Transforms a filter value into a Prisma-compatible operator object
 *
 * Supports automatic transformation of:
 * - NOT operations: "!null", "not null", "!value" → {not: ...}
 * - Numeric comparisons: ">1000", ">=1000", "<1000", "<=1000" → {gt: 1000}, {gte: 1000}, etc.
 * - String patterns: "*text*", "text*", "*text" → {contains: "text"}, {startsWith: "text"}, {endsWith: "text"}
 * - Arrays: ["val1", "val2"] → {in: ["val1", "val2"]}
 * - Auto-number detection: String numbers converted to actual numbers
 * - Pass-through: Existing operator objects preserved
 *
 * @param value - The value to transform
 * @returns A Prisma-compatible operator object
 *
 * @example
 * transformFilterValue(">1000") // { gt: 1000 }
 * transformFilterValue("!null") // { not: null }
 * transformFilterValue("*test*") // { contains: "test" }
 * transformFilterValue(["a", "b"]) // { in: ["a", "b"] }
 * transformFilterValue({ equals: "test" }) // { equals: "test" } (pass-through)
 */
export default function transformFilterValue(value: unknown): Record<string, unknown> {
  // If already an operator object with known operators, pass through
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    const obj = value as Record<string, unknown>;
    const knownOperators = [
      'equals',
      'not',
      'in',
      'notIn',
      'lt',
      'lte',
      'gt',
      'gte',
      'contains',
      'startsWith',
      'endsWith',
      'mode',
      'has',
      'hasSome',
      'hasEvery',
      'isEmpty',
      'isSet',
    ];
    if (Object.keys(obj).some((key) => knownOperators.includes(key))) {
      return obj;
    }
  }

  // Handle arrays
  if (Array.isArray(value)) {
    return { in: value };
  }

  // Handle string patterns with shortcuts
  if (typeof value === 'string') {
    const trimmedValue = value.trim();

    // Handle "not null" patterns
    if (trimmedValue.toLowerCase() === '!null' || trimmedValue.toLowerCase() === 'not null') {
      return { not: null };
    }

    // Handle "null" pattern
    if (trimmedValue.toLowerCase() === 'null') {
      return { equals: null };
    }

    // Handle negation patterns "!value"
    if (trimmedValue.startsWith('!') && trimmedValue.length > 1) {
      const negatedValue = trimmedValue.slice(1);
      // Try to parse as number if possible
      const numValue = Number(negatedValue);
      return { not: Number.isNaN(numValue) ? negatedValue : numValue };
    }

    // Handle comparison operators
    if (trimmedValue.startsWith('>=')) {
      const numValue = Number(trimmedValue.slice(2));
      return Number.isNaN(numValue) ? { gte: trimmedValue.slice(2) } : { gte: numValue };
    }
    if (trimmedValue.startsWith('<=')) {
      const numValue = Number(trimmedValue.slice(2));
      return Number.isNaN(numValue) ? { lte: trimmedValue.slice(2) } : { lte: numValue };
    }
    if (trimmedValue.startsWith('>')) {
      const numValue = Number(trimmedValue.slice(1));
      return Number.isNaN(numValue) ? { gt: trimmedValue.slice(1) } : { gt: numValue };
    }
    if (trimmedValue.startsWith('<')) {
      const numValue = Number(trimmedValue.slice(1));
      return Number.isNaN(numValue) ? { lt: trimmedValue.slice(1) } : { lt: numValue };
    }

    // Handle contains patterns
    if (trimmedValue.startsWith('*') && trimmedValue.endsWith('*') && trimmedValue.length > 2) {
      return { contains: trimmedValue.slice(1, -1) };
    }
    if (trimmedValue.startsWith('*') && trimmedValue.length > 1) {
      return { endsWith: trimmedValue.slice(1) };
    }
    if (trimmedValue.endsWith('*') && trimmedValue.length > 1) {
      return { startsWith: trimmedValue.slice(0, -1) };
    }

    // Auto-detect numbers - convert string numbers to actual numbers
    if (!Number.isNaN(Number(trimmedValue)) && trimmedValue !== '') {
      return { equals: Number(trimmedValue) };
    }
  }

  // Handle null explicitly
  if (value === null) {
    return { equals: null };
  }

  // Handle undefined
  if (value === undefined) {
    return { equals: undefined };
  }

  // Default: simple equals
  return { equals: value };
}
