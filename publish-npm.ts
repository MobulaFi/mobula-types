#!/usr/bin/env bun

/**
 * Publish script for @mobula_labs/types
 *
 * This script temporarily renames the package from @mobula/types (workspace name)
 * to @mobula_labs/types (npm published name), publishes, then reverts.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { $ } from 'bun';

const WORKSPACE_NAME = '@mobula/types';
const NPM_NAME = '@mobula_labs/types';
const PKG_PATH = './package.json';

async function main() {
  console.log('📦 Publishing to npm as', NPM_NAME);

  // Read current package.json
  const pkgContent = readFileSync(PKG_PATH, 'utf-8');
  const pkg = JSON.parse(pkgContent);

  if (pkg.name !== WORKSPACE_NAME) {
    console.error(`❌ Expected package name ${WORKSPACE_NAME}, got ${pkg.name}`);
    process.exit(1);
  }

  try {
    // Temporarily rename for npm publish
    console.log('🔄 Renaming package to', NPM_NAME);
    pkg.name = NPM_NAME;
    writeFileSync(PKG_PATH, `${JSON.stringify(pkg, null, 2)}\n`);

    // Build
    console.log('🔨 Building...');
    await $`bun run build`;

    // Publish
    console.log('🚀 Publishing to npm...');
    await $`bunx npm publish --access public`;

    console.log('✅ Published successfully!');
  } catch (error) {
    console.error('❌ Publish failed:', error);
    process.exit(1);
  } finally {
    // Always revert the name back
    console.log('🔄 Reverting package name to', WORKSPACE_NAME);
    pkg.name = WORKSPACE_NAME;
    writeFileSync(PKG_PATH, `${JSON.stringify(pkg, null, 2)}\n`);
  }
}

main();
