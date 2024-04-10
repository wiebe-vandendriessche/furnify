import React, { createContext, useState, useRef, useContext } from "react";

const DrawingContext = createContext();

export const useDrawing = () => useContext(DrawingContext);

export const DrawingProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const drawingCanvasRef = useRef(null);

  // Toggle drawing state
  const toggleDrawing = () =>
    setIsDrawing((prev) => {
      console.log("Drawing is now: " + !prev);
      return !prev;
    });

  const value = {
    isDrawing,
    toggleDrawing,
    drawingCanvasRef,
  };

  return (
    <DrawingContext.Provider value={value}>{children}</DrawingContext.Provider>
  );
};
