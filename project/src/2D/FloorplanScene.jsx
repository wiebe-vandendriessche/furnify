import React from "react";
import { Canvas } from "@react-three/fiber";
import { useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { FloorplanEditor } from "./FloorplanEditor";
import { use2d } from "../contexts/2dContext";
import { PencilSquare, Rulers, Trash } from "react-bootstrap-icons";
import "./Floorplan.css";

export const FloorplanScene = () => {
  const { isDrawing, toggleDrawing, drawingCanvasRef } = use2d();
  const { removeAll } = use2d();
  const { orthogonalMode, toggleOrthogonalMode } = use2d();
  const { isHoveringCanvas, setIsHoveringCanvas } = use2d();

  const handleDrawingButtonClick = (event) => {
    event.stopPropagation();
    toggleDrawing();
  };

  const handleRemoveButtonClick = (event) => {
    event.stopPropagation();
    console.log("Remove button clicked");
    removeAll();
  };

  const handleOrthogonalButtonClick = (event) => {
    event.stopPropagation();
    console.log("Orthogonal button clicked");
    toggleOrthogonalMode();
  };


  const handleMouseEnter = () => {
    console.log("Mouse entered canvas");
    setIsHoveringCanvas(true);
  };
  
  const handleMouseLeave = () => {
    console.log("Mouse left canvas");
    setIsHoveringCanvas(false);
  };

  return (
    <>
      <div className="editor-controls">
        <button
          className={`btn-circle btn-lg ${isDrawing ? "clicked" : "unclicked"}`}
          onClick={handleDrawingButtonClick}
        >
          <PencilSquare />
        </button>

        <button
          className={`btn-circle btn-lg unclicked`}
          onClick={handleRemoveButtonClick}
        >
          <Trash />
        </button>

        <button
          className={`btn-circle btn-lg ${
            orthogonalMode ? "clicked" : "unclicked"
          }`}
          onClick={handleOrthogonalButtonClick}
        >
          <Rulers />
        </button>
      </div>

      <Canvas
        ref={drawingCanvasRef}
        className="canvas"
        orthographic
        camera={{ position: [0, 0, 5], zoom: 100 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
    </>
  );
};
