import { GraphProps } from '../types';

export const createCoordinateTransforms = (
  width: number,
  height: number,
  graphProps: GraphProps
) => {
  const { centerX, centerY, zoom } = graphProps;
  const centerXScreen = width / 2;
  const centerYScreen = height / 2;

  const xToCoord = (xValue: number): number => {
    return centerXScreen + (xValue - centerX) * zoom;
  };

  const yToCoord = (yValue: number): number => {
    return centerYScreen - (yValue - centerY) * zoom;
  };

  const coordToX = (coord: number): number => {
    return centerX + (coord - centerXScreen) / zoom;
  };

  const coordToY = (coord: number): number => {
    return centerY - (coord - centerYScreen) / zoom;
  };

  const minX = Math.floor(centerX - centerXScreen / zoom) - 1;
  const maxX = Math.floor(centerX + centerXScreen / zoom) + 1;
  const minY = Math.floor(centerY - centerYScreen / zoom) - 1;
  const maxY = Math.floor(centerY + centerYScreen / zoom) + 1;

  return {
    xToCoord,
    yToCoord,
    coordToX,
    coordToY,
    minX,
    maxX,
    minY,
    maxY,
  };
};
