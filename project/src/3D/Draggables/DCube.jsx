import { MathUtils, Color } from 'three'
import { useCallback, useRef, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { easing } from 'maath'
import { Grid, useDrag } from './Grid'

export const DCube = ({ position = [0.5, 0.5, -0.5], c = new Color(), round = Math.round, ...props }) => {
    
    const ref = useRef()
    
    const pos = useRef(position)
    
    const onDrag = useCallback(({ x, z }) => {
        pos.current = [x, position[1], z];
    }, []);
    
    const [events, active, hovered] = useDrag(onDrag)
    
    useEffect(() => void (document.body.style.cursor = active ? 'grabbing' : hovered ? 'grab' : 'auto'), [active, hovered])
    
    useFrame((state, delta) => {
        easing.damp3(ref.current.position, pos.current, 0.1, delta)
        easing.dampC(ref.current.material.color, active ? 'white' : hovered ? 'lightblue' : 'orange', 0.1, delta)
    })

    return (
        <mesh ref={ref} castShadow receiveShadow {...events} {...props}>
            <boxGeometry />
            <meshStandardMaterial />
        </mesh>
    )
};