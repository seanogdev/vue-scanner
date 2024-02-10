import { glob } from 'glob';
import { getContext } from './context.js';
import { extract } from './extract.js';
import { VueScannerConfig } from './types.js';

export async function VueScanner(config: VueScannerConfig) {
  const context = getContext(config);
  const scannerGlob = `${context.config.directory}/**/*.vue`;
  const filePaths = await glob(scannerGlob, { windowsPathsNoEscape: true });
  const promises = filePaths.map(extract(context));
  await Promise.all(promises);

  return context.componentMetrics;
}
