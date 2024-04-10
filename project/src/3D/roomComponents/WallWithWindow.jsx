import React from 'react';
import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import { useTexture } from '@react-three/drei';
import { useEffect } from 'react';

export const WallWithWindow = ({ width, height, depth, position, visible,  windowStartHeight, windowStartFromLeft, windowHeight, windowWidth }) => {

    const windowPos = [windowStartFromLeft, windowStartHeight, 0]; // Position of the window relative to the lower left corner of the wall
    
    const wallTexture = useTexture({
        map: './textures/beige_wall/beige_wall_001_ao_1k.jpg',
        displacement: './textures/beige_wall/beige_wall_001_disp_1k.jpg',
        aoMap: './textures/beige_wall/beige_wall_001_arm_1k.jpg',
        // roughnessMap: './textures/beige_wall/beige_wall_001_arm_1k.jpg', // uit om glans te voorkomen
        metalnessMap: './textures/beige_wall/beige_wall_001_arm_1k.jpg',
        normalMap: './textures/beige_wall/beige_wall_001_arm_1k.jpg',
      });
    
      // Apply texture repetition to all textures
      useEffect(() => {
        const repeatTextures = [
          wallTexture.map,
          wallTexture.displacement,
          wallTexture.aoMap,
          wallTexture.roughnessMap,
          wallTexture.metalnessMap,
          wallTexture.normalMap
        ];
    
        repeatTextures.forEach(texture => {
          if (texture) {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(2, 2) // TODO: only change repeat settings when width, depth is divisible by a certain number
            texture.needsUpdate = true;
          }
        });
      }, [width, depth]);

    return (
        <>
            {visible && (
                <WindowHole
                    width={width}
                    height={height}
                    depth={depth}
                    position={position}
                    windowPos={windowPos}
                    windowHeight={windowHeight}
                    windowWidth={windowWidth}
                    wallTexture={wallTexture} // Pass wallTexture as a prop
                />
            )}
        </>
    );
};

const WindowHole = ({ width, height, depth, position, windowPos, windowHeight, windowWidth,
    wallTexture }) => {
    // Create geometry for wall and window
    const wallGeometry = new THREE.BoxGeometry(width, height, depth);
    const windowGeometry = new THREE.BoxGeometry(windowWidth, windowHeight, depth);

    // Move window to appropriate position
    windowGeometry.translate(windowPos[0], windowPos[1], windowPos[2]);

    // Create Three.js meshes
    const wallMesh = new THREE.Mesh(wallGeometry);
    const windowMesh = new THREE.Mesh(windowGeometry);

    // Perform subtraction using ThreeCSG
    const wallCSG = CSG.fromMesh(wallMesh);
    const windowCSG = CSG.fromMesh(windowMesh);
    const resultCSG = wallCSG.subtract(windowCSG);

    // Convert result back to Three.js mesh
    const resultMesh = CSG.toMesh(resultCSG, wallMesh.matrix);
    resultMesh.material = new THREE.MeshStandardMaterial({...wallTexture});

    return <primitive object={resultMesh} position={position} />;
};