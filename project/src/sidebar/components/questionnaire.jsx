import "../../App.css"
import React, {useState} from "react";

function Questionnaire({nextP}) {

    const [state, setState]= useState({
        livingSpace: "",
        functions: [],
        measurements: {length: 0, width: 0, height: 0},
        obstacles: {windowDoor: false, radiator: false, switchPower: false, slopeWall: false, others: false },
        layout: "",
        otherReq: ""

    })

    function showNext(){
        nextP()
    }



    return (
        <>
            <div>
                <h2>Vragenlijst</h2>
                <table>
                    <tr>
                        <td>
                            <label htmlFor="livingSpace">Welke woonruimte wenst u te optimaliseren?</label>
                            <select name="livingSpace">
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
                                <input type="checkbox" id="bed" name="bed"/>
                                <label htmlFor="bed">Bed</label>
                                <input type="checkbox" id="desk" name="desk"/>
                                <label htmlFor="desk">Bureauruimte</label>
                                <input type="checkbox" id="sofa" name="sofa"/>
                                <label htmlFor="sofa">Sofa</label>
                                <input type="checkbox" id="storageSpace" name="storageSpace"/>
                                <label htmlFor="storageSpace">Opbergruimte</label>
                            </fieldset>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <fieldset>
                                <legend>
                                    Wat zijn de afmetingen van de woonruimte (cm)?
                                </legend>
                                <label htmlFor="length" pattern="^\d*(\,\d{0,2})?$">Lengte:</label>
                                <input id="length" type="text"></input>
                                <label htmlFor="width" pattern="^\d*(\,\d{0,2})?$">Breedte:</label>
                                <input id="width" type="text"></input>
                                <label htmlFor="height" pattern="^\d*(\,\d{0,2})?$">Hoogte:</label>
                                <input id="height" type="text"></input>
                            </fieldset>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <fieldset>
                                <legend>
                                    Met welke van de volgende aspecten in uw woonruimte dienen we rekening te houden?
                                </legend>
                                <input type="checkbox" id="windowDoor" name="windowDoor"/>
                                <label htmlFor="windowDoor">
                                    Opening ramen en deuren
                                </label>
                                <input type="checkbox" id="radiator" name="radiator"/>
                                <label htmlFor="radiator">
                                    Radiatoren
                                </label>
                                <input type="checkbox" id="switchPower" name="switchPower"/>
                                <label htmlFor="switchPower">
                                    Schakelaars en stroomtoevoeren
                                </label>
                                <input type="checkbox" id="slopeWall" name="slopeWall"/>
                                <label htmlFor="slopeWall">
                                    Schuine wanden
                                </label>
                                <input type="checkbox" id="others" name="others"/>
                                <label htmlFor="others">
                                    Andere
                                </label>
                            </fieldset>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            Heeft u specifieke voorkeuren voor de indeling van uw woonruimte?
                            Opties: Scheidingswand, te midden van ruimte, ed.

                        </td>
                    </tr>
                    <tr>
                        <td>
                            <fieldset>
                                <legend>
                                    Welke materialen verkiest u ter afwerking van uw modulaire meubels?

                                </legend>
                                <tr>
                                    <td>
                                        Kleur:
                                    </td>
                                    <td>
                                        <input type="radio" id="colWhite" name="color" value="white"/>
                                        <label htmlFor="colWhite">Wit</label>
                                        <input type="radio" id="colBlack" name="color" value="black"/>
                                        <label htmlFor="colWhite">Zwart</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Materiaal:
                                    </td>
                                    <td>
                                        <input type="radio" id="matBirch" name="material" value="birch"/>
                                        <label htmlFor="matBirch">Berk</label>
                                        <input type="radio" id="matOak" name="material" value="oak"/>
                                        <label htmlFor="matOak">Eik</label>
                                        <input type="radio" id="matWalnut" name="material" value="walnut"/>
                                        <label htmlFor="matWalnut">Notelaar</label>
                                    </td>
                                </tr>
                            </fieldset>

                        </td>
                    </tr>
                    <tr>
                        <td>

                        </td>
                    </tr>
                </table>
                <ul>

                    <li>

                    </li>
                    <li>

                    </li>
                    <li>
                        <p>
                            <label htmlFor="otherRequirements">
                                Andere specifieke wensen of vereisten waarmee rekening te houden?
                            </label>
                            <textarea id="otherRequirements" rows="3" cols="40"></textarea>

                        </p>
                    </li>
                </ul>
                <button onClick={showNext}>Volgende</button>
            </div>
        </>)
}

export default Questionnaire;