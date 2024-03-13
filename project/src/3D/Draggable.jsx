import ReactDOM from 'react-dom';
import React, { useRef, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useDrag } from '@use-gesture/react';
import { Box } from '@react-three/drei';
// import './index.css';

export const DraggableDodecahedron = () => {
    const colors = ['hotpink', 'red', 'blue', 'green', 'yellow'];
    const ref = useRef();
    const [colorIdx, setColorIdx] = useState(0);
    const [position, setPosition] = useState([0, 0, 0]);
    const { size, viewport } = useThree();
    const aspect = size.width / viewport.width;
    useFrame(() => {
        ref.current.rotation.z += 0.01;
        ref.current.rotation.x += 0.01;
    });
    const bind = useDrag(
        ({ offset: [x, y] }) => {
            const [, , z] = position;
            setPosition([x / aspect, -y / aspect, z]);
        },
        { pointerEvents: true }
    );

    return (
        // <Box position={position} ref={ref}/>
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

    );
}