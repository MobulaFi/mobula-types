import { build } from 'bun';

// ESM build
await build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist/esm',
  target: 'node',
  format: 'esm',
  minify: false,
  sourcemap: 'external',
  external: ['zod', 'playwright', 'playwright-core', 'electron', 'chromium-bidi'],
});

// CJS build
await build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist/cjs',
  target: 'node',
  format: 'cjs',
  minify: false,
  sourcemap: 'external',
  external: ['zod', 'playwright', 'playwright-core', 'electron', 'chromium-bidi'],
  naming: {
    entry: '[name].cjs',
  },
});

const tscResult = await Bun.$`tsc -p tsconfig.build.json --skipLibCheck`.quiet();

if (tscResult.exitCode !== 0) {
  console.error('❌ TypeScript declaration generation failed!');
  console.error(tscResult.stderr.toString());
  process.exit(1);
}

console.log('✅ Build complete!');
