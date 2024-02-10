import { NodeTypes, TemplateNode } from '@vue/compiler-dom';

export function getNodePropInfo(node: TemplateNode) {
  const props = [];

  for (const prop of node.props) {
    if (prop.type === NodeTypes.DIRECTIVE) {
      if (prop.arg?.type === NodeTypes.SIMPLE_EXPRESSION && prop.exp?.type === NodeTypes.SIMPLE_EXPRESSION) {
        if (prop.arg) {
          return props.push([prop.arg.content, prop.exp.content]);
        } else {
          // Convert v-bind="object" into multiple props
          const parsed = JSON.parse(prop.exp.content);
          if (typeof parsed === 'object') {
            for (const bindProp of Object.entries(parsed)) {
              props.push(bindProp);
            }
          }
        }
      }
    } else if (prop.type === NodeTypes.ATTRIBUTE) {
      if (prop.value?.type === NodeTypes.TEXT) {
        props.push([prop.name, prop.value.content ?? true]);
      }
    }
  }

  if (props.length === 0) {
    return undefined;
  }

  return Object.fromEntries(props);
}
