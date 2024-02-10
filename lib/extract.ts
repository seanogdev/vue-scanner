import { readFile } from 'fs/promises';
import { parse, transform } from '@vue/compiler-dom';
import { extractNodeStats } from './node/extract.js';
import { VueScannerContext } from './types.js';

export function extract(context: VueScannerContext) {
  return async (path: string) => {
    const contents = await readFile(path, 'utf-8');

    const ast = parse(contents, context.config.compiler.parserOptions);

    transform(ast, {
      nodeTransforms: [extractNodeStats(path, context)],
    });
  };
}
