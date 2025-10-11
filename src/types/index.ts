export interface GraphFunction {
  id: string;
  text: string;
  color: string;
  hidden: boolean;
  invalid: boolean;
  jsFunction?: (x: number) => number;
}

export interface GraphProps {
  centerX: number;
  centerY: number;
  zoom: number;
  resolution: number;
  detectAsymptotes: boolean;
}

export interface GraphContextType {
  functions: GraphFunction[];
  graphProps: GraphProps;
  addFunction: (text?: string) => void;
  removeFunction: (id: string) => void;
  updateFunction: (id: string, updates: Partial<GraphFunction>) => void;
  updateGraphProps: (updates: Partial<GraphProps>) => void;
  resetGraphProps: () => void;
}
