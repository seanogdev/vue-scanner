import { VueScannerConfig } from './types.js';

const defaultConfig: VueScannerConfig = {
  directory: './src',
  collectSlotStats: true,
  compiler: {
    parserOptions: {
      comments: true,
    },
  },
};

export function resolveConfig(config: Partial<VueScannerConfig>) {
  return { ...defaultConfig, ...config };
}
