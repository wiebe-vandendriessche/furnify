import { MathUtils, Color } from 'three'
import { useCallback, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useDrag } from './Surface'

export const Window = ({ position = [0.5, 0.5, -0.5], round = Math.round, maxX = 4, maxZ = 4, clamp = MathUtils.clamp, wall=false , ...props }) => {
    console.log("Window called for wall:"+ wall)
    const ref = useRef()
    const pos = useRef(position)

    const maxX2 = maxX / 2 - 0.8;
    const maxZ2 = maxZ / 2 - 0.8;

    const onDrag = useCallback(({ x, z }) => {
        // Apply boundary checks
        const newX = Math.max(-maxX2, Math.min(maxX2, x));
        const newZ = Math.max(-maxZ2, Math.min(maxZ2, z));
        pos.current = [newX, position[1], newZ];
    }, [maxX, maxZ, position]);

    const [events, active, hovered] = useDrag(onDrag)

    useEffect(() => void (document.body.style.cursor = active ? 'grabbing' : hovered ? 'grab' : 'auto'), [active, hovered])

    useFrame((state, delta) => {
        easing.damp3(ref.current.position, pos.current, 0.1, delta)
        easing.dampC(ref.current.material.color, active ? 'white' : hovered ? 'lightblue' : 'orange', 0.1, delta)
    })

    return (

        <mesh ref={ref} castShadow receiveShadow {...events} {...props}>
            <boxGeometry />
            <meshStandardMaterial transparent opacity={0.5} colorWrite={false}/>
        </mesh>
    )
};