import type { TemplateNode } from '@vue/compiler-dom';
import { ComponentInstance, ComponentMetrics } from './types.js';
import { getNodePropInfo } from './getNodePropInfo.js';
import { getNodeSlotInfo } from './getNodeSlotInfo.js';

type TransformNodeOptions = {
  node: TemplateNode;
  path: string;
  componentMetrics: ComponentMetrics;
};

const defaultMetric = {
  instanceCount: 0,
  instances: [],
};

export function getNodeInstance({ componentMetrics, path, node }: TransformNodeOptions) {
  const localMetric = componentMetrics.get(node.tag) ?? { ...defaultMetric, name: node.tag };

  const id = `${path}-${node.loc.start.line}-${node.loc.start.column}`;
  const props = getNodePropInfo(node);
  const slots = getNodeSlotInfo(node);

  const instance: ComponentInstance = {
    location: {
      id,
      path,
      start: {
        line: node.loc.start.line,
        column: node.loc.start.column,
      },
    },
    props,
    slots,
  };

  localMetric.instanceCount += 1;
  localMetric.instances.push(instance);

  componentMetrics.set(node.tag, localMetric);
}
