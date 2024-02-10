import path from 'path';
import pc from 'picocolors';
const { writeFile } = await import('fs/promises');
import { glob } from 'glob';
import { getContext } from './context.js';
import { extract } from './extract.js';
import { ComponentMetric, VueScannerConfig, VueScannerContext } from './types.js';

async function writeToFile(context: VueScannerContext) {
  const filePath = path.resolve(context.config.output);
  console.log(pc.blue('Writing to ' + filePath));

  const componentMetricsObject = Object.fromEntries(context.componentMetrics);

  await writeFile(filePath, JSON.stringify(componentMetricsObject, null, 2));
}

export async function scan(directory: string, config: Partial<VueScannerConfig>) {
  const context = getContext(directory, config);
  const filePaths = await glob(`${directory}/**/*.vue`, { windowsPathsNoEscape: true });

  const promises = filePaths.map(extract(context));
  await Promise.all(promises);

  if (context.config.output) {
    writeToFile(context);
  } else {
    return Object.fromEntries(context.componentMetrics);
  }
}
