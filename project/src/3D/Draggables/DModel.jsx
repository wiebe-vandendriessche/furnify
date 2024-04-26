import { MathUtils, Color } from 'three'
import { useCallback, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useDrag } from './Surface'
import { useGLTF } from '@react-three/drei'
//import {useConfiguratorContext} from "../../contexts/ConfiguratorContext.jsx";

export const DModel = ({ position = [0.5, 0.5, -0.5], c = new Color(), round = Math.round, maxX = 4, maxZ = 4, clamp = MathUtils.clamp, ...props }) => {
    //const {specs, setSpecs} = useConfiguratorContext();

    const ref = useRef()
    const pos = useRef(position)

    let { nodes, materials } = useGLTF('/models/tv_wand_white.gltf')
    console.log("MATERIALS");
    console.log(materials);
    console.log("NODES");
    console.log(nodes)
    const maxX2 = maxX / 2;
    const maxZ2 = maxZ / 2;

    const onDrag = useCallback(({ x, z }) => {
        const newX = clamp(x, -maxX2 + 0.3, maxX2 - 2);
        const newZ = clamp(z, -maxZ2 + 0.3, maxZ2 - 1.3);
        pos.current = [newX, position[1], newZ];
    }, [maxX, maxZ, position, clamp]);


    //--make sure object is never outside boundary--

    const updatePosition = useCallback(() => {
        const [x, y, z] = pos.current;
        const newX = clamp(x, -maxX2 + 0.3, maxX2 - 2);
        const newZ = clamp(z, -maxZ2 + 0.3, maxZ2 - 1.3);
        pos.current = [newX, y, newZ];
    }, [maxX2, maxZ2, clamp]);

    useEffect(() => {
        updatePosition();
    }, [updatePosition]);

    //----------------------------------------------

    const [events, active, hovered] = useDrag(onDrag)

    useEffect(() => void (document.body.style.cursor = active ? 'grabbing' : hovered ? 'grab' : 'auto'), [active, hovered])

    useFrame((state, delta) => {
        easing.damp3(ref.current.position, pos.current, 0.1, delta)
        easing.dampC(ref.current.material.color, active ? 'white' : hovered ? 'lightblue' : 'white', 0.1, delta)
    })

    return (
        <>
            <mesh ref={ref} geometry={nodes.tv_wand001.geometry} material={materials["Material.001"]} castShadow receiveShadow {...events} {...props}>
                <meshStandardMaterial />
            </mesh>
        </>
    )
};

