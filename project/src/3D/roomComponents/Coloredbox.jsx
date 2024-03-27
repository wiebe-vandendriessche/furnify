import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, MeshWobbleMaterial } from '@react-three/drei';
import { MeshBasicMaterial, Mesh, MeshDepthMaterial, LinearEncoding } from 'three';

export const ColoredBox = ({ width, height, depth, position, color, visible, textures, addColorToTexture }) => {
    if (textures && addColorToTexture) {
        return (
            <Box args={[width, height, depth, 30, 30, 30]} position={position} visible={visible}>
                <meshStandardMaterial {...textures} normalMap-encoding={LinearEncoding} color={color} />
            </Box>
        );

    } else if (textures) {
        return (
            <Box args={[width, height, depth, 30, 30, 30]} position={position} visible={visible}>
                <meshStandardMaterial {...textures} normalMap-encoding={LinearEncoding} />
            </Box>
        );
    }

    else {
        return (
            <Box args={[width, height, depth]} position={position} visible={visible}>
                <meshStandardMaterial attach="material" color={color} />
            </Box>
        );
    }
};