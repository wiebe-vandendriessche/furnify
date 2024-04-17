import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, useTexture } from '@react-three/drei';
import { Mesh } from 'three';
import { Wall } from './Wall';
import { WallWithWindow } from './WallWithWindow';
import { Floor } from './Floor';
import { useState, useEffect } from 'react';
import * as THREE from 'three';
import { useRoomWallLightupContext } from '../../contexts/RoomWallLightupContext';
import { useConfiguratorContext } from '../../contexts/ConfiguratorContext';


export const Room = ({ width, depth, height, wallThickness, floorThickness }) => {
  const roomRef = useRef<THREE.Group>(null);

  const { selectedWall } = useRoomWallLightupContext();

  const [ennableFrame, setEnnableFrame] = useState(true);

  const [backWallVisible, setBackWallVisible] = useState(true);
  const [frontWallVisible, setFrontWallVisible] = useState(false);
  const [leftWallVisible, setLeftWallVisible] = useState(true);
  const [rightWallVisible, setRightWallVisible] = useState(false);

  const { getWindows, getDoors } = useConfiguratorContext()

  const windows = getWindows();
  const doors = getDoors();

  useEffect(() => {
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

  const renderFixValue = 0.001;

  return (
    <group ref={roomRef}>
      <WallWithWindow
        width={width + renderFixValue}
        height={height + renderFixValue}
        depth={wallThickness + renderFixValue}
        position={[0, height / 2, -depth / 2 + wallThickness / 2]}
        visible={backWallVisible}
        windows={windows.filter(window => window.windowWall === "back")}
        doors={doors.filter(door => door.obstacleWall === "back")}
        giveColor={selectedWall === "back" ? true : false} // Change color based on selectedWall
        wall={"back"}
      />
      <WallWithWindow
        width={width + renderFixValue}
        height={height + renderFixValue}
        depth={wallThickness + renderFixValue}
        position={[0, height / 2, depth / 2 - wallThickness / 2]}
        visible={frontWallVisible}
        windows={windows.filter(window => window.windowWall === "front")}
        doors={doors.filter(door => door.obstacleWall === "front")}
        giveColor={selectedWall === "front" ? true : false} // Change color based on selectedWall
        wall={"front"}
      />
      <WallWithWindow
        width={wallThickness}
        height={height}
        depth={depth}
        position={[-width / 2 + wallThickness / 2, height / 2, 0]}
        visible={leftWallVisible}
        windows={windows.filter(window => window.windowWall === "left")}
        doors={doors.filter(door => door.obstacleWall === "left")}
        giveColor={selectedWall === "left" ? true : false} // Change color based on selectedWall
        wall={"left"}
      />
      <WallWithWindow
        width={wallThickness}
        height={height}
        depth={depth}
        position={[width / 2 - wallThickness / 2, height / 2, 0]}
        visible={rightWallVisible}
        windows={windows.filter(window => window.windowWall === "right")}
        doors={doors.filter(door => door.obstacleWall === "right")}
        giveColor={selectedWall === "right" ? true : false} // Change color based on selectedWall
        wall={"right"}
      />
      <Floor
        width={width}
        height={floorThickness}
        depth={depth}
        position={[0, -floorThickness / 2, 0]}
      />
    </group>
  );
};




