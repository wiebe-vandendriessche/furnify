import React, { Suspense } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useState, useRef, useEffect } from 'react'
import { OrbitControls, Sky, Stars } from '@react-three/drei'
import { Room } from './roomComponents/Room.tsx'
import { Ground } from './other/Ground.jsx'
import { useConfiguratorContext } from '../contexts/ConfiguratorContext.jsx';
import { Tv_wand } from './models/Tv_wand.jsx';
import { Bed } from './models/Bed.jsx';
import { Bed_assembly } from './models/Bed_assembly.jsx';
import { DCube } from './Draggables/DCube.jsx';
import { Surface } from './Draggables/Surface.jsx';
import { DModel } from './Draggables/DModel.jsx';
import { DObstruction } from './Draggables/DObstruction.jsx';
import { DLight } from './Draggables/DLight.jsx';
import { CubeTextureLoader } from 'three';


const Skybox = ({ path }) => {
    const { scene } = useThree();

    useEffect(() => {
        if (path == "day") {
            console.log("Loading skybox images...");
            const textureLoader = new CubeTextureLoader();
            textureLoader.load([
                '/other/skyboxes/day/xpos.bmp',
                '/other/skyboxes/day/xneg.bmp',
                '/other/skyboxes/day/ypos.bmp',
                '/other/skyboxes/day/yneg.bmp',
                '/other/skyboxes/day/zpos.bmp',
                '/other/skyboxes/day/zneg.bmp',
            ], (texture) => {
                scene.background = texture;
                console.log("Skybox texture loaded successfully:", texture);
            }, undefined, (error) => {
                console.error("Error loading skybox texture:", error);
            });
        } else if (path == "night") {
            console.log("Loading nightbox images...");
            const textureLoader = new CubeTextureLoader();
            textureLoader.load([
                '/other/skyboxes/night/xpos.png',
                '/other/skyboxes/night/xneg.png',
                '/other/skyboxes/night/ypos.png',
                '/other/skyboxes/night/yneg.png',
                '/other/skyboxes/night/zpos.png',
                '/other/skyboxes/night/zneg.png',
            ], (texture) => {
                scene.background = texture;
                console.log("Nightbox texture loaded successfully:", texture);
            }, undefined, (error) => {
                console.error("Error loading nightbox texture:", error);
            });
        }
    }, [scene, path]);

    return null;
};


const Scene = () => {
    const { dimensions } = useConfiguratorContext();

    let width = dimensions.width;
    let depth = dimensions.length;
    let height = dimensions.height;

    const { getOtherObstacles } = useConfiguratorContext();
    const { getLights } = useConfiguratorContext();

    const obstacles = getOtherObstacles();
    const lights = getLights();

    const [skyboxPath, setSkyboxPath] = useState("day");

    useEffect(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');

        const handleDarkModeChange = (e) => {
            if (e.matches) {
                setSkyboxPath("night");
            } else {
                setSkyboxPath("day");
            }
        };

        prefersDarkMode.addEventListener('change', handleDarkModeChange);

        return () => {
            prefersDarkMode.removeEventListener('change', handleDarkModeChange);
        };
    }, []);

    return (
        <Canvas shadows className="canvas" camera={{ position: [10, 6, 8] }}>
            <Suspense fallback={null}>
                <ambientLight intensity={0.7} />
                <directionalLight castShadow position={[30, 50, 30]} />

                <Room width={width} depth={depth} height={height} wallThickness={0.3} floorThickness={0.3} />


                <Surface surfX={width} surfZ={depth}>
                    {/* Render DObstruction for each obstacle */}
                    {obstacles.map((obstacle) => (
                        <DObstruction
                            key={obstacle.id}
                            position={[0, 0, 0]}
                            dimensions={[obstacle.width / 100, obstacle.height / 100, obstacle.obstLength / 100]}
                            maxX={width}
                            maxZ={depth}
                            maxY={height}
                            otype={obstacle.type}
                        // Pass any other necessary props to DObstruction
                        />
                    ))}
                    {lights.map((light) => (
                        <DLight
                            key={light.id}
                            position={[0, 0, 0]}
                            dimensions={[light.width / 100, light.height / 100, light.obstLength / 100]}
                            maxX={width}
                            maxZ={depth}
                            maxY={height}
                            otype={light.type}
                        // Pass any other necessary props to DObstruction
                        />
                    ))}
                    {/* 
                <DCube position={[0.5, 1, -0.5]} scale={[1, 2, 1]} maxX={width} maxZ={depth} />
                <DCube position={[2, 1, -1]} scale={[1, 2, 1]} maxX={width} maxZ={depth} />
                */}
                    <DModel position={[-1, 0, 2]} scale={0.001} maxX={width} maxZ={depth} />
                </Surface>

                <OrbitControls makeDefault enablePan={false} minDistance={5} maxDistance={50} minPolarAngle={0} maxPolarAngle={Math.PI - Math.PI / 2} />

            </Suspense>
            <Skybox path={skyboxPath} />
        </Canvas>
    )
}

export default Scene