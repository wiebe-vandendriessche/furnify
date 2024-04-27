import { createContext, useContext, useState } from 'react';

export const ModuleContext = createContext();

// eslint-disable-next-line react/prop-types
export const ModuleProvider = ({ children }) => {
    const [errors, setErrors]= useState({softer: false, demands: false, roomSize: false, points2D: false})

    return (
        <ModuleContext.Provider
            value={{
                errors,
                setErrors
            }}>
            {children}
        </ModuleContext.Provider>
    )
}

export const useModuleContext = () => {
    return useContext(ModuleContext);
}