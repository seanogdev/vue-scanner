import { readFile } from 'fs/promises';
import {
  ElementTypes,
  NodeTransform,
  NodeTypes,
  RootNode,
  TemplateChildNode,
  TransformContext,
  parse,
  transform,
} from '@vue/compiler-dom';
import { extractNodeStats } from './node.js';
import { VueScannerContext } from './types.js';

function removeSideEffectTags(node: RootNode | TemplateChildNode, context: TransformContext) {
  if (
    node.type === NodeTypes.ELEMENT &&
    node.tagType === ElementTypes.ELEMENT &&
    (node.tag === 'script' || node.tag === 'style')
  ) {
    context.removeNode();
  }
}

export function extract(context: VueScannerContext) {
  return async (path: string) => {
    const contents = await readFile(path, 'utf-8');

    const ast = parse(contents, context.config.compiler.parserOptions);

    transform(ast, {
      nodeTransforms: [removeSideEffectTags, extractNodeStats(path, context)],
    });
  };
}
