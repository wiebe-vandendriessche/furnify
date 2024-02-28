import "../../App.css"
import React, {useState} from "react";
import "./questionnaire.css"
import {useConfiguratorContext} from "../../contexts/MyContext.jsx";
import Obstruction from "./obstruction";


function Questionnaire_space() {
    //Uses reactcontext
    const { dimensions, setDimensions } = useConfiguratorContext();
    //Changes value of context
    const changeWidth=(event)=>{
        setDimensions({width: event.target.value});
    }
    const changeLength=(event)=>{
        setDimensions({length: event.target.value})
    }

    const changeHeight=(event)=>
    {
        setDimensions({height: event.target.value})
    }


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
                                                    <label htmlFor="length" >Lengte:</label>
                                                </td>
                                                <td>
                                                    <input id="length" type="number" min={0} step={0.1} value={dimensions.length} onChange={changeLength}/>
                                                </td>
                                                <td>
                                                    <p >cm</p>
                                                </td>
                                            </tr>
                                            <tr hidden={showDims}>
                                                <td>
                                                    <label htmlFor="width" >Breedte:</label>
                                                </td>
                                                <td>
                                                    <input id="width" type="number" min={0} step={0.1} value={dimensions.width} onChange={changeWidth}/>
                                                </td>
                                                <td>
                                                    <p>cm</p>
                                                </td>
                                            </tr>
                                            <tr hidden={showDims}>
                                                <td>
                                                    <label htmlFor="height">Hoogte:</label>
                                                </td>
                                                <td>
                                                    <input id="height" type="text" min={0} step={0.1} value={dimensions.height} onChange={changeHeight}/>
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
                                        Voeg toe met welke aspecten we in uw woonruimte rekening moeten houden.
                                    </legend>

                                    <button >Voeg aspect toe</button>
                                    {<Obstruction/>}
                                    {/*
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
                                    */}
                                </fieldset>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>)
}

export default Questionnaire_space;