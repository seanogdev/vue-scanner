import { glob } from "glob";
import { parse, transform } from "@vue/compiler-dom";
import { transformNode } from "./transformNode.js";
import { readFile } from "fs/promises";
import { ComponentMetric } from "../types.js";
import { basename } from "path";

type VueScannerOptions = {
  directory: string;
};

const componentMetrics = new Map<string, ComponentMetric>();

async function extractMetrics(code: string, path: string) {
  const name = basename(path);

  const ast = parse(code, {
    comments: true,
  });

  return transform(ast, {
    nodeTransforms: [
      (node) => {
        const metric = transformNode({
          node,
          path,
          metric: componentMetrics.get(path),
        });
        if (metric) {
          componentMetrics.set(name, metric);
        }
      },
    ],
  });
}

export async function collectData(options: VueScannerOptions) {
  const filePaths = await glob(`${options.directory}/**/*.vue`, {
    windowsPathsNoEscape: true,
  });

  return Promise.all(
    filePaths.map(async (path) => {
      const code = await readFile(path, "utf8");
      return extractMetrics(code, path);
    })
  );
}
