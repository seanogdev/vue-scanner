import { ElementTypes, NodeTypes, parse, transform } from '@vue/compiler-dom';
import { createNodeTransform } from './node/transform.js';
import { readFile } from 'fs/promises';
import { VueScannerConfig } from './types.js';
const componentMetrics = new Map();

export async function extract(path: string, config: VueScannerConfig) {
  const contents = await readFile(path, 'utf-8');

  const ast = parse(contents, config.compiler.parserOptions);

  transform(ast, {
    nodeTransforms: [createNodeTransform(componentMetrics, path, config)],
  });

  console.log('componentMetrics:', componentMetrics);
}
