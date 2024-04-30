import React, { useEffect, useRef, useMemo } from "react";
import { Canvas, useThree, extend } from "@react-three/fiber";
import { useState } from "react";
import { Line, OrbitControls } from "@react-three/drei";
import { FloorplanEditor } from "./FloorplanEditor";
import { use2d } from "../contexts/2dContext";
import {
  Grid,
  Grid3x3,
  House,
  PencilSquare,
  Rulers,
  Trash
} from "react-bootstrap-icons";
import {
  LineBasicMaterial,
  BufferGeometry,
  LineSegments,
  Vector3,
} from "three";
import * as THREE from "three";
import { GridComponent } from "./components/GridComponent";
import "./Floorplan.css";
import { SliderComponent } from "./components/Slider";

export const FloorplanScene = () => {
  const { isDrawing, toggleDrawing, drawingCanvasRef } = use2d();
  const { removeAll } = use2d();
  const { orthogonalMode, toggleOrthogonalMode } = use2d();
  const { isHoveringCanvas, setIsHoveringCanvas } = use2d();
  const { gridSize, setGridSize } = use2d();
  const { snappingMode, setSnappingMode } = use2d();
  const { showGrid, setShowGrid } = use2d();
  const { isClosed, setIsClosed } = use2d();
  const { handleConvertTo3D, sceneObjects } = use2d();

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
    setSnappingMode((prev) => !prev);
  };

  const handle3DButtonClicked = (event) => {
    event.stopPropagation();
    console.log("3D Button  Clicked");
    handleConvertTo3D();
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
          className={`btn-circle btn-lg ${orthogonalMode ? "clicked" : "unclicked"
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

        {showGrid && <SliderComponent gridSize={gridSize} setgridSize={setGridSize} />}

        {isClosed &&
          <button
            className={`btn-circle btn-lg unclicked`}
            onClick={handle3DButtonClicked}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-badge-3d" viewBox="0 0 16 16">
              <path d="M4.52 8.368h.664c.646 0 1.055.378 1.06.9.008.537-.427.919-1.086.919-.598-.004-1.037-.325-1.068-.756H3c.03.914.791 1.688 2.153 1.688 1.24 0 2.285-.66 2.272-1.798-.013-.953-.747-1.38-1.292-1.432v-.062c.44-.07 1.125-.527 1.108-1.375-.013-.906-.8-1.57-2.053-1.565-1.31.005-2.043.734-2.074 1.67h1.103c.022-.391.383-.751.936-.751.532 0 .928.33.928.813.004.479-.383.835-.928.835h-.632v.914zm3.606-3.367V11h2.189C12.125 11 13 9.893 13 7.985c0-1.894-.861-2.984-2.685-2.984zm1.187.967h.844c1.112 0 1.621.686 1.621 2.04 0 1.353-.505 2.02-1.621 2.02h-.844z" />
              <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
            </svg>
          </button>
        }
      </div>

      {sceneObjects.length === 0 && <Canvas
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
        {showGrid && (
          <GridComponent
            size={100}
            divisions={100 / gridSize}
            color="lightgrey"
            centerLineColor="lightgrey"
          />
        )}
      </Canvas>}
      {sceneObjects.length !== 0 && <Canvas
        ref={drawingCanvasRef}
        className="canvas"
        orthographic
        camera={{ position: [0, 0, 5], zoom: 100 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        {sceneObjects.map((object, index) => (
          <primitive key={index} object={object} />
        ))}
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        <axesHelper position={[0, 0, 1]} />
      </Canvas>
      }
    </>
  );
};
