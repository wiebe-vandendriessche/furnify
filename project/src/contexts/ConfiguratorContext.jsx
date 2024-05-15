import { createContext, useContext, useState, useEffect, useRef } from 'react';
import React, { Suspense } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { get, model } from 'mongoose';

const ConfiguratorContext = createContext();

// eslint-disable-next-line react/prop-types
export const ConfiguratorProvider = ({ children }) => {

    const [dimensions, setDimensions] = useState({ length: 6, width: 8, height: 2.5 });

    const [functionalities, setFunctionalities] = useState({ bed: false, sofa: false, office_space: false, storage_space: false })
    const [specs, setSpecs] = useState({ color: 'white', material: "birch", layout: "" })
    const [obstacles, setObstacles] = useState({ door: [], window: [], walloutlet: [], switch: [], light: [], other: [] });
    const [rectangular, setRectangular] = useState(true);

    const [rotationIndex, setRotationIndex] = useState(0);
    const rotations = [0, Math.PI / 2, Math.PI, -Math.PI / 2];

    //current position of the model
    //------------------------------------------------------------------------------------------------------------------------
    const [modelPosition, setModelPosition] = useState([0 ,0 , 0]);
    //------------------------------------------------------------------------------------------------------------------------

    // Function to return other obstacles
    const getOtherObstacles = () => {
        return obstacles.other;
    }

    const getLightsAndOtherObstacles = () => {
        return obstacles.light.concat(obstacles.other);
    }

    //dictionnary containing current positions per id of draggable obstacles and draggable lights
    //------------------------------------------------------------------------------------------------------------------------
    const dobstructionPositions = useRef({});
    //------------------------------------------------------------------------------------------------------------------------


    // vanaf hier pruts code voor posities bij te houden maar werkt (niet gebruiken of aanpassen)
    //------------------------------------------------------------------------------------------------------------------------
    const allDObstacles = getLightsAndOtherObstacles();

    // Add a component to the list of dObstructions when it mounts
    const addDObstructionPosition = (position, obstructionKey) => {
        if (position) {
            dobstructionPositions.current[obstructionKey] = position; // Storing mesh with its ID as the key
        }
        console.log("positions", dobstructionPositions.current);

    };

    useEffect(() => {
        removeDObstructionPosition();
    });

    // remove a dobstructionposition from the list of dobstructions when it unmounts/removed from the list
    const removeDObstructionPosition = () => {
        const keys = allDObstacles.map(obstacle => obstacle.id);

        for (let key in dobstructionPositions.current) {
            if (!keys.includes(key)) {
                delete dobstructionPositions.current[key];
            }
        }
    }
    //------------------------------------------------------------------------------------------------------------------------


    const [skyboxPath, setSkyboxPath] = useState(() => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
        return prefersDarkMode.matches ? "night" : "day";
    });

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


    const rotate = () => {
        setRotationIndex((prevIndex) => (prevIndex + 1) % rotations.length);
    };

    // Function to return doors
    const getDoors = () => {
        return obstacles.door;
    }

    // Function to return windows
    const getWindows = () => {
        return obstacles.window;
    }

    // Function to return walloutlets
    const getWalloutlets = () => {
        return obstacles.walloutlet;
    }

    // Function to return switches
    const getSwitches = () => {
        return obstacles.switch;
    }

    // Function to return lights
    const getLights = () => {
        return obstacles.light;
    }

    const value = {
        rectangular,
        setRectangular,
        dimensions,
        setDimensions,
        specs,
        setSpecs,
        functionalities,
        setFunctionalities,
        obstacles,
        setObstacles,
        getDoors,
        getWindows,
        getWalloutlets,
        getSwitches,
        getLights,
        getOtherObstacles,
        modelRotation: rotations[rotationIndex],
        rotate,
        skyboxPath,
        setSkyboxPath,
        modelPosition,
        setModelPosition,
        getLightsAndOtherObstacles,
        addDObstructionPosition,
        removeDObstructionPosition,
    }


    return (
        <ConfiguratorContext.Provider value={value}>
            {children}
        </ConfiguratorContext.Provider>);
}

export const useConfiguratorContext = () => {
    return useContext(ConfiguratorContext);
}