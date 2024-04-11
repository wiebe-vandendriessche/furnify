import React from "react";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { FloorplanEditor } from "./FloorplanEditor";
import { use2d } from "../contexts/2dContext";

export const FloorplanScene = () => {
  const { isDrawing, toggleDrawing, drawingCanvasRef } = use2d();

  const handleDrawingButtonClick = (event) => {
    event.stopPropagation();
    toggleDrawing();
  }


  return (
    <>
      <div ref={drawingCanvasRef} className="canvas">
        <div
          className="editor-controls"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            margin: "10px",
            zIndex: 100,
          }}
        >
          <button onClick={handleDrawingButtonClick}>
            {isDrawing ? "Stop Drawing" : "Start Drawing"}
          </button>
        </div>

        <Canvas
          ref={drawingCanvasRef}
          className="canvas"
          orthographic
          camera={{ position: [0, 0, 5], zoom: 100 }}
        >
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <FloorplanEditor />
          <axesHelper />
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={false}
          />
        </Canvas>
      </div>
    </>
  );
};
