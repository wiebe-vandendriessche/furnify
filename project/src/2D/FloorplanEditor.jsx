import { Canvas, useThree } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

export const FloorplanEditor = () => {
  const { scene, camera, raycaster } = useThree();
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const handleMouseDown = (event) => {
      // Convert mouse coordinates to world coordinates
      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      );
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        const point = intersects[0].point;
        setPoints((prevPoints) => [...prevPoints, new THREE.Vector3(point.x, 0, point.z)]);
      }
    };

    window.addEventListener('mousedown', handleMouseDown);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, [camera, raycaster, scene.children]);

  // Draw lines between points
  const lines = points.map((point, index) => {
    if (index === 0) return null;
    const geometry = new THREE.BufferGeometry().setFromPoints([points[index - 1], point]);
    return <line key={index} geometry={geometry} material={new THREE.LineBasicMaterial({ color: 0xff0000 })} />;
  });

  return <>{lines}</>;
};
