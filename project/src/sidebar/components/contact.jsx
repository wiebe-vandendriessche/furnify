import "../../App.css"
import React from "react";

function Contact() {

    return (
        <>
            <div>
                <h2>
                    Laat uw contactgegevens achter zodat we u kunnen bereiken
                </h2>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="firstName">Voornaam:</label>
                            </td>
                            <td>
                                <input id="firstName" name="firstName" type="text" /><br />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="lastName">Achternaam:</label>
                            </td>
                            <td>
                                <input id="lastName" name="lastName" type="text" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="phoneNumber">
                                    Telefoonnummer:
                                </label>
                            </td>
                            <td>
                                {/*ADDING PATTERN?*/}
                                <input id="phoneNumber" name="phoneNumber" type="tel" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="mail">
                                    E-mail:
                                </label>
                            </td>
                            <td>
                                <input id="mail" name="mail" type="email" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="adress">
                                    Adres:
                                </label>
                            </td>
                            <td>
                                <input id="adress" name="adress" type="text" />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>)
}

export default Contact;