import { MathUtils, Color } from 'three'
import { useCallback, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useDrag } from './Surface'

export const DObstruction = ({ position = [0.5, 0.5, -0.5], dimensions, c = new Color(), round = Math.round, maxX = 4, maxZ = 4, clamp = MathUtils.clamp, ...props }) => {
    
    const ref = useRef()
    const pos = useRef(position)

    const maxX2 = maxX / 2;
    const maxZ2 = maxZ / 2;

    const onDrag = useCallback(({ x, z }) => {
        // Apply boundary checks
        let newX;
        if (x >= 0) {
            newX = Math.min(maxX2 - (dimensions[0]/2) - 0.3 , x);
        } else {
            newX = Math.max(-maxX2 + (dimensions[0]/2) + 0.3 , x);
        }

        let newZ;
        if (z >= 0) {
            newZ = Math.min(maxZ2 - (dimensions[2]/2) - 0.3, z);
        } else {
            newZ = Math.max(-maxZ2 + (dimensions[2]/2) + 0.3, z);
        }
        pos.current = [newX, pos.current[1], newZ];
    }, [maxX, maxZ, dimensions]);

    const [events, active, hovered] = useDrag(onDrag)

    // Update positionheight whenever dimensions height changes
    useEffect(() => {
        pos.current[1] = dimensions[1] / 2; // Set positionheight to half of dimensions height
    }, [dimensions]);

    useEffect(() => void (document.body.style.cursor = active ? 'grabbing' : hovered ? 'grab' : 'auto'), [active, hovered])

    useFrame((state, delta) => {
        easing.damp3(ref.current.position, pos.current, 0.1, delta)
        easing.dampC(ref.current.material.color, active ? 'white' : hovered ? 'lightblue' : '#cc5858', 0.1, delta)
    })

    return (
        
        <mesh ref={ref} scale={[dimensions[0], dimensions[1], dimensions[2]]} castShadow receiveShadow {...events} {...props}>
            <boxGeometry />
            <meshStandardMaterial />
        </mesh>
    )
};