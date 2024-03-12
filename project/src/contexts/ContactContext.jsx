import React from 'react'
import { createContext, useContext, useState } from 'react';

export const ContactContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const ContactProvider = ({ children }) => {
    const [contact, setContact]= useState({firstName: "", lastName: "", mail: "", phoneNumber: null, address: ""})

    return (
        <ContactContext.Provider
            value={{
                contact,
                setContact
            }}>
            {children}
        </ContactContext.Provider>
    )
}

export const useContactContext = () => {
    return useContext(ContactContext);
}