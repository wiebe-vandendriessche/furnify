import React, { useEffect, useRef, useMemo } from "react";
import { Canvas, useThree, extend } from "@react-three/fiber";
import { useState } from "react";
import { Line, OrbitControls } from "@react-three/drei";
import { FloorplanEditor } from "./FloorplanEditor";
import { use2d } from "../contexts/2dContext";
import { Grid, Grid3x3, House, PencilSquare, Rulers, Trash } from "react-bootstrap-icons";
import {
  LineBasicMaterial,
  BufferGeometry,
  LineSegments,
  Vector3,
} from "three";
import * as THREE from "three";
import { GridComponent } from "./components/GridComponent";
import "./Floorplan.css";

export const FloorplanScene = () => {
  const { isDrawing, toggleDrawing, drawingCanvasRef } = use2d();
  const { removeAll } = use2d();
  const { orthogonalMode, toggleOrthogonalMode } = use2d();
  const { isHoveringCanvas, setIsHoveringCanvas } = use2d();
  const [showGrid, setShowGrid] = useState(false);
  const [gridSize, setGridSize] = useState(0.1);

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

  const controlsRef = useRef();

  const handleHomeButtonClicked = (event) => {
    event.stopPropagation();
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handleGridButtonCLicked = (event) => {
    event.stopPropagation();
    setShowGrid((prev) => !prev);
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

        <button
          className={`btn-circle btn-lg unclicked`}
          onClick={handleHomeButtonClicked}
        >
          <House />
        </button>

        <button
          className={`btn-circle btn-lg ${showGrid ? "clicked" : "unclicked"}`}
          onClick={handleGridButtonCLicked}
        >
          <Grid3x3 />
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
        <axesHelper position={[0, 0, 1]} />
        <OrbitControls
          ref={controlsRef}
          enableZoom={true}
          enablePan={true}
          enableRotate={false}
          mouseButtons={{
            LEFT: isDrawing ? THREE.MOUSE.ROTATE : THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN,
          }}
        />
        {showGrid && <GridComponent size={100} divisions={100/gridSize} color="lightgrey" centerLineColor="lightgrey" />}
      </Canvas>
    </>
  );
};
