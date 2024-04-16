import { MathUtils, Color } from 'three'
import { useCallback, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useDrag } from './Surface'
import { useGLTF } from '@react-three/drei'

export const DModel = ({ position = [0.5, 0.5, -0.5], c = new Color(), round = Math.round, maxX = 4, maxZ = 4, clamp = MathUtils.clamp, ...props }) => {

    const ref = useRef()
    const pos = useRef(position)

    const { nodes, materials } = useGLTF('/models/tv_wand.gltf')

    const maxX2 = maxX / 2;
    const maxZ2 = maxZ / 2;

    const onDrag = useCallback(({ x, z }) => {
        // Apply boundary checks
        let newX;
        if (x >= 0) {
            newX = Math.min(maxX2 - 2, x);
        } else {
            newX = Math.max(-maxX2 + 0.3, x);
        }

        let newZ;
        if (z >= 0) {
            newZ = Math.min(maxZ2 - 1.3, z);
        } else {
            newZ = Math.max(-maxZ2 + 0.3, z);
        }

        pos.current = [newX, position[1], newZ];

    }, [maxX, maxZ, position]);


    const [events, active, hovered] = useDrag(onDrag)

    useEffect(() => void (document.body.style.cursor = active ? 'grabbing' : hovered ? 'grab' : 'auto'), [active, hovered])

    useFrame((state, delta) => {
        easing.damp3(ref.current.position, pos.current, 0.1, delta)
        easing.dampC(ref.current.material.color, active ? 'white' : hovered ? 'lightblue' : 'orange', 0.1, delta)
    })

    return (
        <>
            <mesh ref={ref} geometry={nodes.tv_wand.geometry} material={nodes.tv_wand.material} castShadow receiveShadow {...events} {...props}>
                <meshStandardMaterial />
            </mesh>
        </>
    )
};

