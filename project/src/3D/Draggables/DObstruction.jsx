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
        let newX = clamp(x, -maxX2 + (dimensions[0] / 2) + 0.3, maxX2 - (dimensions[0] / 2) - 0.3);
        let newZ = clamp(z, -maxZ2 + (dimensions[2] / 2) + 0.3, maxZ2 - (dimensions[2] / 2) - 0.3);
        pos.current = [newX, pos.current[1], newZ];
    }, [maxX2, maxZ2, dimensions, clamp]);


    //--make sure object is never outside boundary--

    const updatePosition = useCallback(() => {
        const [x, y, z] = pos.current;
        let newX = clamp(x, -maxX2 + (dimensions[0] / 2) + 0.3, maxX2 - (dimensions[0] / 2) - 0.3);
        let newZ = clamp(z, -maxZ2 + (dimensions[2] / 2) + 0.3, maxZ2 - (dimensions[2] / 2) - 0.3);
        pos.current = [newX, y, newZ];
    }, [dimensions, maxX2, maxZ2, clamp]);

    useEffect(() => {
        updatePosition();
    }, [dimensions, updatePosition]);

    //----------------------------------------------


    const [events, active, hovered] = useDrag(onDrag)

    //--make sure positions changes according to given height
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