import "../../App.css"
import React, { useState } from "react";
import "./questionnaire.css"

function Questionnaire_functional() {
    const [showBedQuest, setShow] = useState(true);
    const showBed = () => { setShow(!showBedQuest) }

    return (
        <>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <fieldset>
                                    <legend> Welke woonruimte wenst u te optimaliseren?  </legend>
                                    <table>
                                        <tbody>
                                            <tr>
                                            
                                                <td>
                                                    <input type="radio" id="guestroom" name="room" />
                                                    <label htmlFor="guestroom">logeerkamer</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="radio" id="livingroom" name="room" />
                                                    <label htmlFor="livingroom">woonkamer</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="radio" id="bedroom" name="room" />
                                                    <label htmlFor="bedroom">slaapkamer</label>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </fieldset>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <fieldset>
                                    <legend>
                                        Wat zijn de belangrijkste functies die u nodig heeft om uw woonruimte optimaal te benutten?
                                    </legend>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="bed" name="bed" onChange={showBed} />
                                                    <label htmlFor="bed">Bed</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="desk" name="desk" />
                                                    <label htmlFor="desk">Bureauruimte</label>

                                                </td>

                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="sofa" name="sofa" />
                                                    <label htmlFor="sofa">Sofa</label>

                                                </td>

                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="storageSpace" name="storageSpace" />
                                                    <label htmlFor="storageSpace">Opbergruimte</label>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </fieldset>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <fieldset hidden = {showBedQuest}>
                                    <legend>
                                        Welke matras verkiest u?
                                    </legend>
                                    <table>
                                        <tbody>
                                            <tr>
                                            
                                                <td>
                                                    <input type="radio" id="soft" name="mattress" />
                                                    <label htmlFor="soft">extra zacht</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="radio" id="medium" name="mattress" />
                                                    <label htmlFor="medium">medium</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="radio" id="hard" name="mattress" />
                                                    <label htmlFor="hard">extra stevig</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="radio" id="non" name="mattress" />
                                                    <label htmlFor="non">niet van toepassing</label>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </fieldset>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>)
}

export default Questionnaire_functional;