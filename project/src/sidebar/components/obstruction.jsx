import React, { useState } from "react";
import "./questionnaire.css"

function Obstruction() {
    const [showButton1, setShow1] = useState(false);
    const [showButton2, setShow2] = useState(true);
    const showButton = () => { setShow2(!showButton2) + setShow1(!showButton1) }
    

    return (
        <div className="Obstruction">
            <table>
                <tbody>
                    <tr hidden = {showButton1}>
                        <td>
                            <button id="typeclosed" onClick={showButton}>Type</button>
                        </td>
                    </tr>

                    <tr hidden = {showButton2}>
                        <td>
                            <fieldset>
                                <legend>
                                    <button id="typeopen" onClick={showButton}>Type</button>
                                </legend>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td>
                                            <label htmlFor="type">Type: </label>
                                            <select name="type" id= "type">
                                                <option value ="window">raam</option>
                                                <option value ="door">deur</option>
                                                <option value ="radiator">radiator</option>
                                                <option value ="outlet">stopcontact</option>
                                                <option value ="switch">schakelaar</option>
                                                <option value ="slope">schuine wand</option>
                                                <option value ="others">anders</option>
                                            </select>
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
    )
}

export default Obstruction;
