import React from 'react';
import { ColoredBox } from './Coloredbox';
import { useTexture } from '@react-three/drei';

export const Wall = ({ width, height, depth, position, visible }) => {
  const wallTexture = useTexture({
    map: './textures/plastered_wall/plastered_wall_diff_4k.jpg',
    displacement: './textures/plastered_wall/plastered_wall_disp_4k.jpg',
    aoMap: './textures/plastered_wall/plastered_wall_arm_4k.jpg',
    roughnessMap: './textures/plastered_wall/plastered_wall_arm_4k.jpg',
    metalnessMap: './textures/plastered_wall/plastered_wall_arm_4k.jpg',
    normalMap: './textures/plastered_wall/plastered_wall_nor_gl_4k.jpg',
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