import React from "react";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { FloorplanEditor } from "./FloorplanEditor";
import { use2d } from "../contexts/2dContext";
import { PencilSquare } from "react-bootstrap-icons";
import "./Floorplan.css";

export const FloorplanScene = () => {
  const { isDrawing, toggleDrawing, drawingCanvasRef } = use2d();

  const handleDrawingButtonClick = (event) => {
    event.stopPropagation();
    toggleDrawing();
  };

  return (
    <>
      {/* <div className="canvas"> */}
      <div className="editor-controls">
        <button
          className={`btn-circle btn-lg ${isDrawing ? "clicked" : "unclicked"}`}
          onClick={handleDrawingButtonClick}
        >
          <PencilSquare />
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
      {/* </div> */}
    </>
  );
};
