import "../../App.css"
import "./questionnaire.css"
import {useVariaContext} from "../../contexts/MyContext.jsx";
import {useConfiguratorContext} from "../../contexts/ConfiguratorContext.jsx";
import {useTranslation} from 'react-i18next'
import {useEffect} from 'react'
import {ToggleButton,Collapse,ButtonGroup,Form} from "react-bootstrap";

function Questionnaire_functional() {
    const {t, i18n} = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    const lng = navigator.language;

    const {functionalities, setFunctionalities} = useConfiguratorContext();
    const {mattress, setMattress, room, setRoom} = useVariaContext();
    const changeBed = () => {
        setFunctionalities({...functionalities, bed: !functionalities.bed})
        if (!functionalities.bed) {
            setMattress("");
        }
        console.log(functionalities.bed)
    }
    const changeDesk = () => {
        setFunctionalities(
            {...functionalities, desk: !functionalities.desk}
        );
    }
    const changeSofa = () => {
        setFunctionalities(
            {...functionalities, sofa: !functionalities.sofa}
        );
    }
    const changeStoragespace = () => {
        setFunctionalities(
            {...functionalities, storagespace: !functionalities.storagespace});
    }

    const changeMattresstype = (event) => {
        setMattress(event.target.id);
    }

    const changeMattressnone = () => {
        setMattress("")
    }
    const changeRoom = (event) => {
        setRoom(event.target.id);
    }

    const space = [
        {name: t('questionnaire_func.space.guest_room'), id: 'guestroom'},
        {name: t('questionnaire_func.space.living_room'), id: 'livingroom'},
        {name: t('questionnaire_func.space.bedroom'), id: 'bedroom'},
    ];



    return (
        /*<div>
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
                                        <input type="radio" id="guestroom" name="room" onChange={changeRoom}
                                               checked={"guestroom" === room}/>
                                        <label htmlFor="guestroom">{t('questionnaire_func.space.guest_room')}</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="radio" id="livingroom" name="room" onChange={changeRoom}
                                               checked={"livingroom" === room}/>
                                        <label htmlFor="livingroom">{t('questionnaire_func.space.living_room')}</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="radio" id="bedroom" name="room" onChange={changeRoom}
                                               checked={"bedroom" === room}/>
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
                                        <input type="checkbox" id="bed" name="bed" onChange={changeBed}
                                               checked={functionalities.bed}/>
                                        <label htmlFor="bed">{t('questionnaire_func.functions.bed')}</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="checkbox" id="desk" name="desk" onChange={changeDesk}
                                               checked={functionalities.desk}/>
                                        <label htmlFor="desk">{t('questionnaire_func.functions.office_space')}</label>

                                    </td>

                                </tr>
                                <tr>
                                    <td>
                                        <input type="checkbox" id="sofa" name="sofa" onChange={changeSofa}
                                               checked={functionalities.sofa}/>
                                        <label htmlFor="sofa">{t('questionnaire_func.functions.sofa')}</label>

                                    </td>

                                </tr>
                                <tr>
                                    <td>
                                        <input type="checkbox" id="storageSpace" name="storageSpace"
                                               onChange={changeStoragespace} checked={functionalities.storagespace}/>
                                        <label
                                            htmlFor="storageSpace">{t('questionnaire_func.functions.storage_space')}</label>
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
                                        <input type="radio" id="soft" name="mattress" onChange={changeMattresstype}
                                               checked={"soft" === mattress}/>
                                        <label htmlFor="soft">{t('questionnaire_func.bed.soft')}</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="radio" id="medium" name="mattress" onChange={changeMattresstype}
                                               checked={"medium" === mattress}/>
                                        <label htmlFor="medium">{t('questionnaire_func.bed.medium')}</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="radio" id="hard" name="mattress" onChange={changeMattresstype}
                                               checked={"hard" === mattress}/>
                                        <label htmlFor="hard">{t('questionnaire_func.bed.sturdy')}</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <input type="radio" id="non" name="mattress"/>
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
        </div>*/

        <div className="mb-3 m5">
            <Form>
                <div className="m5">
                    <Form.Group>
                        <Form.Label>{t('questionnaire_func.q_space')}</Form.Label>
                        <ButtonGroup>
                            {space.map((space) => (
                                <ToggleButton
                                    key={space.id}
                                    id={space.id}
                                    type="radio"
                                    variant="danger"
                                    value={space.name}
                                    onChange={changeRoom}
                                    checked={room === space.id}>
                                    {space.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </Form.Group>
                </div>

                <div className="m5">
                    <Form.Group>
                        <Form.Label>
                        {t('questionnaire_func.q_function')}
                        </Form.Label>
                        <div className={"flex m5"}>
                            <ToggleButton className={"tbtn"} type="checkbox" variant={"outline-danger"} id="bed"
                                          name="bed" onClick={changeBed}
                                          checked={functionalities.bed}>{t('questionnaire_func.functions.bed')}</ToggleButton>
                            <ToggleButton className={"tbtn"} type="checkbox" variant={"outline-danger"} id="desk"
                                          name="desk" onChange={changeDesk}
                                          checked={functionalities.desk}>{t('questionnaire_func.functions.office_space')}</ToggleButton>
                            <ToggleButton className={"tbtn"} type="checkbox" variant={"outline-danger"} id="sofa"
                                          name="sofa" onChange={changeSofa}
                                          checked={functionalities.sofa}>{t('questionnaire_func.functions.sofa')}</ToggleButton>
                            <ToggleButton className={"tbtn"} type="checkbox" variant={"outline-danger"}
                                          id="storageSpace" name="storageSpace"
                                          onChange={changeStoragespace}
                                          checked={functionalities.storagespace}>{t('questionnaire_func.functions.storage_space')}</ToggleButton>
                        </div>

                        <Collapse in={functionalities.bed}>
                            <div className="mb-3 m5">
                                <ButtonGroup>
                                    <ToggleButton variant={"danger"} type="radio" id="soft" name="mattress" onChange={changeMattresstype}
                                                  checked={"soft" === mattress}>
                                        {t('questionnaire_func.bed.soft')}
                                    </ToggleButton>
                                    <ToggleButton variant={"danger"} type="radio" id="medium" name="mattress" onChange={changeMattresstype}
                                                  checked={"medium" === mattress}>
                                        {t('questionnaire_func.bed.medium')}
                                    </ToggleButton>
                                    <ToggleButton variant={"danger"} type="radio" id="hard" name="mattress" onChange={changeMattresstype}
                                                  checked={"hard" === mattress}>
                                        {t('questionnaire_func.bed.sturdy')}
                                    </ToggleButton>
                                    <ToggleButton variant={"danger"} type="radio" id="non" name="mattress" onChange={changeMattressnone}
                                                  checked={"" === mattress}>
                                        {t('questionnaire_func.bed.apply')}
                                    </ToggleButton>
                                </ButtonGroup>
                            </div>
                        </Collapse>
                    </Form.Group>
                </div>
            </Form>
        </div>


    )
}

export default Questionnaire_functional;