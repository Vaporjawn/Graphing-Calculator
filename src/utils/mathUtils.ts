import { NOTATION_SUBSTITUTES } from './constants';

export const clamp = (val: number, min: number, max: number): number => {
  if (val > min) {
    return val < max ? val : max;
  }
  return min;
};

export const createJsFunction = (text: string): { fn: (x: number) => number; invalid: boolean } => {
  let invalid = false;
  let fn: (x: number) => number = () => 0;

  let substitutedText = text;
  for (const [regex, sub] of Object.entries(NOTATION_SUBSTITUTES)) {
    substitutedText = substitutedText.replace(new RegExp(regex, 'g'), sub);
  }

  try {
    fn = new Function('x', 'return ' + substitutedText) as (x: number) => number;
  } catch {
    invalid = true;
  }

  return { fn, invalid };
};

export const getNextColor = (() => {
  const COLORS = [
    '#e05252',
    '#685ebb',
    '#649c41',
    '#ab589d',
    '#d08b36',
    '#209e9e',
    '#726f84',
    '#58384e',
  ];
  let colorIdx = -1;

  return () => {
    colorIdx = (colorIdx + 1) % COLORS.length;
    return COLORS[colorIdx];
  };
})();
