import { glob } from 'glob';
import { resolveConfig } from './config.js';
import { extract } from './extract.js';
import { VueScannerConfig } from './types.js';

export async function VueScanner(config: VueScannerConfig) {
  const resolvedConfig = resolveConfig(config);

  const filePaths = await glob(`${resolvedConfig.directory}/**/*.vue`, {
    windowsPathsNoEscape: true,
  });

  const extractMetricsPromises = filePaths.map((path) => extract(path, resolvedConfig));

  return Promise.all(extractMetricsPromises);
}
