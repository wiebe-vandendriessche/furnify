import { createContext, useContext, useState } from 'react';

const ConfiguratorContext = createContext();

// eslint-disable-next-line react/prop-types
export const ConfiguratorProvider = ({ children }) => {

    const [dimensions, setDimensions] = useState({ length: 6, width: 8, height: 2.5 });

    const [functionalities, setFunctionalities] = useState({ bed: false, sofa: false, office_space: false, storage_space: false })
    const [specs, setSpecs]=useState({color: "#FFFFFF", material: "birch", layout:""})
    const [obstacles, setObstacles] = useState({door: [], window: [], other: []});
    const [rectangular, setRectangular] = useState(true);

    // Function to return doors
    const getDoors = () => {
        return obstacles.door;
    }

    // Function to return windows
    const getWindows = () => {
        return obstacles.window;
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
        getOtherObstacles
    }


    return (
        <ConfiguratorContext.Provider value={value}>
            {children}
        </ConfiguratorContext.Provider>);
}

export const useConfiguratorContext = () => {
    return useContext(ConfiguratorContext);
}