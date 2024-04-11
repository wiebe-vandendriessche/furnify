import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, useTexture } from '@react-three/drei';
import { Mesh } from 'three';
import { Wall } from './Wall';
import { WallWithWindow } from './WallWithWindow';
import { Floor } from './Floor';
import { useState, useEffect } from 'react';
import * as THREE from 'three';
import { SideWallWithWindow } from './SideWallWithWindow';
import { useRoomWallLightupContext } from '../../contexts/RoomWallLightupContext';


export const Room = ({ width, depth, height, wallThickness, floorThickness }) => {
  const roomRef = useRef<THREE.Group>(null);

  const { selectedWall } = useRoomWallLightupContext();

  const [ennableFrame, setEnnableFrame] = useState(true);

  const [backWallVisible, setBackWallVisible] = useState(true);
  const [frontWallVisible, setFrontWallVisible] = useState(false);
  const [leftWallVisible, setLeftWallVisible] = useState(true);
  const [rightWallVisible, setRightWallVisible] = useState(false);


  useEffect(() => {
    console.log("test in room: " + selectedWall);
    if (selectedWall != null) {
      setEnnableFrame(false)
      setBackWallVisible(true);
      setFrontWallVisible(true);
      setLeftWallVisible(true);
      setRightWallVisible(true);
      setTimeout(() => {
        setEnnableFrame(true)
      }, 1500); // 1000 milliseconds = 1 second
    } else {
      setEnnableFrame(true)
    }
  }, [selectedWall]);







  // VOORLOPIG RAAMPJE (wordt in de toekomst uit de form gelezen):

  //PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP
  const raambreedte = 3
  const raamhoogte = 1
  //positie relatief van linkeronderhoek
  const vanlinks = 0.5
  const starthoogte = 0.5
  //PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP




  useFrame(({ camera, clock }) => {
    if (ennableFrame) {
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
    }
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
        giveColor={selectedWall === "back" ? true : false} // Change color based on selectedWall
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
        giveColor={selectedWall === "front" ? true : false}  // Change color based on selectedWall
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
        giveColor={selectedWall === "left" ? true : false} // Change color based on selectedWall
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
        giveColor={selectedWall === "right" ? true : false} // Change color based on selectedWall
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




