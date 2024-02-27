import "../../App.css"
import React from "react";

function Questionnaire_spec() {

    return (
        <>
            <div>
                <table>
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
                                <tr>
                                    <td>
                                        <p>
                                            <label htmlFor="otherRequirements">
                                                Andere specifieke wensen of vereisten waarmee rekening te houden?
                                            </label>
                                            <textarea id="otherRequirements" rows="3" cols="40"></textarea>

                                        </p>
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
            </div>
        </>)
}

export default Questionnaire_spec;