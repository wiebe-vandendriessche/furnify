import React from "react";

function Contact({nextP, previousP}) {



    function showNext(){
        nextP()
    }
    function showPrevious(){
        previousP()
    }

    return (
        <>
            <div>
                <p>
                    Laat uw contactgegevens achter zodat we u kunnen bereiken
                </p>
                <ul>
                    <li>
                        <label htmlFor="firstName">Voornaam</label>
                        <input name="firstName" type="text"/>
                        <label htmlFor="lastName">Achternaam</label>
                        <input name="lastName" type="text"/>
                    </li>
                    <li>
                        <label htmlFor="phoneNumber">
                            Telefoonnummer
                        </label>
                        {/*ADDING PATTERN?*/}
                        <input name="phoneNumber" type="tel"/>
                    </li>
                    <li>
                        <label htmlFor="mail">
                            E-mail
                        </label>
                        <input name="mail" type="email"/>
                    </li>

                    <li>
                        <label htmlFor="adress">
                            Adres
                        </label>
                        <input name="adress" type="text"/>
                    </li>
                </ul>
                <button onClick={showPrevious}>Vorige</button>
                <button onClick={showNext}>Volgende</button>

            </div>
        </>)
}

export default Contact;