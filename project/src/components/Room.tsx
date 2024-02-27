// import React from "react";

// interface Props {
//     width: number;
//     length: number;
//     height: number
// }

// const Room = ({ width, length, height }: Props) => {
//   return <>
//     <mesh>
//         <boxGeometry args={[width, height, length]}/>
//         <meshStandardMaterial color={"white"}/>
//     </mesh>
//   </>;
// };

// export default Room;

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import { Mesh } from 'three';

const Room = ({ width, depth, height, wallThickness, floorThickness }) => {
  // Define refs for the walls and the floor
  const backWallRef = useRef<Mesh>(null);
  const frontWallRef = useRef<Mesh>(null);
  const leftWallRef = useRef<Mesh>(null);
  const rightWallRef = useRef<Mesh>(null);
  const floorRef = useRef<Mesh>(null);

  useFrame(({ camera }) => {
    if (backWallRef.current) {
      backWallRef.current.visible = camera.position.z > 0;
    }
    if (frontWallRef.current) {
      frontWallRef.current.visible = camera.position.z <= 0;
    }
    // Logic for left and right walls
    if (leftWallRef.current) {
      leftWallRef.current.visible = camera.position.x > 0;
    }
    if (rightWallRef.current) {
      rightWallRef.current.visible = camera.position.x <= 0;
    }
  });
  
  return (
    <>
      {/* Back Wall */}
      <Box ref={backWallRef} args={[width, height, wallThickness]} position={[0, height / 2, -depth / 2 + wallThickness / 2]} />
      {/* Front Wall */}
      <Box ref={frontWallRef} args={[width, height, wallThickness]} position={[0, height / 2, depth / 2 - wallThickness / 2]} />
      {/* Left Wall */}
      <Box ref={leftWallRef} args={[wallThickness, height, depth]} position={[-width / 2 + wallThickness / 2, height / 2, 0]} />
      {/* Right Wall */}
      <Box ref={rightWallRef} args={[wallThickness, height, depth]} position={[width / 2 - wallThickness / 2, height / 2, 0]} />
      {/* Floor */}
      <Box ref={floorRef} args={[width, floorThickness, depth]} position={[0, -floorThickness / 2, 0]} />
    </>
  );
};


export default Room;




