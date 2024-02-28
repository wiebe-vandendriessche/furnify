import "../../App.css"
import React from "react";
import "./questionnaire.css"

function Questionnaire_functional() {

    return (
        <>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="livingSpace">Welke woonruimte wenst u te optimaliseren?</label>
                                <select name="livingSpace" id="livingSpace">
                                    <option value="logeerkamer">logeerkamer</option>
                                    <option value="woonkamer">woonkamer</option>
                                    <option value="slaapkamer">slaapkamer</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <fieldset>
                                    <legend>
                                        Wat zijn de belangrijkste functies die u nodig heeft om uw woonruimte optimaal te benutten?
                                    </legend>
                                    <input type="checkbox" id="bed" name="bed" />
                                    <label htmlFor="bed">Bed</label>
                                    <input type="checkbox" id="desk" name="desk" />
                                    <label htmlFor="desk">Bureauruimte</label>
                                    <input type="checkbox" id="sofa" name="sofa" />
                                    <label htmlFor="sofa">Sofa</label>
                                    <input type="checkbox" id="storageSpace" name="storageSpace" />
                                    <label htmlFor="storageSpace">Opbergruimte</label>
                                </fieldset>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>)
}

export default Questionnaire_functional;