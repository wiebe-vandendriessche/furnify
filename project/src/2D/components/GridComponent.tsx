import React, { useMemo } from "react";
import { extend, useThree } from "@react-three/fiber";
import {
    LineBasicMaterial,
    BufferGeometry,
    LineSegments,
    Vector3,
  } from "three";
import * as THREE from "three";

// Extend r3f with LineSegments if not already available
extend({ LineSegments: THREE.LineSegments });

export const GridComponent = ({
  size = 100,
  divisions = 10,
  color = "grey",
  centerLineColor = "white",
}) => {
  const { scene } = useThree();
  // This memo will only recompute if size, divisions, color or centerLineColor change
  const { geometry, material, centerMaterial } = useMemo(() => {
    const points: Vector3[] = [];
    const step = size / divisions;
    const halfSize = size / 2;

    const material = new THREE.LineBasicMaterial({ color });
    const centerMaterial = new THREE.LineBasicMaterial({ color: centerLineColor });

    for (let i = 0; i <= divisions; i++) {
      // Horizontal lines
      points.push(new Vector3(-halfSize, i * step - halfSize, 0), new THREE.Vector3(halfSize, i * step - halfSize, 0));
      // Vertical lines
      points.push(new Vector3(i * step - halfSize, -halfSize, 0), new THREE.Vector3(i * step - halfSize, halfSize, 0));
    }

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    return { geometry, material, centerMaterial };
  }, [size, divisions, color, centerLineColor]);

  return (
    <lineSegments geometry={geometry} material={material}>
      {/* No children needed as this is a static object */}
    </lineSegments>
  );
};
