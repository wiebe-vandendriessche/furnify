import {createContext, useContext, useState} from 'react';

export const ContactContext= createContext(null);
export const ConfiguratorContext=createContext(null);
export const VariaContext=createContext(null)

// eslint-disable-next-line react/prop-types
export const ConfiguratorProvider=({children})=>{
    const [dimensions, setDimensions]=useState({length: 0, width:0, height:0});
    const [color, setColor]=useState("#FFFFFF");
    const [material, setMaterial]=useState("birch");
    const [layout, setLayout]=useState("")
    const [functionalities, setFunctionalities]=useState({bed: false, sofa: false, desk: false, storagespace: false})
    const [obstacles, setObstacles]=useState([]);

    return (
        <ConfiguratorContext.Provider
        value={
            {
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
        }>
            {children}
    </ConfiguratorContext.Provider>);
}

// eslint-disable-next-line react/prop-types
export const ContactProvider=({children})=>{
    const [firstName, setFirstName]=useState("");
    const [lastName, setLastName]=useState("");
    const [mail, setMail]=useState("");
    const [phoneNumber, setPhoneNumber]=useState("");
    const [address, setAddress]=useState("");
    return (
        <ContactContext.Provider
            value={{
                    firstName,
                    setFirstName,
                    lastName,
                    setLastName,
                    mail,
                    setMail,
                    phoneNumber,
                    setPhoneNumber,
                    address,
                    setAddress
                }}>
            {children}
        </ContactContext.Provider>
    )
}

// eslint-disable-next-line react/prop-types
export const VariaProvider=({children})=>{
    const [requirements, setRequirements]=useState("");
    const [mattress, setMattress]=useState("");
    const [room, setRoom]= useState("");
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

export const useConfiguratorContext=()=>{
    return useContext(ConfiguratorContext);
}
export const useContactContext=()=>{
    return useContext(ContactContext);
}
export const useVariaContext=()=>{
    return useContext(VariaContext);
}