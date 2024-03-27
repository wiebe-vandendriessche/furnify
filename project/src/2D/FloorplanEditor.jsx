import React, { useState, useEffect, useCallback } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FloorplanEditor() {
  const { scene, mouse, camera } = useThree();
  const [points, setPoints] = useState([]);
  const [line, setLine] = useState(null);

  const addPoint = useCallback((point) => {
    setPoints((prevPoints) => [...prevPoints, point]);
  }, []);

  useFrame(() => {
    if (points.length > 1) { // Ensure there are at least two points to draw a line
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      if (!line) {
        const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
        const newLine = new THREE.Line(geometry, material);
        setLine(newLine);
        scene.add(newLine);
      } else {
        line.geometry.dispose(); // Dispose of the old geometry
        line.geometry = geometry;
      }
    }
  });

  useEffect(() => {
    const handleClick = (event) => {
      // Prevent the default action to avoid any unwanted side effects
      event.preventDefault();

      // Calculate normalized device coordinates (NDC)
      const rect = event.target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = - ((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Update the picking ray with the camera and NDC
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera({ x, y }, camera);

      // Calculate the position where the ray intersects the drawing plane (e.g., Y=0)
      const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const intersection = new THREE.Vector3();
      raycaster.ray.intersectPlane(planeZ, intersection);

      // Add the intersection point if it exists
      if (intersection) {
        addPoint(intersection.clone());
      }
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [addPoint, camera]);

  // Rendering spheres at each point for visual feedback
  const spheres = points.map((point, index) => (
    <mesh key={index} position={[point.x, point.y, point.z]}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <meshStandardMaterial color={'red'} />
    </mesh>
  ));

  return (
    <>
      {spheres}
    </>
  );
}
