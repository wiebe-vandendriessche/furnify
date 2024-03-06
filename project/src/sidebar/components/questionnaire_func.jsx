import "../../App.css"
import "./questionnaire.css"
import { useConfiguratorContext, useVariaContext } from "../../contexts/MyContext.jsx";
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'

function Questionnaire_functional() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    const lng = navigator.language;

    const { functionalities, setFunctionalities } = useConfiguratorContext();
    const { mattress, setMattress, room, setRoom } = useVariaContext();
    const changeBed = () => {
        setFunctionalities({ ...functionalities, bed: !functionalities.bed })
        if (!functionalities.bed) {
            setMattress("");
        }
    }
    const changeDesk = () => {
        setFunctionalities(
            { ...functionalities, desk: !functionalities.desk }
        );
    }
    const changeSofa = () => {
        setFunctionalities(
            { ...functionalities, sofa: !functionalities.sofa }
        );
    }
    const changeStoragespace = () => {
        setFunctionalities(
            { ...functionalities, storagespace: !functionalities.storagespace });
    }

    const changeMattresstype = (event) => {
        setMattress(event.target.id);
    }
    const changeRoom = (event) => {
        setRoom(event.target.id);
    }

    return (
        <>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <fieldset>
                                    <legend>{t('questionnaire_func.q_space')}</legend>
                                    <table>
                                        <tbody>
                                            <tr>

                                                <td>
                                                    <input type="radio" id="guestroom" name="room" onChange={changeRoom} checked={"guestroom" === room} />
                                                    <label htmlFor="guestroom">{t('questionnaire_func.space.guest_room')}</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="radio" id="livingroom" name="room" onChange={changeRoom} checked={"livingroom" === room} />
                                                    <label htmlFor="livingroom">{t('questionnaire_func.space.living_room')}</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="radio" id="bedroom" name="room" onChange={changeRoom} checked={"bedroom" === room} />
                                                    <label htmlFor="bedroom">{t('questionnaire_func.space.bedroom')}</label>
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
                                        {t('questionnaire_func.q_function')}
                                    </legend>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="bed" name="bed" onChange={changeBed} checked={functionalities.bed} />
                                                    <label htmlFor="bed">{t('questionnaire_func.functions.bed')}</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="desk" name="desk" onChange={changeDesk} checked={functionalities.desk} />
                                                    <label htmlFor="desk">{t('questionnaire_func.functions.office_space')}</label>

                                                </td>

                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="sofa" name="sofa" onChange={changeSofa} checked={functionalities.sofa} />
                                                    <label htmlFor="sofa">{t('questionnaire_func.functions.sofa')}</label>

                                                </td>

                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="storageSpace" name="storageSpace" onChange={changeStoragespace} checked={functionalities.storagespace} />
                                                    <label htmlFor="storageSpace">{t('questionnaire_func.functions.storage_space')}</label>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </fieldset>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <fieldset hidden={!functionalities.bed}>
                                    <legend>
                                        {t('questionnaire_func.bed.q_bed')}                                    </legend>
                                    <table>
                                        <tbody>
                                            <tr>

                                                <td>
                                                    <input type="radio" id="soft" name="mattress" onChange={changeMattresstype} checked={"soft" === mattress} />
                                                    <label htmlFor="soft">{t('questionnaire_func.bed.soft')}</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="radio" id="medium" name="mattress" onChange={changeMattresstype} checked={"medium" === mattress} />
                                                    <label htmlFor="medium">{t('questionnaire_func.bed.medium')}</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="radio" id="hard" name="mattress" onChange={changeMattresstype} checked={"hard" === mattress} />
                                                    <label htmlFor="hard">{t('questionnaire_func.bed.sturdy')}</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="radio" id="non" name="mattress" />
                                                    <label htmlFor="non">{t('questionnaire_func.bed.apply')}</label>
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