import React from 'react'
import { createContext, useContext, useState } from 'react';

export const ContactContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const ContactProvider = ({ children }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [mail, setMail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
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

export const useContactContext = () => {
    return useContext(ContactContext);
}