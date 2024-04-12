import React, { useMemo } from "react";
import { Line } from "@react-three/drei";
import { LineBasicMaterial, Vector3 } from "three";
import * as THREE from "three";

export const GridComponent = ({
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
  const points: Array<Array<THREE.Vector3>> = [];
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
