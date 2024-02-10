import { ElementTypes, TemplateNode, isTemplateNode, isText, isVSlot } from '@vue/compiler-dom';

export function getNodeSlotInfo(node: TemplateNode) {
  const slots: Array<[string, string]> = [];

  for (const child of node.children) {
    if (child.type !== ElementTypes.COMPONENT && child.type !== ElementTypes.ELEMENT) {
      continue;
    }
    if (isText(child)) {
      slots.push(['default', child]);
    } else if (child.tag !== 'template') {
      slots.push(['default', child.loc.source]);
    } else {
      const slotProp = child.props.find(isVSlot);
      const slotName = slotProp?.arg?.content ?? 'default';
      const slotContent = child.children
        .map((_child) => {
          return _child.loc.source;
        })
        .join('\n');

      slots.push([slotName, slotContent]);
    }
  }

  if (slots.length === 0) {
    return undefined;
  }

  return Object.fromEntries(slots);
}
