import React, { createContext, useState, useRef, useContext } from "react";
import { DrawablePoint } from "../2D/components/Point";
import { DrawableLine } from "../2D/components/Line";
import { useThree } from "@react-three/fiber";

const DrawingContext = createContext<any>(null);

export const use2d = () => useContext(DrawingContext);

export const DrawingProvider = ({ children }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const drawingCanvasRef = useRef(null);

  const [points, setPoints] = useState<DrawablePoint[]>([]);
  const [lines, setLines] = useState<DrawableLine[]>([]);
  const tempLineRef = useRef<DrawableLine | null>(null);
  const latestPointRef = useRef<DrawablePoint | null>(null); // store the latest point

  // Toggle drawing state
  const toggleDrawing = () =>
    setIsDrawing((prev) => {
      console.log("Drawing is now: " + !prev);
      return !prev;
    });

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
  };

  return (
    <DrawingContext.Provider value={value}>{children}</DrawingContext.Provider>
  );
};
