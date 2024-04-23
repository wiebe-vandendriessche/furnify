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
        // Calculate the distance to each wall
        const distanceToRightWall = maxX2 - x;
        const distanceToLeftWall = maxX2 + x;
        const distanceToTopWall = maxZ2 - z;
        const distanceToBottomWall = maxZ2 + z;

        // Find the nearest wall
        const nearestWallDistance = Math.min(distanceToRightWall, distanceToLeftWall, distanceToTopWall, distanceToBottomWall);

        // Calculate the new position based on the nearest wall
        let newX = x;
        let newZ = z;

        if (nearestWallDistance === distanceToRightWall) {
            newX = maxX2 - 2;
        } else if (nearestWallDistance === distanceToLeftWall) {
            newX = -maxX2 + 0.3;
        } else if (nearestWallDistance === distanceToTopWall) {
            newZ = maxZ2 - 1.3;
        } else if (nearestWallDistance === distanceToBottomWall) {
            newZ = -maxZ2 + 0.3;
        }

        pos.current = [newX, position[1], newZ];
    }, [maxX2, maxZ2, position]);


    useEffect(() => {
        const [x, y, z] = pos.current;
        const newX = clamp(x, -maxX + 0.3, maxX - 2);
        const newZ = clamp(z, -maxZ + 0.3, maxZ - 1.3);
        pos.current = [newX, y, newZ];
    }, [maxX, maxZ, clamp]);

    const [events, active, hovered] = useDrag(onDrag);

    useEffect(() => void (document.body.style.cursor = active ? 'grabbing' : hovered ? 'grab' : 'auto'), [active, hovered]);

    useFrame((state, delta) => {
        easing.damp3(ref.current.position, pos.current, 0.1, delta);
        easing.dampC(ref.current.material.color, active ? 'white' : hovered ? 'lightblue' : 'orange', 0.1, delta);
    });

    return (
        <>
            <mesh ref={ref} geometry={nodes.tv_wand.geometry} material={nodes.tv_wand.material} castShadow receiveShadow {...events} {...props}>
                <meshStandardMaterial />
            </mesh>
        </>
    )
};

