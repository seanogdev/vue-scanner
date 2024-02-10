import { isTemplateNode, parse, transform } from '@vue/compiler-dom';
import { getNodeInstance } from './getNodeInstance.js';
import { readFile } from 'fs/promises';

const componentMetrics = new Map();

export async function extractMetrics(path: string) {
  const contents = await readFile(path, 'utf-8');
  const ast = parse(contents, { comments: true });

  transform(ast, {
    nodeTransforms: [
      (node) => {
        if (!isTemplateNode(node)) {
          return;
        }

        getNodeInstance({
          node,
          path,
          componentMetrics,
        });
      },
    ],
  });
  console.log('componentMetrics:', componentMetrics);
}
