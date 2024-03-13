import React from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useDrag } from '@use-gesture/react';
import { useState, useRef } from 'react'
import { OrbitControls, Sky, Stars } from '@react-three/drei'
import { Room } from './roomComponents/Room.tsx'
import { Ground } from './other/Ground.jsx'
import { useConfiguratorContext } from '../contexts/ConfiguratorContext.jsx';
import { Tv_wand } from './models/Tv_wand.jsx';
import { Bed } from './models/Bed.jsx';
import { Bed_assembly } from './models/Bed_assembly.jsx';
// import { DraggableDodecahedron } from './Draggable.jsx';


const DraggableDodecahedron = () => {
    const colors = ['hotpink', 'red', 'blue', 'green', 'yellow'];
    const ref = useRef();
    const orbitControlsRef = useRef();
    const [colorIdx, setColorIdx] = useState(0);
    const [position, setPosition] = useState([0, 0, 0]);
    const { size, viewport } = useThree();
    const aspect = size.width / viewport.width;
    useFrame(() => {
        ref.current.rotation.z += 0.01;
        ref.current.rotation.x += 0.01;
    });
    const bind = useDrag(
        ({ down, offset: [x, y] }) => {
            if (orbitControlsRef.current) {
                orbitControlsRef.current.enabled = !down;
            }
            const [, , z] = position;
            setPosition([x / aspect, -y / aspect, z]);
        },
        { pointerEvents: true }
    );

    return (
        <>
            <OrbitControls ref={orbitControlsRef} />
            <mesh
                position={position}
                {...bind()}
                ref={ref}
                onClick={(e) => {
                    setColorIdx((prevIdx) => (prevIdx === 4 ? 0 : prevIdx + 1));
                }}
                onPointerOver={(e) => console.log('hover')}
                onPointerOut={(e) => console.log('unhover')}
            >
                <boxGeometry args={[1, 1, 1]} />
                <meshLambertMaterial color={colors[colorIdx]} />
            </mesh>
        </>
    );
}




const Scene = () => {
    const { dimensions } = useConfiguratorContext();
    let width = dimensions.width;
    let depth = dimensions.length;
    let height = dimensions.height;
    return (
        <Canvas className="canvas" camera={{ position: [10, 6, 8] }} style={{ backgroundColor: 'lightblue' }}>
            <ambientLight intensity={.5} />
            <directionalLight position={[-10, 6, -8]} />
            <DraggableDodecahedron />
            <Room width={width} depth={depth} height={height} wallThickness={0.3} floorThickness={0.3} />
            <fog attach="fog" args={['lightblue', 1, 500]} />
            <Ground />

            <Stars radius={500} depth={50} count={8000} factor={15} saturation={50} fade speed={1} />

            <hemisphereLight color="lightblue" groundColor="0xf7e497" intensity={0.5} />
            <axesHelper />
        </Canvas>
    )
}

export default Scene