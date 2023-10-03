import { RootNode } from "@vue/compiler-dom";

export type FileEntry = [string, RootNode];

export type ComponentInstance = {
  location: {
    path: string;
    start: {
      line: number;
      column: number;
    };
  };
  props?: Record<string, string>;
};

export type ComponentMetric = {
  name: string;
  instanceCount: number;
  instances: ComponentInstance[];
};
