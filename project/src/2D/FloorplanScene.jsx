import React, { useEffect, useRef, useMemo } from "react";
import { Canvas, useThree, extend } from "@react-three/fiber";
import { useState } from "react";
import { Line, OrbitControls } from "@react-three/drei";
import { FloorplanEditor } from "./FloorplanEditor";
import { use2d } from "../contexts/2dContext";
import { House, PencilSquare, Rulers, Trash } from "react-bootstrap-icons";
import {
  LineBasicMaterial,
  BufferGeometry,
  LineSegments,
  Vector3,
} from "three";
import * as THREE from "three";
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

  extend({ LineSegments });

  const GridComponent = ({
    size = 100,
    divisions = 10,
    color = "grey",
    centerLineColor = "white",
  }) => {
    const material = new THREE.LineBasicMaterial({ color });
    const centerLineMaterial = new THREE.LineBasicMaterial({
      color: centerLineColor,
    });

    // Prepare points for grid lines
    const points = [];
    const step = size / divisions;
    const halfSize = size / 2;

    // Generate horizontal lines (parallel to X-axis)
    for (let i = 0; i <= divisions; i++) {
      points.push([
        new THREE.Vector3(-halfSize, i * step - halfSize, 0),
        new THREE.Vector3(halfSize, i * step - halfSize, 0),
      ]);
    }

    // Generate vertical lines (parallel to Y-axis)
    for (let i = 0; i <= divisions; i++) {
      points.push([
        new THREE.Vector3(i * step - halfSize, -halfSize, 0),
        new THREE.Vector3(i * step - halfSize, halfSize, 0),
      ]);
    }

    // JSX to render all lines
    return (
      <>
        {points.map((line, index) => (
          <Line
            key={index}
            points={line}
            color={index % (divisions + 1) === 0 ? centerLineColor : color}
            lineWidth={1} // Adjust line width as necessary
            userData={{ test: "line" }} // Custom user data
          />
        ))}
      </>
    );
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
          enablePan={!isDrawing}
          enableRotate={false}
          mouseButtons={{
            LEFT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.DOLLY,
            RIGHT: THREE.MOUSE.PAN,
          }}
        />
        <GridComponent
          size={10}
          divisions={100}
          color="grey"
          centerLineColor="white"
        />
      </Canvas>
    </>
  );
};
