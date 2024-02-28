import React from 'react';
import { ColoredBox } from './Coloredbox';
import { useTexture } from '@react-three/drei';

export const Floor = ({ width, height, depth, position }) => {

    const floorTexture = useTexture({
        map: './textures/laminate_floor/laminate_floor_02_diff_4k.jpg',
        displacement: './textures/laminate_floor/laminate_floor_02_disp_4k.jpg',
        aoMap: './textures/laminate_floor/laminate_floor_02_arm_4k.jpg',
        roughnessMap: './textures/laminate_floor/laminate_floor_02_arm_4k.jpg',
        metalnessMap: './textures/laminate_floor/laminate_floor_02_arm_4k.jpg',
        normalMap: './textures/laminate_floor/laminate_floor_02_nor_gl_4k.jpg',
    });

    return (
        <ColoredBox
            width={width}
            height={height}
            depth={depth}
            position={position}
            color="blue"
            textures={floorTexture}
        />
    );
};
