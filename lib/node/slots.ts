import { ElementNode, NodeTypes, DirectiveNode, AttributeNode } from '@vue/compiler-dom';
import { VueScannerContext } from '../types.js';

const defaultSlotName = 'default';

function isSlotDirectiveNode(node: AttributeNode | DirectiveNode): node is DirectiveNode {
  return node.type === NodeTypes.DIRECTIVE && node.name === 'slot';
}

/**
 * Get the slots of an element node
 */
export function getSlotInfo(node: ElementNode, context: VueScannerContext) {
  if (!context.config.collect.slots) {
    return undefined;
  }
  if (node.children.length === 0) {
    return undefined;
  }

  const slots: Record<string, string> = {};

  const vSlotDirective = node.props.find(isSlotDirectiveNode);
  if (vSlotDirective) {
    slots[defaultSlotName] = node.children.map((_child) => _child.loc.source).join('\n');
    return;
  }

  node.children.forEach((child) => {
    // If the child is a text node or an element node that is not a template, it is a default slot
    if (child.type === NodeTypes.ELEMENT && child.tag !== 'template') {
      slots[defaultSlotName] = child.loc.source;
      return;
    }

    // If the child is an element node that is a template, it may have a slot directive
    if (child.type === NodeTypes.ELEMENT) {
      const slotProp = child.props.find(isSlotDirectiveNode);

      // Only consider the slot directive if it is static
      if (slotProp && slotProp.arg?.type === NodeTypes.SIMPLE_EXPRESSION && slotProp.arg.isStatic === true) {
        slots[slotProp.arg.content] = child.children.map((_child) => _child.loc.source).join('\n');
        return;
      }
    }
  });

  return slots;
}
