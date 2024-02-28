// src/components/contexts/DimensionContext.jsx
import React, { createContext, useContext, useState } from 'react';

const DimensionContext = createContext();

export const useDimensions = () => useContext(DimensionContext);

export const DimensionProvider = ({ children }) => {
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(2.5);
  const [depth, setDepth] = useState(7);

  const value = {
    width,
    setWidth,
    height,
    setHeight,
    depth,
    setDepth,
  };

  return (
    <DimensionContext.Provider value={value}>
      {children}
    </DimensionContext.Provider>
  );
};
