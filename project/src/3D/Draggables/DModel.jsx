import { MathUtils, Color } from 'three'
import { useCallback, useRef, useEffect, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useDrag } from './Surface'
import { useGLTF } from '@react-three/drei'
import { useConfiguratorContext } from '../../contexts/ConfiguratorContext'

export const DModel = ({ position = [0.5, 0.5, -0.5], c = new Color(), round = Math.round, maxX = 4, maxZ = 4, clamp = MathUtils.clamp, ...props }) => {

    const group= useRef();
    const pos = useRef(position)

    const [width, setModelWidth] = useState(1.7);
    const [depth, setModelDepth] = useState(3.150);
    const { specs,modelRotation } = useConfiguratorContext();
    //const { nodes, materials } = useGLTF('/models/tv_wand_'+specs.color+'_'+specs.material+'.gltf')
    const { nodes, materials } = useGLTF('/models/final_try.gltf')


    // swapping depth and width depending on rotation
    useEffect(() => {
        if (modelRotation === 0) {
            setModelWidth(1.7);
            setModelDepth(3.150);
        } else if (modelRotation === Math.PI / 2) {
            setModelWidth(3.150);
            setModelDepth(1.7);
        } else if (modelRotation === Math.PI) {
            setModelWidth(1.7);
            setModelDepth(3.150);
        } else if (modelRotation === -Math.PI / 2) {
            setModelWidth(3.150);
            setModelDepth(1.7);
        }
    }, [modelRotation]);


    const maxX2 = maxX / 2;
    const maxZ2 = maxZ / 2;

    const onDrag = useCallback(({ x, z }) => {

        let distanceToRightWall;
        let distanceToLeftWall;
        let distanceToFrontWall;
        let distanceToBackWall;

        //calculate distance to wall depending on its rotation the calcultation is different
        if (modelRotation === 0) {
            // Calculate the distance to each wall
            distanceToRightWall = maxX2 - x - width;
            distanceToLeftWall = maxX2 + x;
            distanceToFrontWall = maxZ2 - z - depth;
            distanceToBackWall = maxZ2 + z;
        } else if (modelRotation === Math.PI / 2) {
            // Calculate the distance to each wall
            distanceToRightWall = maxX2 - x - width;
            distanceToLeftWall = maxX2 + x;
            distanceToFrontWall = maxZ2 - z;
            distanceToBackWall = maxZ2 + z - depth;
        } else if (modelRotation === Math.PI) {
            // Calculate the distance to each wall
            distanceToRightWall = maxX2 - x;
            distanceToLeftWall = maxX2 + x - width;
            distanceToFrontWall = maxZ2 - z;
            distanceToBackWall = maxZ2 + z - depth;
        } else if (modelRotation === -Math.PI / 2) {
            // Calculate the distance to each wall
            distanceToRightWall = maxX2 - x;
            distanceToLeftWall = maxX2 + x - width;
            distanceToFrontWall = maxZ2 - z - depth;
            distanceToBackWall = maxZ2 + z;
        }

        // Find the nearest wall
        const nearestWallDistance = Math.min(distanceToRightWall, distanceToLeftWall, distanceToFrontWall, distanceToBackWall);

        let newX = x;
        let newZ = z;

        //new coordinates calculation for each rotation different
        if (modelRotation === 0) {
            if (nearestWallDistance === distanceToRightWall) {
                newX = maxX2 - width;
            } else if (nearestWallDistance === distanceToLeftWall) {
                newX = -maxX2;
            } else if (nearestWallDistance === distanceToFrontWall) {
                newZ = maxZ2 - depth;
            } else if (nearestWallDistance === distanceToBackWall) {
                newZ = -maxZ2
            }

            newX = clamp(newX, -maxX2, maxX2 - width);
            newZ = clamp(newZ, -maxZ2, maxZ2 - depth);

        } else if (modelRotation === Math.PI / 2) {
            if (nearestWallDistance === distanceToRightWall) {
                newX = maxX2 - width;
            } else if (nearestWallDistance === distanceToLeftWall) {
                newX = -maxX2;
            } else if (nearestWallDistance === distanceToFrontWall) {
                newZ = maxZ2;
            } else if (nearestWallDistance === distanceToBackWall) {
                newZ = -maxZ2 + depth;
            }

            newX = clamp(newX, -maxX2, maxX2 - width);
            newZ = clamp(newZ, -maxZ2 + depth, maxZ2);

        } else if (modelRotation === Math.PI) {
            if (nearestWallDistance === distanceToRightWall) {
                newX = maxX2;
            } else if (nearestWallDistance === distanceToLeftWall) {
                newX = -maxX2 + width;
            } else if (nearestWallDistance === distanceToFrontWall) {
                newZ = maxZ2;
            } else if (nearestWallDistance === distanceToBackWall) {
                newZ = -maxZ2 + depth;
            }

            newX = clamp(newX, -maxX2 + width, maxX2);
            newZ = clamp(newZ, -maxZ2 + depth, maxZ2);

        } else if (modelRotation === -Math.PI / 2) {
            if (nearestWallDistance === distanceToRightWall) {
                newX = maxX2;
            } else if (nearestWallDistance === distanceToLeftWall) {
                newX = -maxX2 + width;
            } else if (nearestWallDistance === distanceToFrontWall) {
                newZ = maxZ2 - depth;
            } else if (nearestWallDistance === distanceToBackWall) {
                newZ = -maxZ2
            }

            newX = clamp(newX, -maxX2 + width, maxX2);
            newZ = clamp(newZ, -maxZ2, maxZ2 - depth);
        }

        //update position
        pos.current = [newX, position[1], newZ];

    }, [maxX2, maxZ2, position, clamp, width, depth, modelRotation]);

    // makes sure when enlarging the room or rotating the model sticks to the wall in x
    useEffect(() => {
        const [x, y, z] = pos.current;
        let newX = x
        // different calculation for different rotations
        if (modelRotation === 0) {
            newX = x < 0 ? -maxX2 : maxX2 - width;
        } else if (modelRotation === Math.PI / 2) {
            newX = x < 0 ? -maxX2 : maxX2 - width;
        } else if (modelRotation === Math.PI) {
            newX = x < 0 ? -maxX2 + width : maxX2;
        } else if (modelRotation === -Math.PI / 2) {
            newX = x < 0 ? -maxX2 + width : maxX2;
        }
        pos.current = [newX, y, z];
    }, [maxX2, width, modelRotation]);

    // makes sure when enlarging the room or rotating the model sticks to the wall in z
    useEffect(() => {
        const [x, y, z] = pos.current;
        let newZ = z
        // different calculation for different rotations
        if (modelRotation === 0) {
            newZ = z < 0 ? -maxZ2 : maxZ2 - depth;
        } else if (modelRotation === Math.PI / 2) {
            newZ = z < 0 ? -maxZ2 + depth : maxZ2;
        } else if (modelRotation === Math.PI) {
            newZ = z < 0 ? -maxZ2 + depth : maxZ2;
        } else if (modelRotation === -Math.PI / 2) {
            newZ = z < 0 ? -maxZ2 : maxZ2 - depth;
        }
        pos.current = [x, y, newZ];
    }, [maxZ2, depth, modelRotation]);


    const [events, active, hovered] = useDrag(onDrag);

    useEffect(() => void (document.body.style.cursor = active ? 'grabbing' : hovered ? 'grab' : 'auto'), [active, hovered]);

    const [originalColors, setOriginalColors] = useState([]);

// Sla de oorspronkelijke kleuren op wanneer het component wordt gemonteerd
    useEffect(() => {
        // Sla de oorspronkelijke kleuren van de materialen op
        const originalColors = nodes.bureaum_kastm_kast.children.map(object => object.material.color.clone());
        console.log(originalColors)
        setOriginalColors(originalColors);
    }, [specs.color, nodes]);

    useFrame((state, delta) => {
        easing.damp3(group.current.position, pos.current, 0.1, delta);
        group.current.children.forEach((object, i) => {
            // Gebruik de opgeslagen oorspronkelijke kleuren om de kleur terug te zetten wanneer het hover-effect eindigt
            const originalColor = originalColors[i];
            easing.dampC(object.material.color, active ? 'orange' : hovered ? 'lightblue' : originalColor, 0.1, delta);
        });
    });
    console.log("MODELROTATION")
    console.log(modelRotation);
    console.log(nodes)
    return (
        <>
            <group ref={group} rotation={[0, modelRotation, 0]} {...events} {...props} dispose={null}>
                { nodes.bureaum_kastm_kast.children.map(function(object, i){
                    console.log(object.material);
                    return <mesh key={"texture"+i.toString()} geometry={object.geometry} castShadow receiveShadow material={object.material} />;
                })}
            </group>

        </>
    )
};