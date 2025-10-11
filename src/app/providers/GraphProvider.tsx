import React, { createContext, useContext, useState, useCallback } from 'react';
import { GraphFunction, GraphProps, GraphContextType } from '../../types';
import { DEFAULT_GRAPH_PROPS, DEFAULT_FUNCTIONS } from '../../utils/constants';
import { createJsFunction, getNextColor } from '../../utils/mathUtils';

const GraphContext = createContext<GraphContextType | undefined>(undefined);

export const useGraph = () => {
  const context = useContext(GraphContext);
  if (!context) {
    throw new Error('useGraph must be used within GraphProvider');
  }
  return context;
};

export const GraphProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [functions, setFunctions] = useState<GraphFunction[]>(() =>
    DEFAULT_FUNCTIONS.map((fn: { text: string }, index: number) => {
      const { fn: jsFunction, invalid } = createJsFunction(fn.text);
      return {
        id: `fn-${Date.now()}-${index}`,
        text: fn.text,
        color: getNextColor(),
        hidden: false,
        invalid,
        jsFunction,
      };
    })
  );

  const [graphProps, setGraphProps] = useState<GraphProps>(DEFAULT_GRAPH_PROPS);

  const addFunction = useCallback((text = 'x') => {
    const { fn: jsFunction, invalid } = createJsFunction(text);
    const newFunction: GraphFunction = {
      id: `fn-${Date.now()}`,
      text,
      color: getNextColor(),
      hidden: false,
      invalid,
      jsFunction,
    };
    setFunctions((prev) => [...prev, newFunction]);
  }, []);

  const removeFunction = useCallback((id: string) => {
    setFunctions((prev) => prev.filter((fn) => fn.id !== id));
  }, []);

  const updateFunction = useCallback((id: string, updates: Partial<GraphFunction>) => {
    setFunctions((prev) =>
      prev.map((fn) => {
        if (fn.id !== id) return fn;

        const updatedFn = { ...fn, ...updates };

        // If text changed, recompute the JS function
        if (updates.text !== undefined && updates.text !== fn.text) {
          const { fn: jsFunction, invalid } = createJsFunction(updates.text);
          updatedFn.jsFunction = jsFunction;
          updatedFn.invalid = invalid;
        }

        return updatedFn;
      })
    );
  }, []);

  const updateGraphProps = useCallback((updates: Partial<GraphProps>) => {
    setGraphProps((prev: GraphProps) => {
      const newProps = { ...prev, ...updates };
      // Enforce zoom limits
      if (newProps.zoom < 10) newProps.zoom = 10;
      return newProps;
    });
  }, []);

  const resetGraphProps = useCallback(() => {
    setGraphProps(DEFAULT_GRAPH_PROPS);
  }, []);

  const value: GraphContextType = {
    functions,
    graphProps,
    addFunction,
    removeFunction,
    updateFunction,
    updateGraphProps,
    resetGraphProps,
  };

  return <GraphContext.Provider value={value}>{children}</GraphContext.Provider>;
};
