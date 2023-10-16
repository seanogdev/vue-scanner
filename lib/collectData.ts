import { glob } from "glob";
import { readFile } from "fs/promises";
import { extractMetrics } from "./extractMetrics.js";

type VueScannerOptions = {
  directory: string;
};

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
