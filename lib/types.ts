export type ComponentInstance = {
  location: {
    id: string;
    path: string;
    start: {
      line: number;
      column: number;
    };
  };
  props?: Record<string, string>;
  slots?: Record<string, string>;
};

export type ComponentMetric = {
  name: string;
  instanceCount: number;
  instances: ComponentInstance[];
};

export type ComponentMetrics = Map<string, ComponentMetric>;
