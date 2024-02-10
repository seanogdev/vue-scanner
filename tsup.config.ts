import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['lib/index.ts', 'lib/cli.ts'],
  format: ['esm'],
  splitting: false,
  noExternal: ['@vue/compiler-dom', 'glob'],
});
