import {
  NodeTypes,
  type ElementNode,
  ElementTypes,
  NodeTransform,
  RootNode,
  TemplateChildNode,
  TransformContext,
} from '@vue/compiler-dom';
import { ComponentMetric, VueScannerContext } from '../types.js';
import { getPropInfo } from './props.js';
import { getSlotInfo } from './slots.js';

export function extractNodeStats(path: string, context: VueScannerContext): NodeTransform {
  /**
   * Get the local metric for the component
   * Either returns the existing metric or a new metric with the default values
   */
  function getComponentMetric(node: ElementNode): ComponentMetric {
    return (
      context.componentMetrics.get(node.tag) ?? {
        instanceCount: 0,
        instances: [],
        name: node.tag,
      }
    );
  }

  /**
   * Generate the location of the component instance
   */
  function generateInstanceLocation(node: ElementNode) {
    return {
      file: path,
      start: {
        line: node.loc.start.line,
        column: node.loc.start.column,
      },
    };
  }

  /**
   * Extract the component instance stats from the node
   */
  return (node: RootNode | TemplateChildNode) => {
    if (node.type !== NodeTypes.ELEMENT || ![ElementTypes.ELEMENT, ElementTypes.COMPONENT].includes(node.tagType)) {
      return;
    }
    const metric = getComponentMetric(node);

    metric.instanceCount += 1;

    metric.instances.push({
      location: generateInstanceLocation(node),
      props: getPropInfo(node, context),
      slots: getSlotInfo(node, context),
    });

    context.componentMetrics.set(node.tag, metric);
  };
}
