import { ParserOptions } from '@vue/compiler-dom';

export type VueScannerConfig = {
  directory: string;
  collectSlotStats: boolean;
  compiler: {
    parserOptions: ParserOptions;
  };
};

export type ComponentInstanceLocation = {
  file: string;
  start: {
    line: number;
    column: number;
  };
};

export type ComponentInstanceProps = Record<string, string>;

export type ComponentInstanceSlots = Record<string, string>;

export type ComponentInstance = {
  location: ComponentInstanceLocation;
  props?: ComponentInstanceProps;
  slots?: ComponentInstanceSlots;
};

export type ComponentMetric = {
  name: string;
  instanceCount: number;
  instances: ComponentInstance[];
};

export type ComponentMetrics = Map<string, ComponentMetric>;
