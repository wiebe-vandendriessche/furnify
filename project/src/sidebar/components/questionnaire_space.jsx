import "../../App.css"
import React, { useState } from "react";
import "./questionnaire.css"


function Questionnaire_space() {
    const [showDims, setShow] = useState(true);
    const showDim = () => { setShow(false); }
    const showNoDim = () => { setShow(true) }
    return (
        <>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <fieldset>
                                    <legend>
                                        Wat zijn de afmetingen van de woonruimte?
                                    </legend>
                                    <table>
                                    <tbody>
                                    <tr>
                                        <td>
                                            Vorm:
                                        </td>
                                        <td>
                                            <input type="radio" id="colRectangular" name="space" value="Rectangular" onClick={showDim} />
                                            <label htmlFor="colRectangular">Rechthoekig</label>
                                            <input type="radio" id="colOther" name="space" value="Other" onClick={showNoDim} />
                                            <label htmlFor="colOther">Anders</label>
                                        </td>
                                    </tr>

                                    <tr hidden={showDims}>
                                        <td>
                                            <label htmlFor="length" pattern="^\d*(\,\d{0,2})?$">Lengte:</label>
                                        </td>
                                        <td>
                                            <input id="length" type="text" onChange={(e) => {
                                                const value = e.target.value;
                                                console.log(!isNaN(+value)); // true if its a number, false if not
                                            }}></input>


                                        </td>
                                        <td>
                                            <p >cm</p>
                                        </td>
                                    </tr>
                                    <tr hidden={showDims}>
                                        <td>
                                            <label htmlFor="width" pattern="^\d*(\,\d{0,2})?$">Breedte:</label>
                                        </td>
                                        <td>
                                            <input id="width" type="text"></input>
                                        </td>
                                        <td>
                                            <p>cm</p>
                                        </td>
                                    </tr>
                                    <tr hidden={showDims}>
                                        <td>
                                            <label htmlFor="height" pattern="^\d*(\,\d{0,2})?$">Hoogte:</label>
                                        </td>
                                        <td>
                                            <input id="height" type="text"></input>
                                        </td>
                                        <td>
                                            <p>cm</p>
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
                                        Met welke van de volgende aspecten in uw woonruimte dienen we rekening te houden?
                                    </legend>
                                    <input type="checkbox" id="windowDoor" name="windowDoor" />
                                    <label htmlFor="windowDoor">
                                        Opening ramen en deuren
                                    </label>
                                    <input type="checkbox" id="radiator" name="radiator" />
                                    <label htmlFor="radiator">
                                        Radiatoren
                                    </label>
                                    <input type="checkbox" id="switchPower" name="switchPower" />
                                    <label htmlFor="switchPower">
                                        Schakelaars en stroomtoevoeren
                                    </label>
                                    <input type="checkbox" id="slopeWall" name="slopeWall" />
                                    <label htmlFor="slopeWall">
                                        Schuine wanden
                                    </label>
                                    <input type="checkbox" id="others" name="others" />
                                    <label htmlFor="others">
                                        Andere
                                    </label>
                                </fieldset>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>)
}

export default Questionnaire_space;