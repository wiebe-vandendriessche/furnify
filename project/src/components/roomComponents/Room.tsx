import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, useTexture } from '@react-three/drei';
import { Mesh } from 'three';
import { Wall } from './Wall';
import { Floor } from './Floor';
import { useState } from 'react';
import * as THREE from 'three';

export const Room = ({ width, depth, height, wallThickness, floorThickness }) => {
  const roomRef = useRef<THREE.Group>(null);

  const [backWallVisible, setBackWallVisible] = useState(true);
  const [frontWallVisible, setFrontWallVisible] = useState(false);
  const [leftWallVisible, setLeftWallVisible] = useState(true);
  const [rightWallVisible, setRightWallVisible] = useState(false);

  useFrame(({ camera, clock }) => {

    let viewWallValue = 2

    let newBackWallVisible = camera.position.z >= -viewWallValue;
    let newFrontWallVisible = camera.position.z <= viewWallValue;
    let newLeftWallVisible = camera.position.x >= -viewWallValue;
    let newRightWallVisible = camera.position.x <= viewWallValue;

    setBackWallVisible(newBackWallVisible);
    setFrontWallVisible(newFrontWallVisible);
    setLeftWallVisible(newLeftWallVisible);
    setRightWallVisible(newRightWallVisible);

    // //rotate
    //  // Define the radius of the circle path and the speed of rotation
    //  const radius = 10; // Adjust based on your scene size
    //  const speed = 0.5; // Adjust for rotation speed
 
    //  // Calculate the camera's new position over time
    //  const angle = clock.getElapsedTime() * speed;
    //  camera.position.x = radius * Math.sin(angle);
    //  camera.position.z = radius * Math.cos(angle);
    //  camera.lookAt(new THREE.Vector3(0, height / 2, 0));
  });

  return (
    <group ref={roomRef}>
      {/* Back Wall */}
      <Wall
        width={width}
        height={height}
        depth={wallThickness}
        position={[0, height / 2, -depth / 2 + wallThickness / 2]}
        visible={backWallVisible}
      />
      {/* Front Wall */}
      <Wall
        width={width}
        height={height}
        depth={wallThickness}
        position={[0, height / 2, depth / 2 - wallThickness / 2]}
        visible={frontWallVisible}
      />
      {/* Left Wall */}
      <Wall
        width={wallThickness}
        height={height}
        depth={depth}
        position={[-width / 2 + wallThickness / 2, height / 2, 0]}
        visible={leftWallVisible}
      />
      {/* Right Wall */}
      <Wall
        width={wallThickness}
        height={height}
        depth={depth}
        position={[width / 2 - wallThickness / 2, height / 2, 0]}
        visible={rightWallVisible}
      />
      {/* Floor */}
      <Floor
        width={width}
        height={floorThickness}
        depth={depth}
        position={[0, -floorThickness / 2, 0]}
      />
    </group>
  );
};

export default Room



