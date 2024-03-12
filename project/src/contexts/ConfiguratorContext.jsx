import React from 'react'
import { createContext, useContext, useState } from 'react';

export const ConfiguratorContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const ConfiguratorProvider = ({ children }) => {

    const [dimensions, setDimensions] = useState({ length: 6, width: 8, height: 2.5 });
    const [color, setColor] = useState("#FFFFFF");
    const [material, setMaterial] = useState("birch");
    const [layout, setLayout] = useState("")
    const [functionalities, setFunctionalities] = useState({ bed: false, sofa: false, desk: false, storagespace: false })
    const [obstacles, setObstacles] = useState([]);

    const value = {
        dimensions,
        setDimensions,
        color,
        setColor,
        material,
        setMaterial,
        layout,
        setLayout,
        functionalities,
        setFunctionalities,
        obstacles,
        setObstacles
    }

    return (
        <ConfiguratorContext.Provider value={value}>
            {children}
        </ConfiguratorContext.Provider>);
}

export const useConfiguratorContext = () => {
    return useContext(ConfiguratorContext);
}