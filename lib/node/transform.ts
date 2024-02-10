import {
  NodeTypes,
  type ElementNode,
  ElementTypes,
  NodeTransform,
  RootNode,
  TemplateChildNode,
  TransformContext,
} from '@vue/compiler-dom';
import { ComponentInstance, ComponentMetric, ComponentMetrics, VueScannerConfig } from '../types.js';
import { getPropInfo } from './props.js';
import { getSlotInfo } from './slots.js';

export function createNodeTransform(
  componentMetrics: ComponentMetrics,
  path: string,
  config: VueScannerConfig,
): NodeTransform {
  /**
   * Get the local metric for the component
   * Either returns the existing metric or a new metric with the default values
   */
  function getComponentMetric(node: ElementNode): ComponentMetric {
    return (
      componentMetrics.get(node.tag) ?? {
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
  function nodeTransform(node: RootNode | TemplateChildNode) {
    if (node.type !== NodeTypes.ELEMENT || ![ElementTypes.ELEMENT, ElementTypes.COMPONENT].includes(node.tagType)) {
      return;
    }
    const metric = getComponentMetric(node);

    metric.instanceCount += 1;

    metric.instances.push({
      location: generateInstanceLocation(node),
      props: getPropInfo(node, config),
      slots: getSlotInfo(node, config),
    });

    componentMetrics.set(node.tag, metric);
  }

  return nodeTransform;
}
