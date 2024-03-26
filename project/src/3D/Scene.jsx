import React from 'react'
import { Canvas } from '@react-three/fiber';
import { useState } from 'react'
import { OrbitControls, Sky, Stars } from '@react-three/drei'
import { Room } from './roomComponents/Room.tsx'
import { Ground } from './other/Ground.jsx'
import { useConfiguratorContext } from '../contexts/ConfiguratorContext.jsx';
import { Tv_wand } from './models/Tv_wand.jsx';
import { Bed } from './models/Bed.jsx';
import { Bed_assembly } from './models/Bed_assembly.jsx';


const Scene = () => {
    const { dimensions } = useConfiguratorContext();
    let width = dimensions.width;
    let depth = dimensions.length;
    let height = dimensions.height;
    return (
        <Canvas className="canvas" camera={{position: [10, 6, 8]}} style={{ backgroundColor: 'lightblue' }}>
            <ambientLight intensity={.5} />
            <directionalLight position={[-10, 6, -8]} />
            <Tv_wand />
            <Room width={width} depth={depth} height={height} wallThickness={0.3} floorThickness={0.3}/>
            <fog attach="fog" args={['lightblue', 1, 500]} />
            <Ground />
            <OrbitControls />

            <Stars radius={500} depth={50} count={8000} factor={15} saturation={50} fade speed={1} />
            
            <hemisphereLight color="lightblue" groundColor="0xf7e497" intensity={0.5}/>
            <axesHelper />
        </Canvas>
    )
}

export default Scene