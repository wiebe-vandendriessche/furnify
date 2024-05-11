import { MathUtils } from 'three'
import { useCallback, useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useDrag } from './Surface'
export const DObstruction = ({ position = [0.5, 0.5, -0.5], dimensions, otype, maxX = 4, maxZ = 4, maxY, clamp = MathUtils.clamp, ...props }) => {
    const ref = useRef();
    const pos = useRef(position);
    const maxX2 = maxX / 2;
    const maxZ2 = maxZ / 2;

    const ceilingHeight = maxY - dimensions[1] / 2;

    const onDrag = useCallback(({ x, z }) => {
        const newY = dimensions[1] / 2;
        const newX = clamp(x, -maxX2 + (dimensions[0] / 2), maxX2 - (dimensions[0] / 2));
        const newZ = clamp(z, -maxZ2 + (dimensions[2] / 2), maxZ2 - (dimensions[2] / 2));
        pos.current = [newX, newY, newZ];
    }, [dimensions, maxX2, maxZ2, maxY, ceilingHeight, clamp]);

    useEffect(() => {
        const [x, y, z] = pos.current;
        const newY = dimensions[1] / 2;
        const newX = clamp(x, -maxX2 + (dimensions[0] / 2), maxX2 - (dimensions[0] / 2));
        const newZ = clamp(z, -maxZ2 + (dimensions[2] / 2), maxZ2 - (dimensions[2] / 2));
        pos.current = [newX, newY, newZ];
    }, [dimensions, maxX2, maxZ2, maxY, ceilingHeight, clamp]);

    const [events, active, hovered] = useDrag(onDrag);

    const [delayedActive, setDelayedActive] = useState(false);
    let timeoutId = null;

    useEffect(() => {
        if (active) {
            // If active is true, set delayedActive to true immediately
            setDelayedActive(true);
            // Clear any existing timeout
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        } else {
            // If active is false, set delayedActive to false after a 2-second delay
            timeoutId = setTimeout(() => {
                setDelayedActive(false);
            }, 500);
        }

        // Clean up on unmount
        return () => {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [active]);

    useEffect(() => {
        document.body.style.cursor = active ? 'grabbing' : hovered ? 'grab' : 'auto';
    }, [active, hovered]);

    useFrame((state, delta) => {
        if (delayedActive) {
            easing.damp3(ref.current.position, pos.current, 0.1, delta);
        } else {
            easing.damp3(ref.current.position, pos.current, 0, delta);
        }
        easing.dampC(ref.current.material.color, active ? 'white' : hovered ? 'lightblue' : '#cc5858', 0.1, delta);
    });

    return (
        <mesh ref={ref} scale={[dimensions[0], dimensions[1], dimensions[2]]} castShadow receiveShadow {...events} {...props}>
            <boxGeometry />
            <meshStandardMaterial />
        </mesh>
    );
};