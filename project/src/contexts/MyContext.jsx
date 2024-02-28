import {createContext, useContext, useState} from 'react';


export const ConfiguratorContext=createContext(null);

export const ConfiguratorProvider=({children})=>{
    const [dimensions, setDimensions]=useState({length: 0, width:0, height:0});
    const [color, setColor]=useState("#FFFFFF");

    return (
        <ConfiguratorContext.Provider
        value={
            {
                dimensions,
                setDimensions,
                color,
                setColor
            }
        }>
            {children}
    </ConfiguratorContext.Provider>);
}

export const useReactContext=()=>{
    return useContext(ConfiguratorContext);
}