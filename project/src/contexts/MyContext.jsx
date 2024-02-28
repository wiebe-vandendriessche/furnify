import {createContext, useContext, useState} from 'react';

export const ContactContext= createContext(null);
export const ConfiguratorContext=createContext(null);

export const ConfiguratorProvider=({children})=>{
    const [dimensions, setDimensions]=useState({length: 0, width:0, height:0});
    const [color, setColor]=useState("#FFFFFF");
    const [material, setMaterial]=useState("birch");

    return (
        <ConfiguratorContext.Provider
        value={
            {
                dimensions,
                setDimensions,
                color,
                setColor,
                material,
                setMaterial
            }
        }>
            {children}
    </ConfiguratorContext.Provider>);
}

export const ContactProvider=({children})=>{
    const [firstName, setFirstName]=useState("")
    const [lastName, setLastName]=useState("");
    const [mail, setMail]=useState("");
    const [phoneNumber, setPhoneNumber]=useState("");
    const [adres, setAdres]=useState("");
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
                    adres,
                    setAdres
                }}>
            {children}
        </ContactContext.Provider>
    )
}

export const useConfiguratorContext=()=>{
    return useContext(ConfiguratorContext);
}
export const useContactContext=()=>{
    return useContext(ContactContext);
}