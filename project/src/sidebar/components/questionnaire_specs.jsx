import "../../App.css"
import React from "react";
import "./questionnaire.css"
import {useConfiguratorContext} from "../../contexts/MyContext.jsx";

function Questionnaire_spec() {
    //Uses reactcontext
    const { color, setColor, material, setMaterial } = useConfiguratorContext();
    const changeMaterial=(event)=>{
        setMaterial(event.target.value);
    }
    const changeColor=(event)=>{
        setColor(event.target.value);
    }
    return (
        <>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <fieldset>
                                    <legend>
                                        Heeft u specifieke voorkeuren voor de indeling van uw woonruimte?
                                    </legend>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input type="radio" id="wall" name="dev" />
                                                    <label htmlFor="wall">muur</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="radio" id="Partition" name="dev" />
                                                    <label htmlFor="Partition">scheidingswand</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="radio" id="middel" name="dev" />
                                                    <label htmlFor="middel">te midden van ruimte</label>
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
                                        Welke materialen verkiest u ter afwerking van uw modulaire meubels?
                                    </legend>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    Kleur:
                                                </td>
                                                <td>
                                                    <input type="radio" id="colWhite" name="color" value="#FFFFFF" onChange={changeColor} checked={color=="#FFFFFF"}/>
                                                    <label htmlFor="colWhite">Wit</label>
                                                    <input type="radio" id="colBlack" name="color" value="#000000" onChange={changeColor} checked={color=="#000000"}/>
                                                    <label htmlFor="colBlack">Zwart</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    Materiaal:
                                                </td>
                                                <td>
                                                    <input type="radio" id="matBirch" name="material" value="birch" onChange={changeMaterial} checked={material=="birch"}/>
                                                    <label htmlFor="matBirch">Berk</label>
                                                    <input type="radio" id="matOak" name="material" value="oak" onChange={changeMaterial} checked={material=="oak"}/>
                                                    <label htmlFor="matOak">Eik</label>
                                                    <input type="radio" id="matWalnut" name="material" value="walnut" onChange={changeMaterial} checked={material=="walnut"}/>
                                                    <label htmlFor="matWalnut">Notelaar</label>
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
                                    <legend  >
                                        Andere specifieke wensen of vereisten waarmee rekening te houden?

                                    </legend>
                                    <textarea id="otherRequirements" rows="3" cols="40"></textarea>
                                </fieldset>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>)
}

export default Questionnaire_spec;