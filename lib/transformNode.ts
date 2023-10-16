import type { RootNode, TemplateChildNode } from "@vue/compiler-dom";
import { ComponentInstance, ComponentMetric } from "../types.js";

type TransformNodeOptions = {
  node: RootNode | TemplateChildNode;
  path: string;
  componentMetric: ComponentMetric | undefined;
};

export function transformNode({
  componentMetric,
  path,
  node,
}: TransformNodeOptions) {
  if (node.type !== 1 || node.tagType !== 1) {
    return;
  }

  const localMetric = componentMetric ?? {
    name: node.tag,
    instanceCount: 0,
    instances: [],
  };

  const instance: ComponentInstance = {
    location: {
      path,
      start: {
        line: node.loc.start.line,
        column: node.loc.start.column,
      },
    },
    props: {},
  };

  localMetric.instanceCount += 1;
  localMetric.instances.push(instance);

  return localMetric;
}
