import React, { createContext, useState, useRef, useContext } from "react";
import { DrawablePoint } from "../2D/components/Point";
import { DrawableLine } from "../2D/components/Line";
import { useThree } from "@react-three/fiber";

const DrawingContext = createContext<any>(null);

export const use2d = () => useContext(DrawingContext);

export const DrawingProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(true);
  const drawingCanvasRef = useRef(null);

  const [orthogonalMode, setOrthogonalMode] = useState(false);

  const [isHoveringCanvas, setIsHoveringCanvas] = useState(false);

  const [gridSize, setGridSize] = useState(0.1);

  const [points, setPoints] = useState<DrawablePoint[]>([]);
  const [lines, setLines] = useState<DrawableLine[]>([]);
  const tempLineRef = useRef<DrawableLine | null>(null);
  const latestPointRef = useRef<DrawablePoint | null>(null); // store the latest point

  const [snappingMode, setSnappingMode] = useState(false);

  // Toggle drawing state
  const toggleDrawing = () =>
    setIsDrawing((prev) => {
      console.log("Drawing is now: " + !prev);
      return !prev;
    });

  // Toggle orthogonal mode
  const toggleOrthogonalMode = () => setOrthogonalMode((prev) => {
    console.log("Orthogonal mode is now: " + !prev);
    return !prev;
  })

  // Remove all elements from the canvas
  const removeAll = () => {
    let confirmation = window.confirm(
      "Are you sure you want to remove everything?"
    );
    if (confirmation) {
      setPoints([]);
      setLines([]);
    }
  };

  const value = {
    isDrawing,
    toggleDrawing,
    drawingCanvasRef,
    points,
    setPoints,
    lines,
    setLines,
    tempLineRef,
    latestPointRef,
    removeAll,
    orthogonalMode,
    toggleOrthogonalMode,
    isHoveringCanvas,
    setIsHoveringCanvas,
    gridSize,
    setGridSize,
    snappingMode, 
    setSnappingMode
  };

  return (
    <DrawingContext.Provider value={value}>{children}</DrawingContext.Provider>
  );
};
