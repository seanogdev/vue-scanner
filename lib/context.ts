import { ComponentMetrics, VueScannerConfig } from './types.js';

export const defaultDirectory = './';

export const defaultConfig: VueScannerConfig = {
  collect: {
    slots: true,
    props: true,
    location: true,
  },
  compiler: {
    parserOptions: {
      comments: true,
    },
  },
  output: './componentInfo.json',
};

// TODO: Merge these configs deeply
function resolveConfig(config: Partial<VueScannerConfig>) {
  return { ...defaultConfig, ...config };
}

export function getContext(directory: string = defaultDirectory, config: Partial<VueScannerConfig>) {
  const componentMetrics: ComponentMetrics = new Map();
  const resolvedConfig = resolveConfig(config);

  return {
    directory,
    componentMetrics,
    config: resolvedConfig,
  };
}
