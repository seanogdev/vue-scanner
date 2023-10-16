import { parse, transform } from "@vue/compiler-dom";
import { basename } from "path";
import { transformNode } from "./transformNode.js";
import { ComponentMetric } from "../types.js";

const componentMetrics = new Map<string, ComponentMetric>();

export async function extractMetrics(code: string, path: string) {
  console.log("code:", code);
  const name = basename(path);

  const ast = parse(code, {
    comments: true,
  });

  transform(ast, {
    nodeTransforms: [
      (node) => {
        const metric = transformNode({
          node,
          path,
          componentMetric: componentMetrics.get(path),
        });
        if (metric) {
          componentMetrics.set(name, metric);
        }
      },
    ],
  });
  console.log("componentMetrics:", componentMetrics);
}
