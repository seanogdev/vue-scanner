import { glob } from 'glob';
import { getContext } from './context.js';
import { extract } from './extract.js';
import { VueScannerConfig } from './types.js';

export async function VueScanner(config: Partial<VueScannerConfig>) {
  const context = getContext(config);
  const filePaths = await glob(context.glob, { windowsPathsNoEscape: true });

  const promises = filePaths.map(extract(context));
  await Promise.all(promises);

  return Object.fromEntries(context.componentMetrics);
}
