import React from 'react';
import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import { useTexture } from '@react-three/drei';
import { useEffect } from 'react';
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'

export const WallWithWindow = ({ width, height, depth, position, visible, windows, doors, giveColor, wall }) => {

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
        <WindowMesh
          width={width}
          height={height}
          depth={depth}
          position={position}
          windows={windows}
          doors={doors}
          wallTexture={wallTexture}
          giveColor={giveColor}
          wall={wall}
        />
      )}
    </>
  );
};

const WindowMesh = ({ width, height, depth, position, windows, doors, wallTexture, giveColor, wall }) => {
  
  
  const wallGeometry = new THREE.BoxGeometry(width, height, depth);
  const wallMesh = new THREE.Mesh(wallGeometry);
  console.log("DE WINDOWS doorgegeven: " + wall)
  console.log(windows)
  console.log("DE DOORS doorgegeven: " + wall)
  console.log(doors)

  const doorCSGs = doors.map(door => {
    const y = 0;
    const x = parseFloat(door.doorXpos);
    const w_width = parseFloat(door.width);
    const w_height = parseFloat(door.height);

    let doorGeometry;

    if (wall === "back") {
      doorGeometry = new THREE.BoxGeometry(w_width, w_height, depth);
      doorGeometry.translate(x + (w_width / 2) - (width / 2) + 0.3, y + (w_height / 2) - (height / 2), 0);
    }
    if (wall === "front") {
      doorGeometry = new THREE.BoxGeometry(w_width, w_height, depth);
      doorGeometry.translate(-(x + (w_width / 2) - (width / 2) + 0.3), y + (w_height / 2) - (height / 2), 0);
    }
    if (wall === "left") {
      doorGeometry = new THREE.BoxGeometry(depth, w_height, w_width);
      doorGeometry.translate(0, y + (w_height / 2) + (-height / 2), -(x + (w_width / 2) + (-depth / 2) + 0.3));
    }
    if (wall === "right") {
      doorGeometry = new THREE.BoxGeometry(depth, w_height, w_width);
      doorGeometry.translate(0, y + (w_height / 2) + (-height / 2), x + (w_width / 2) + (-depth / 2) + 0.3);
    }

    const doorMesh = new THREE.Mesh(doorGeometry);
    return CSG.fromMesh(doorMesh);
  });


  const windowCSGs = windows.map(window => {
    // Parse window attributes as numbers
    const x = parseFloat(window.windowXpos);
    const y = parseFloat(window.windowYpos);
    const w_width = parseFloat(window.width);
    const w_height = parseFloat(window.height);


    let windowGeometry;

    if (wall === "back") {
      windowGeometry = new THREE.BoxGeometry(w_width, w_height, depth);
      windowGeometry.translate(x + (w_width / 2) - (width / 2) + 0.3, y + (w_height / 2) - (height / 2), 0);
    }
    if (wall === "front") {
      windowGeometry = new THREE.BoxGeometry(w_width, w_height, depth);
      windowGeometry.translate(-(x + (w_width / 2) - (width / 2) + 0.3), y + (w_height / 2) - (height / 2), 0);
    }
    if (wall === "left") {
      windowGeometry = new THREE.BoxGeometry(depth, w_height, w_width);
      windowGeometry.translate(0, y + (w_height / 2) + (-height / 2), -(x + (w_width / 2) + (-depth / 2) + 0.3));
    }
    if (wall === "right") {
      windowGeometry = new THREE.BoxGeometry(depth, w_height, w_width);
      windowGeometry.translate(0, y + (w_height / 2) + (-height / 2), x + (w_width / 2) + (-depth / 2) + 0.3);
    }

    const windowMesh = new THREE.Mesh(windowGeometry);
    return CSG.fromMesh(windowMesh);
  });

  const wallCSG = CSG.fromMesh(wallMesh);
  const resultCSG = [...windowCSGs, ...doorCSGs].reduce((acc, csg) => acc.subtract(csg), wallCSG);
  const resultMesh = CSG.toMesh(resultCSG, wallMesh.matrix);
  resultMesh.material = new THREE.MeshStandardMaterial({ ...wallTexture });

  useFrame((state, delta) => {
    easing.dampC(resultMesh.material.color, giveColor ? 'lightblue' : 'white', 0.1, delta);
  });

  return <primitive object={resultMesh} position={position} />;
};