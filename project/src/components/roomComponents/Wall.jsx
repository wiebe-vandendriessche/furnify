import React from 'react';
import { ColoredBox } from './Coloredbox';
import { useTexture } from '@react-three/drei';

export const Wall = ({ width, height, depth, position, visible }) => {
  const wallTexture = useTexture({
    map: './textures/beige_wall/beige_wall_001_ao_1k.jpg',
    displacement: './textures/beige_wall/beige_wall_001_disp_1k.jpg',
    aoMap: './textures/beige_wall/beige_wall_001_arm_1k.jpg',
    roughnessMap: './textures/beige_wall/beige_wall_001_arm_1k.jpg',
    metalnessMap: './textures/beige_wall/beige_wall_001_arm_1k.jpg',
    normalMap: './textures/beige_wall/beige_wall_001_arm_1k.jpg',
  });

  return (
    <ColoredBox
      width={width}
      height={height}
      depth={depth}
      position={position}
      color="blue"
      visible={visible}
      textures={wallTexture}
    />
  );
};