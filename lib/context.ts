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

const componentMetrics = new Map();

function resolveConfig(config: Partial<VueScannerConfig>) {
  return { ...defaultConfig, ...config };
}

export function getContext(config: Partial<VueScannerConfig>) {
  return {
    componentMetrics,
    config: resolveConfig(config),
  };
}
