export const COLORS = [
  '#e05252',
  '#685ebb',
  '#649c41',
  '#ab589d',
  '#d08b36',
  '#209e9e',
  '#726f84',
  '#58384e',
];

export const NOTATION_SUBSTITUTES: Record<string, string> = {
  'abs': 'Math.abs',
  'sqrt': 'Math.sqrt',
  'log': 'Math.log',
  'tan': 'Math.tan',
  'sin': 'Math.sin',
  'cos': 'Math.cos',
  '\\^': '**',
  'PI': 'Math.PI',
};

export const DEFAULT_GRAPH_PROPS = {
  centerX: 0,
  centerY: 0,
  zoom: 100,
  resolution: 5,
  detectAsymptotes: false,
};

export const DEFAULT_FUNCTIONS = [
  { text: 'x + 1' },
  { text: 'x * x' },
  { text: 'sqrt(x)' },
  { text: '1 / x' },
  { text: '2.71828 ^ x * sin(5 * x) / 20' },
];
