import React from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useState, useRef } from 'react'
import { OrbitControls, Sky, Stars } from '@react-three/drei'
import { Room } from './roomComponents/Room.tsx'
import { Ground } from './other/Ground.jsx'
import { useConfiguratorContext } from '../contexts/ConfiguratorContext.jsx';
import { Tv_wand } from './models/Tv_wand.jsx';
import { Bed } from './models/Bed.jsx';
import { Bed_assembly } from './models/Bed_assembly.jsx';
import { DCube } from './Draggables/DCube.jsx';
import { Grid, useDrag } from './Draggables/Grid.jsx'



const Scene = () => {
    const { dimensions } = useConfiguratorContext();
    let width = dimensions.width;
    let depth = dimensions.length;
    let height = dimensions.height;
    return (
        <Canvas className="canvas" camera={{ position: [10, 6, 8] }} style={{ backgroundColor: 'lightblue' }}>
            <ambientLight intensity={.5} />
            <directionalLight position={[-10, 6, -8]} />
            <Room width={width} depth={depth} height={height} wallThickness={0.3} floorThickness={0.3} />
            <fog attach="fog" args={['lightblue', 1, 500]} />
            <Ground />
            <Grid scale={10}>
                <DCube position={[0.5, 1, -0.5]} scale={[1, 2, 1]} maxX={width} maxZ={depth}/>
            </Grid>
            <OrbitControls makeDefault />
            <Stars radius={500} depth={50} count={8000} factor={15} saturation={50} fade speed={1} />
            <hemisphereLight color="lightblue" groundColor="0xf7e497" intensity={0.5} />
            <axesHelper />
        </Canvas>
    )
}

export default Scene