import { createContext, useContext, useState } from 'react';

export const VariaContext = createContext(null)

// eslint-disable-next-line react/prop-types
export const VariaProvider = ({ children }) => {
    const [requirements, setRequirements] = useState("");
    const [mattress, setMattress] = useState("");
    const [room, setRoom] = useState("");
    return (
        <VariaContext.Provider value={{
            requirements,
            setRequirements,
            mattress,
            setMattress,
            room,
            setRoom
        }}>
            {children}

        </VariaContext.Provider>
    )

}

export const useVariaContext = () => {
    return useContext(VariaContext);
}