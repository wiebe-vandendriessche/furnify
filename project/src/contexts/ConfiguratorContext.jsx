import { createContext, useContext, useState } from 'react';

const ConfiguratorContext = createContext();

// eslint-disable-next-line react/prop-types
export const ConfiguratorProvider = ({ children }) => {

    const [dimensions, setDimensions] = useState({ length: 6, width: 8, height: 2.5 });

    const [functionalities, setFunctionalities] = useState({ bed: false, sofa: false, office_space: false, storage_space: false })
    const [specs, setSpecs]=useState({color: "#FFFFFF", material: "birch", layout:""})
    const [obstacles, setObstacles] = useState({door: [], window: [], walloutlet: [], switch: [], light: [], other: []});
    const [rectangular, setRectangular] = useState(true);

    const [rotationIndex, setRotationIndex] = useState(0);
    const rotations = [0, Math.PI / 2, Math.PI, -Math.PI / 2];



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

    // Function to return other obstacles
    const getOtherObstacles = () => {
        return obstacles.other;
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
        rotate
    }


    return (
        <ConfiguratorContext.Provider value={value}>
            {children}
        </ConfiguratorContext.Provider>);
}

export const useConfiguratorContext = () => {
    return useContext(ConfiguratorContext);
}