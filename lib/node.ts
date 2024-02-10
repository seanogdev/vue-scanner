import {
  NodeTypes,
  type ElementNode,
  ElementTypes,
  NodeTransform,
  RootNode,
  TemplateChildNode,
} from '@vue/compiler-dom';
import { ComponentInstance, ComponentMetric, VueScannerContext } from './types.js';
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
    if (
      node.type !== NodeTypes.ELEMENT ||
      ![ElementTypes.ELEMENT, ElementTypes.COMPONENT].includes(node.tagType) ||
      ['template', 'script', 'style'].includes(node.tag)
    ) {
      return;
    }

    const metric = getComponentMetric(node);

    metric.instanceCount += 1;

    const instance: ComponentInstance = {};

    if (context.config.collect.props) {
      instance.props = getPropInfo(node);
    }

    if (context.config.collect.slots) {
      instance.slots = getSlotInfo(node, context);
    }

    if (context.config.collect.location) {
      instance.location = generateInstanceLocation(node);
    }

    metric.instances.push(instance);

    context.componentMetrics.set(node.tag, metric);
  };
}
