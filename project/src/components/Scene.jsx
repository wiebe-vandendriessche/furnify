import React from 'react'
import { useDimensions } from './contexts/DimensionContext';
import { Canvas } from '@react-three/fiber';
import { useState } from 'react'
import { OrbitControls, Sky, Stars } from '@react-three/drei'
import { Room } from './roomComponents/Room.tsx'

const Scene = () => {
    const { width, height, depth } = useDimensions();
    return (
        <Canvas className="canvas" camera={{position: [10, 6, 8]}}>
            <ambientLight intensity={.5} />
            <directionalLight position={[0, 100, 100]} />
            <Room width={width} depth={depth} height={height} wallThickness={0.3} floorThickness={0.3} />

            <OrbitControls />

            <Sky distance={450000} sunPosition={[0, 100, 100]} inclination={10} azimuth={0.25} />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            <axesHelper />
        </Canvas>
    )
}

export default Scene