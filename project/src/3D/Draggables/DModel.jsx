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

    const width = 1.7
    const depth = 1

    const maxX2 = maxX / 2;
    const maxZ2 = maxZ / 2;

    const onDrag = useCallback(({ x, z }) => {
        // Calculate the distance to each wall
        const distanceToRightWall = maxX2 - x - width;
        const distanceToLeftWall = maxX2 + x;
        const distanceToFrontWall = maxZ2 - z - depth;
        const distanceToBackWall = maxZ2 + z;

        // Find the nearest wall
        const nearestWallDistance = Math.min(distanceToRightWall, distanceToLeftWall, distanceToFrontWall, distanceToBackWall);

        let newX = x;
        let newZ = z;

        // base new coordinates on the coordinate of the closest wall
        if (nearestWallDistance === distanceToRightWall) {
            newX = maxX2 - width;
        } else if (nearestWallDistance === distanceToLeftWall) {
            newX = -maxX2;
        } else if (nearestWallDistance === distanceToFrontWall) {
            newZ = maxZ2 - depth;
        } else if (nearestWallDistance === distanceToBackWall) {
            newZ = -maxZ2
        }

        // Ensure that the new position stays within bounds when dragging
        newX = clamp(newX, -maxX2, maxX2 - width);
        newZ = clamp(newZ, -maxZ2, maxZ2 - depth);

        //update position
        pos.current = [newX, position[1], newZ];

    }, [maxX2, maxZ2, position, clamp, width, depth]);

    // makes sure when enlarging the room the model sticks to the wall in x 
    useEffect(() => {
        const [x, y, z] = pos.current;
        let newX;
        if (x < 0) {
            newX = -maxX2;
        } else {
            newX = maxX2 - width
        }
        pos.current = [newX, y, z];
    }, [maxX2, width, depth]);

    // makes sure when enlarging the room the model sticks to the wall in z
    useEffect(() => {
        const [x, y, z] = pos.current;
        let newZ;
        if (z < 0) {
            newZ = -maxZ2;
        } else {
            newZ = maxZ2 - depth;
        }
        pos.current = [x, y, newZ];
    }, [maxZ2, width, depth]);


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

