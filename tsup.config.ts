import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['lib/index.ts', 'lib/cli.ts'],
  format: ['esm'],
  splitting: false,
  noExternal: ['@vue/compiler-dom', 'glob'],
  esbuildOptions(options) {
    // eslint-disable-next-line no-param-reassign
    options.external = ['picocolors'];
  },
});
