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
import { Surface } from './Draggables/Surface.jsx';
import { DModel } from './Draggables/DModel.jsx';
import { DObstruction } from './Draggables/DObstruction.jsx';
import { DLight } from './Draggables/DLight.jsx';
import { DWalloutlet } from './Draggables/DWalloutlet.jsx';


const Scene = () => {
    const { dimensions } = useConfiguratorContext();

    let width = dimensions.width;
    let depth = dimensions.length;
    let height = dimensions.height;

    const { getOtherObstacles } = useConfiguratorContext();
    const { getLights } = useConfiguratorContext();
    const { getWalloutlets } = useConfiguratorContext();

    const obstacles = getOtherObstacles();
    const lights = getLights();

    return (
        <Canvas className="canvas" camera={{ position: [10, 6, 8] }} style={{ backgroundColor: 'lightblue' }}>
            <ambientLight intensity={.5} />
            <directionalLight position={[-10, 6, -8]} />

            <Room width={width} depth={depth} height={height} wallThickness={0.3} floorThickness={0.3} />

            <fog attach="fog" args={['lightblue', 1, 500]} />
            <Ground />
            <Surface surfX={width} surfZ={depth}>
                {/* Render DObstruction for each obstacle */}
                {obstacles.map((obstacle) => (
                    <DObstruction
                        key={obstacle.id}
                        position={[0,0,0]}
                        dimensions={[obstacle.width /100, obstacle.height/100, obstacle.obstLength/100]}
                        maxX={width} 
                        maxZ={depth}
                        maxY={height}
                        otype={obstacle.type}
                    // Pass any other necessary props to DObstruction
                    />
                ))}
                {lights.map((light) => (
                    <DLight
                        key={light.id}
                        position={[0,0,0]}
                        dimensions={[light.width /100, light.height/100, light.obstLength/100]}
                        maxX={width} 
                        maxZ={depth}
                        maxY={height}
                        otype={light.type}
                    // Pass any other necessary props to DObstruction
                    />
                ))}
                {/* 
                <DCube position={[0.5, 1, -0.5]} scale={[1, 2, 1]} maxX={width} maxZ={depth} />
                <DCube position={[2, 1, -1]} scale={[1, 2, 1]} maxX={width} maxZ={depth} />
                */}
                <DModel position={[-1, 0, 2]} scale={0.001} maxX={width} maxZ={depth} />
            </Surface>

            <OrbitControls makeDefault enablePan={false} minDistance={5} maxDistance={20} minPolarAngle={0} maxPolarAngle={Math.PI - Math.PI / 2} />

            <Stars radius={500} depth={50} count={8000} factor={15} saturation={50} fade speed={1} />
            <hemisphereLight color="lightblue" groundColor="0xf7e497" intensity={0.5} />
            <axesHelper />
        </Canvas>
    )
}

export default Scene