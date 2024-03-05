import React from 'react';
import { ColoredBox } from './Coloredbox';
import { useTexture } from '@react-three/drei';
import img from '../../../public/planks_oak.png';
import { useLoader } from '@react-three/fiber';
import * as THREE from 'three';

export const Floor = ({ width, height, depth, position }) => {

    const floorTexture = useTexture({
        map: './textures/laminate_floor/laminate_floor_02_diff_1k.jpg',
        displacement: './textures/laminate_floor/laminate_floor_02_disp_1k.jpg',
        aoMap: './textures/laminate_floor/laminate_floor_02_arm_1k.jpg',
        roughnessMap: './textures/laminate_floor/laminate_floor_02_arm_1k.jpg',
        metalnessMap: './textures/laminate_floor/laminate_floor_02_arm_1k.jpg',
        normalMap: './textures/laminate_floor/laminate_floor_02_nor_gl_1k.jpg',
    });

    const texture = useLoader(THREE.TextureLoader, img)

    return (
        <ColoredBox
            width={width}
            height={height}
            depth={depth}
            position={position}
            color="blue"
            textures={texture}
        />
    );
};
