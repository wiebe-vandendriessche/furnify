import React from 'react';
import { ColoredBox } from './Coloredbox';
import { useTexture } from '@react-three/drei';
import { useEffect } from 'react';
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

    // Apply texture repetition to all textures
    useEffect(() => {
        const repeatTextures = [
            floorTexture.map,
            floorTexture.displacement,
            floorTexture.aoMap,
            floorTexture.roughnessMap,
            floorTexture.metalnessMap,
            floorTexture.normalMap
        ];

        let repeatWidth = Math.floor(width / 3);
        let repeatDepth = Math.floor(depth / 3);

        repeatTextures.forEach(texture => {
            if (texture) {
                texture.wrapS = THREE.RepeatWrapping;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(repeatWidth, repeatDepth)
                texture.needsUpdate = true;
            }
        });
    }, [width, depth]);

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
