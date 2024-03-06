import "../../App.css"
import "./questionnaire.css"
import { useConfiguratorContext, useVariaContext } from "../../contexts/MyContext.jsx";
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

function Questionnaire_spec() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    const lng = navigator.language;
    //Uses reactcontext
    const { color, setColor, material, setMaterial, layout, setLayout } = useConfiguratorContext();
    const { requirements, setRequirements } = useVariaContext();
    const changeMaterial = (event) => {
        setMaterial(event.target.value);
    }
    const changeColor = (event) => {
        setColor(event.target.value);
    }
    const changeLayout = (event) => {
        setLayout(event.target.value);
    }
    const changeRequirements = (event) => {
        setRequirements(event.target.value);
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
                                        {t('questionnaire_specs.q_prefrences')}
                                    </legend>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input type="radio" id="wall" value={"wall"} name="dev" onChange={changeLayout} checked={"wall" === layout} />
                                                    <label htmlFor="wall">{t('questionnaire_specs.prefrences.wall')}</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="radio" id="Partition" value={"partition"} name="dev" onChange={changeLayout} checked={"partition" === layout} />
                                                    <label htmlFor="Partition">{t('questionnaire_specs.prefrences.partition_wall')}</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="radio" id="middle" name="dev" value={"middle"} onChange={changeLayout} checked={"middle" === layout} />
                                                    <label htmlFor="middle">{t('questionnaire_specs.prefrences.in_the_middle_of_space')}</label>
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
                                        {t('questionnaire_specs.q_materials')}
                                    </legend>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                {t('questionnaire_specs.materials.color')}:
                                                </td>
                                                <td>
                                                    <input type="radio" id="colWhite" name="color" value="#FFFFFF" onChange={changeColor} checked={color === "#FFFFFF"} />
                                                    <label htmlFor="colWhite">{t('questionnaire_specs.materials.white')}</label>
                                                    <input type="radio" id="colBlack" name="color" value="#000000" onChange={changeColor} checked={color === "#000000"} />
                                                    <label htmlFor="colBlack">{t('questionnaire_specs.materials.black')}</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                {t('questionnaire_specs.materials.material')}:
                                                </td>
                                                <td>
                                                    <input type="radio" id="matBirch" name="material" value="birch" onChange={changeMaterial} checked={material === "birch"} />
                                                    <label htmlFor="matBirch">{t('questionnaire_specs.materials.birch')}</label>
                                                    <input type="radio" id="matOak" name="material" value="oak" onChange={changeMaterial} checked={material === "oak"} />
                                                    <label htmlFor="matOak">{t('questionnaire_specs.materials.oak')}</label>
                                                    <input type="radio" id="matWalnut" name="material" value="walnut" onChange={changeMaterial} checked={material === "walnut"} />
                                                    <label htmlFor="matWalnut">{t('questionnaire_specs.materials.walnut')}</label>
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
                                    {t('questionnaire_specs.q_other')}:
                                    </legend>
                                    <textarea id="otherRequirements" rows="3" cols="40" value={requirements} onChange={changeRequirements}></textarea>
                                </fieldset>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>)
}

export default Questionnaire_spec;