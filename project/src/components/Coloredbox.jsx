import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import { MeshBasicMaterial, Mesh } from 'three';

export const ColoredBox = ({ width, height, depth, position, color, visible }) => {
    return (
        <Box args={[width, height, depth]} position={position} visible={visible}>
            <meshStandardMaterial attach="material" color={color}/>
        </Box>
    );
};