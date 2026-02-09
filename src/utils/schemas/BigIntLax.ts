import { z } from 'zod';

/**
 * Convert scientific notation string to integer string
 * e.g., "1.17e+25" -> "11700000000000000000000000"
 */
function scientificToInteger(value: string): string {
  // Check if it's in scientific notation
  const match = value.match(/^(-?)(\d+)\.?(\d*)e([+-]?)(\d+)$/i);
  if (!match) {
    return value;
  }

  try {
    const [, sign, integerPart, decimalPart, expSign, exponentStr] = match;
    const exponent = Number.parseInt(exponentStr!, 10);

    // If exponent is negative, result will be < 1, so we return 0
    if (expSign === '-') {
      return sign === '-' ? '-0' : '0';
    }

    // Combine integer and decimal parts
    const digits = integerPart! + (decimalPart || '');
    const decimalPosition = integerPart!.length;

    // Calculate new position after applying exponent
    const newLength = decimalPosition + exponent;

    if (newLength <= 0) {
      // Result is less than 1
      return sign === '-' ? '-0' : '0';
    }

    if (newLength >= digits.length) {
      // We need to add zeros at the end
      const zerosToAdd = newLength - digits.length;
      return sign + digits + '0'.repeat(zerosToAdd);
    }

    // We need to truncate decimal part (round down)
    return sign + digits.slice(0, newLength);
  } catch {
    return value;
  }
}

const BigIntLax = z.union([
  z.string().transform((v, ctx) => {
    let value: bigint;

    try {
      // Convert scientific notation to integer string if needed
      const normalizedValue = scientificToInteger(v);
      value = BigInt(normalizedValue);
    } catch (_) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Cannot parse to BigInt',
      });
      return z.NEVER;
    }

    return value;
  }),
  z.number().transform((v, ctx) => {
    if (!Number.isSafeInteger(v)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Number is not a safe integer',
      });
      return z.NEVER;
    }

    return BigInt(v);
  }),
  z.bigint(),
  z.null().transform(() => 0n),
]);

export type BigIntLax = z.infer<typeof BigIntLax>;

export default BigIntLax;
