import React, { useRef, useEffect, useCallback } from 'react';
import { Box } from '@mui/material';
import { useGraph } from '../../app/providers/GraphProvider';
import { createCoordinateTransforms } from '../../utils/graphUtils';
import { clamp } from '../../utils/mathUtils';
import { GraphFunction } from '../../types';

export const GraphCanvas: React.FC = () => {
  const gridCanvasRef = useRef<HTMLCanvasElement>(null);
  const functionsCanvasRefs = useRef<Map<string, HTMLCanvasElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);
  const { functions, graphProps, updateGraphProps } = useGraph();

  const [isDragging, setIsDragging] = React.useState(false);
  const [lastPos, setLastPos] = React.useState({ x: 0, y: 0 });

  const drawGrid = useCallback(() => {
    const canvas = gridCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    ctx.clearRect(0, 0, width, height);

    const transforms = createCoordinateTransforms(width, height, graphProps);
    const { xToCoord, yToCoord, minX, maxX, minY, maxY } = transforms;

    // Draw grid lines
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.lineWidth = 1;
    ctx.beginPath();

    for (let y = minY; y < maxY; y++) {
      ctx.moveTo(xToCoord(minX), yToCoord(y));
      ctx.lineTo(xToCoord(maxX), yToCoord(y));
    }

    for (let x = minX; x < maxX; x++) {
      ctx.moveTo(xToCoord(x), yToCoord(minY));
      ctx.lineTo(xToCoord(x), yToCoord(maxY));
    }

    ctx.stroke();

    // Draw axes
    ctx.strokeStyle = '#374151';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(xToCoord(minX), yToCoord(0));
    ctx.lineTo(xToCoord(maxX), yToCoord(0));
    ctx.moveTo(xToCoord(0), yToCoord(minY));
    ctx.lineTo(xToCoord(0), yToCoord(maxY));
    ctx.stroke();

    // Mark coordinates
    ctx.font = '14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto';
    ctx.fillStyle = '#6b7280';

    const markCoord = (x: number, y: number) => {
      ctx.fillText(`(${x}, ${y})`, xToCoord(x) + 5, yToCoord(y) + 18);
    };

    markCoord(0, 0);
    markCoord(1, 0);
    markCoord(0, 1);
    markCoord(10, 0);
    markCoord(0, 10);
    markCoord(-10, 0);
    markCoord(0, -10);
    markCoord(50, 0);
    markCoord(0, 50);
    markCoord(-50, 0);
    markCoord(0, -50);
  }, [graphProps]);

  const drawFunction = useCallback(
    (fn: typeof functions[0], canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext('2d');
      if (!ctx || !fn.jsFunction) return;

      const width = (canvas.width = window.innerWidth);
      const height = (canvas.height = window.innerHeight);

      ctx.clearRect(0, 0, width, height);

      if (fn.hidden) return;

      const transforms = createCoordinateTransforms(width, height, graphProps);
      const { xToCoord, yToCoord, minX, maxX, minY, maxY } = transforms;
      const { resolution, detectAsymptotes } = graphProps;

      ctx.lineWidth = 3;
      ctx.strokeStyle = fn.color;
      ctx.beginPath();

      let lastY = 0;
      const increment = resolution / graphProps.zoom;

      for (let x = minX; x < maxX; x += increment) {
        const y = fn.jsFunction(x);

        if (!isNaN(y)) {
          const diff = y - lastY;
          const diffSign = y * lastY < 0;
          lastY = y;

          if (
            detectAsymptotes &&
            Math.abs(diff * graphProps.zoom) > height &&
            diffSign
          ) {
            ctx.moveTo(xToCoord(x), yToCoord(clamp(y, minY, maxY)));
          } else {
            ctx.lineTo(xToCoord(x), yToCoord(clamp(y, minY, maxY)));
          }
        }
      }

      ctx.stroke();
    },
    [graphProps]
  );

  // Draw grid
  useEffect(() => {
    drawGrid();
  }, [drawGrid]);

  // Draw functions
  useEffect(() => {
    functions.forEach((fn: GraphFunction) => {
      const canvas = functionsCanvasRefs.current.get(fn.id);
      if (canvas) {
        drawFunction(fn, canvas);
      }
    });
  }, [functions, drawFunction]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      drawGrid();
      functions.forEach((fn: GraphFunction) => {
        const canvas = functionsCanvasRefs.current.get(fn.id);
        if (canvas) drawFunction(fn, canvas);
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawGrid, drawFunction, functions]);

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - lastPos.x;
    const deltaY = e.clientY - lastPos.y;

    updateGraphProps({
      centerX: graphProps.centerX - deltaX / graphProps.zoom,
      centerY: graphProps.centerY + deltaY / graphProps.zoom,
    });

    setLastPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const change = e.deltaY;
    const scaledChange = Math.max(change / 1000, -0.3);
    updateGraphProps({
      zoom: graphProps.zoom * (1 + scaledChange),
    });
  };

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        cursor: isDragging ? 'grabbing' : 'grab',
        zIndex: 0,
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <canvas
        ref={gridCanvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      {functions.map((fn: GraphFunction) => (
        <canvas
          key={fn.id}
          ref={(el) => {
            if (el) {
              functionsCanvasRefs.current.set(fn.id, el);
            } else {
              functionsCanvasRefs.current.delete(fn.id);
            }
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        />
      ))}
    </Box>
  );
};
