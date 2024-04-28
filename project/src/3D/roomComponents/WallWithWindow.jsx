import React from 'react';
import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import { useTexture } from '@react-three/drei';
import { useEffect } from 'react';
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { WallMesh } from './WallMesh';

export const WallWithWindow = ({ width, height, depth, position, visible, windows, doors, walloutlets, switches, giveColor, wall }) => {

  //const windowPos = [windowStartFromLeft, windowStartHeight, 0]; // Position of the window relative to the lower left corner of the wall

  const wallTexture = useTexture({
    map: './textures/beige_wall/beige_wall_001_ao_1k.jpg',
    aoMap: './textures/beige_wall/beige_wall_001_arm_1k.jpg',
    // roughnessMap: './textures/beige_wall/beige_wall_001_arm_1k.jpg', // uit om glans te voorkomen
    metalnessMap: './textures/beige_wall/beige_wall_001_arm_1k.jpg',
    normalMap: './textures/beige_wall/beige_wall_001_arm_1k.jpg',
  });



  // Apply texture repetition to all textures
  useEffect(() => {
    const repeatTextures = [
      wallTexture.map,
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
        <WallMesh
          width={width}
          height={height}
          depth={depth}
          position={position}
          windows={windows}
          doors={doors}
          walloutlets={walloutlets}
          switches={switches}
          wallTexture={wallTexture}
          giveColor={giveColor}
          wall={wall}
        />
      )}
    </>
  );
};

