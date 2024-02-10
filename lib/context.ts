import { ComponentMetrics, VueScannerConfig } from './types.js';

export const defaultConfig: VueScannerConfig = {
  directory: './src',
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

export function getContext(config: Partial<VueScannerConfig>) {
  const componentMetrics: ComponentMetrics = new Map();
  const resolvedConfig = resolveConfig(config);

  return {
    glob: `${config.directory}/**/*.vue`,
    componentMetrics,
    config: resolvedConfig,
  };
}
