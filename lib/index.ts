import { glob } from 'glob';
import { extractMetrics } from './extractMetrics.js';

type VueScannerOptions = {
  directory: string;
};

export async function VueScanner(options: VueScannerOptions) {
  const filePaths = await glob(`${options.directory}/**/*.vue`, {
    windowsPathsNoEscape: true,
  });

  const extractMetricsPromises = filePaths.map(extractMetrics);
  return Promise.all(extractMetricsPromises);
}
