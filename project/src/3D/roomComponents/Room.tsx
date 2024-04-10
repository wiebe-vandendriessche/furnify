import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, useTexture } from '@react-three/drei';
import { Mesh } from 'three';
import { Wall } from './Wall';
import { WallWithWindow } from './WallWithWindow';
import { Floor } from './Floor';
import { useState } from 'react';
import * as THREE from 'three';
import { SideWallWithWindow } from './SideWallWithWindow';

export const Room = ({ width, depth, height, wallThickness, floorThickness }) => {
  const roomRef = useRef<THREE.Group>(null);

  const [backWallVisible, setBackWallVisible] = useState(true);
  const [frontWallVisible, setFrontWallVisible] = useState(false);
  const [leftWallVisible, setLeftWallVisible] = useState(true);
  const [rightWallVisible, setRightWallVisible] = useState(false);


  
  // VOORLOPIG RAAMPJE (wordt in de toekomst uit de form gelezen):

  //PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
  const raambreedte = 3
  const raamhoogte = 1.5
  //positie relatief van linkeronderhoek
  const vanlinks = 1
  const starthoogte = 0.5
  //PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP




  useFrame(({ camera, clock }) => {

    // Determines how soon walls appear/dissapear when orbiting around the romom
    let viewWallValue = 2

    let newBackWallVisible = camera.position.z >= -viewWallValue;
    let newFrontWallVisible = camera.position.z <= viewWallValue;
    let newLeftWallVisible = camera.position.x >= -viewWallValue;
    let newRightWallVisible = camera.position.x <= viewWallValue;

    setBackWallVisible(newBackWallVisible);
    setFrontWallVisible(newFrontWallVisible);
    setLeftWallVisible(newLeftWallVisible);
    setRightWallVisible(newRightWallVisible);

    // //rotate
    //  // Define the radius of the circle path and the speed of rotation
    //  const radius = 10; // Adjust based on your scene size
    //  const speed = 0.5; // Adjust for rotation speed

    //  // Calculate the camera's new position over time
    //  const angle = clock.getElapsedTime() * speed;
    //  camera.position.x = radius * Math.sin(angle);
    //  camera.position.z = radius * Math.cos(angle);
    //  camera.lookAt(new THREE.Vector3(0, height / 2, 0));
  });

  return (
    <group ref={roomRef}>
      {/* Back Wall */}
      <WallWithWindow
        width={width}
        height={height}
        depth={wallThickness}
        position={[0, height / 2, -depth / 2 + wallThickness / 2]}
        visible={backWallVisible}
        windowStartHeight={(-height / 2) + raamhoogte / 2 + starthoogte}
        windowStartFromLeft={(-width / 2) + raambreedte / 2 + 0.3 + vanlinks}
        windowWidth={raambreedte} // Adjust window width as needed
        windowHeight={raamhoogte} // Adjust window height as needed
      />
      {/* Front Wall */}
      <WallWithWindow
        width={width}
        height={height}
        depth={wallThickness}
        position={[0, height / 2, depth / 2 - wallThickness / 2]}
        visible={frontWallVisible}
        windowStartHeight={(-height / 2) + raamhoogte / 2 + starthoogte}
        windowStartFromLeft={-((-width / 2) + raambreedte / 2 + 0.3 + vanlinks)}
        windowWidth={raambreedte} // Adjust window width as needed
        windowHeight={raamhoogte} // Adjust window height as needed
      />
      {/* Left Wall */}
      <SideWallWithWindow
        width={wallThickness}
        height={height}
        depth={depth}
        position={[-width / 2 + wallThickness / 2, height / 2, 0]}
        visible={leftWallVisible}
        windowStartHeight={(-height / 2) + raamhoogte / 2 + starthoogte}
        windowStartFromLeft={-((-depth / 2) + raambreedte / 2 + 0.3 + vanlinks)}
        windowWidth={raambreedte} // Adjust window width as needed
        windowHeight={raamhoogte} // Adjust window height as needed
      />
      {/* Right Wall */}
      <SideWallWithWindow
        width={wallThickness}
        height={height}
        depth={depth}
        position={[width / 2 - wallThickness / 2, height / 2, 0]}
        visible={rightWallVisible}
        windowStartHeight={(-height / 2) + raamhoogte / 2 + starthoogte}
        windowStartFromLeft={(-depth / 2) + raambreedte / 2 + 0.3 + vanlinks}
        windowWidth={raambreedte} // Adjust window width as needed
        windowHeight={raamhoogte} // Adjust window height as needed
      />
      {/* Floor */}
      <Floor
        width={width}
        height={floorThickness}
        depth={depth}
        position={[0, -floorThickness / 2, 0]}
      />
    </group>
  );
};

export default Room



