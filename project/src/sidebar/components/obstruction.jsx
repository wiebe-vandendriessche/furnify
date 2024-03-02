import React, { useState } from "react";
import "./questionnaire.css"

function Obstruction() {
    
    const [showButton1, setShow1] = useState(false);
    const [showButton2, setShow2] = useState(true);
    const [typeObstr, setObstr] = useState("Aspect")
    const showButton = () => { setShow2(!showButton2) + setShow1(!showButton1) };
    const saveName = () => {setObstr(type.value)}
    

    return (
        <div className="Obstruction">
            <table>
                <tbody>
                    <tr hidden={showButton1}>
                        <td>
                            <input type="button" id="typeclosed" onClick={showButton} value = {typeObstr}></input>
                        </td>
                    </tr>

                    <tr hidden={showButton2}>
                        <td>
                            <fieldset>
                            <legend>
                                    <input type="button" id="typeopen" value = {typeObstr} onClick={showButton}  ></input>
                                    </legend>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <label htmlFor="type">Type: </label>
                                                <select name="type" id="type" onChange={saveName} >
                                                    <option value="raam">raam</option>
                                                    <option value="deur">deur</option>
                                                    <option value="radiator">radiator</option>
                                                    <option value="stopcontact">stopcontact</option>
                                                    <option value="schakelaar">schakelaar</option>
                                                    <option value="schuine wand">schuine wand</option>
                                                    <option value="anders">anders</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="length_ob" >Lengte:</label>
                                            </td>
                                            <td>
                                                <input id="length_ob" type="number" min={0} step={0.1}  />
                                            </td>
                                            <td>
                                                <p >cm</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="width_ob" >Breedte:</label>
                                            </td>
                                            <td>
                                                <input id="width_ob" type="number" min={0} step={0.1} />
                                            </td>
                                            <td>
                                                <p>cm</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <label htmlFor="height_ob">Hoogte:</label>
                                            </td>
                                            <td>
                                                <input id="height_ob" type="text" min={0} step={0.1} />
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

                </tbody>
            </table>


        </div>
    )
}

export default Obstruction;
