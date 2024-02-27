import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import { Mesh } from 'three';
import { Wall } from './Wall';
import { Floor } from './Floor';
import { useState } from 'react';

const Room = ({ width, depth, height, wallThickness, floorThickness }) => {
  const [backWallVisible, setBackWallVisible] = useState(true);
  const [frontWallVisible, setFrontWallVisible] = useState(true);
  const [leftWallVisible, setLeftWallVisible] = useState(true);
  const [rightWallVisible, setRightWallVisible] = useState(true);

  useFrame(({ camera }) => {
    
    const newBackWallVisible = camera.position.z >= 0;
    const newFrontWallVisible = camera.position.z <= 0;
    const newLeftWallVisible = camera.position.x >= 0;
    const newRightWallVisible = camera.position.x <= 0;

    setBackWallVisible(newBackWallVisible);
    setFrontWallVisible(newFrontWallVisible);
    setLeftWallVisible(newLeftWallVisible);
    setRightWallVisible(newRightWallVisible);

  });
  
  return (
    <>
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
    </>
  );
};

export default Room



