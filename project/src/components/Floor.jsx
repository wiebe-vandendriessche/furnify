import React from 'react';
import { ColoredBox } from './Coloredbox';

export const Floor = ({ width, height, depth, position }) => {
    return (
    <ColoredBox
        width={width}
        height={height}
        depth={depth}
        position={position}
        color="blue"
    />
    );
};
