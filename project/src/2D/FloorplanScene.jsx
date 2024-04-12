import React, { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useState } from "react";
import { OrbitControls } from "@react-three/drei";
import { FloorplanEditor } from "./FloorplanEditor";
import { use2d } from "../contexts/2dContext";
import { House, PencilSquare, Rulers, Trash } from "react-bootstrap-icons";
import "./Floorplan.css";

export const FloorplanScene = () => {
  const { isDrawing, toggleDrawing, drawingCanvasRef } = use2d();
  const { removeAll } = use2d();
  const { orthogonalMode, toggleOrthogonalMode } = use2d();
  const { isHoveringCanvas, setIsHoveringCanvas } = use2d();
  const [isCameraHome, setCameraHome] = useState(true);

  const handleDrawingButtonClick = (event) => {
    event.stopPropagation();
    toggleDrawing();
  };

  const handleRemoveButtonClick = (event) => {
    event.stopPropagation();
    removeAll();
  };

  const handleOrthogonalButtonClick = (event) => {
    event.stopPropagation();
    toggleOrthogonalMode();
  };


  const handleMouseEnter = () => {
    setIsHoveringCanvas(true);
  };
  
  const handleMouseLeave = () => {
    setIsHoveringCanvas(false);
  };

  const handleHomeButtonClicked = (event) => {
    event.stopPropagation();
    console.log("Home button clicked");
  }

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

        <button
          className={`btn-circle btn-lg ${isCameraHome ? "clicked" : "unclicked"}`} onClick={handleHomeButtonClicked}>
          <House />
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
