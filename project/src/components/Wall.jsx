import React from 'react';
import { ColoredBox } from './Coloredbox.jsx';

export const Wall = ({ width, height, depth, position, visible }) => {
  return (
    <ColoredBox
      width={width}
      height={height}
      depth={depth}
      position={position}
      color="blue"
      visible={visible}
    />
  );
};