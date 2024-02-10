import { ParserOptions } from '@vue/compiler-dom';

export type VueScannerConfig = {
  collect: {
    slots: boolean;
    props: boolean;
    location: boolean;
  };
  compiler: {
    parserOptions: ParserOptions;
  };
  output: string;
};

export type VueScannerContext = {
  componentMetrics: ComponentMetrics;
  config: VueScannerConfig;
  directory: string;
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

export type ComponentInstance = Partial<{
  location?: ComponentInstanceLocation;
  props?: ComponentInstanceProps;
  slots?: ComponentInstanceSlots;
}>;

export type ComponentMetric = {
  name: string;
  instanceCount: number;
  instances: ComponentInstance[];
};

export type ComponentMetrics = Map<string, ComponentMetric>;
