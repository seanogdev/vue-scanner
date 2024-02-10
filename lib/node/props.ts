import { ElementNode, NodeTypes, buildProps } from '@vue/compiler-dom';
import { VueScannerContext } from '../types.js';

/**
 * Get the props of an element node
 */
export function getPropInfo(node: ElementNode) {
  const props = new Map<string, string>();

  node.props.forEach((attribute) => {
    // Static props
    if (attribute.type === NodeTypes.ATTRIBUTE) {
      const propName = attribute.name;
      const propValue = attribute.value?.content ?? 'true';
      props.set(propName, propValue);
    }

    // Bound props
    else if (
      attribute.type === NodeTypes.DIRECTIVE &&
      attribute.arg?.type === NodeTypes.SIMPLE_EXPRESSION &&
      attribute.exp?.type === NodeTypes.SIMPLE_EXPRESSION
    ) {
      const propName = attribute.arg.content ?? 'v-bind';
      const propValue = attribute.exp.content ?? 'true';
      props.set(propName, propValue);
    }
  });

  return Object.fromEntries(props);
}
