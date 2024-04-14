import "../../App.css"
import "./questionnaire.css"
import {useVariaContext} from "../../contexts/VariaContext.jsx";
import {useConfiguratorContext} from "../../contexts/ConfiguratorContext.jsx";
import {useTranslation} from 'react-i18next'
import {useEffect} from 'react'
import {ToggleButton, Collapse, ButtonGroup, Form} from "react-bootstrap";

function Questionnaire_functional() {
    const {t, i18n} = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])


    const {functionalities, setFunctionalities} = useConfiguratorContext();
    const {varia, setVaria} = useVariaContext();

    const changeFunctionalities = (event) => {
        setFunctionalities({...functionalities, [event.target.id]: !functionalities[event.target.id]})
    }
    const changeVaria = (event) => {
        setVaria({...varia, [event.target.name]: [event.target.id]})
    }

    const space = [
        {name: t('questionnaire_func.space.guest_room'), id: t('questionnaire_func.space.guest_room')},
        {name: t('questionnaire_func.space.living_room'), id: t('questionnaire_func.space.living_room')},
        {name: t('questionnaire_func.space.bedroom'), id: t('questionnaire_func.space.bedroom')},
    ];


    return (

        <div className="m-2">
            <div className="mb-4">
                <Form.Group>
                    <div className={"mb-3"}>
                        <h5>{t('questionnaire_func.q_space')}</h5>
                    </div>
                    <div className={"m-1"}>
                        <ButtonGroup>
                            {space.map((space) => (
                                <ToggleButton
                                    key={space.id}
                                    id={space.id}
                                    name={"room"}
                                    type="radio"
                                    variant="danger"
                                    value={space.name}
                                    onChange={changeVaria}
                                    checked={varia.room == space.id}>
                                    {space.name}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </div>
                </Form.Group>
            </div>

            <div className={"mb-3"}>
                <Form.Group>
                    <div className={"mb-3"}>
                        <h5>{t('questionnaire_func.q_function')}</h5>
                    </div>
                    <div className={"m-1"}>
                        <div className={"flex"}>
                            {Object.entries(functionalities).map(([key, value]) => (
                                <ToggleButton key={key} className={"tbtn"} type="checkbox"
                                              variant={"outline-danger"}
                                              id={key}
                                              onChange={changeFunctionalities}
                                              checked={value}>{t('questionnaire_func.functions.' + key)}</ToggleButton>
                            ))}
                        </div>
                        <div className={"m-1"}>
                            <Collapse in={functionalities.bed}>
                                <div className="mb-3">
                                    <ButtonGroup defaultValue={varia.mattress ?? " "}>

                                        <ToggleButton variant={"danger"} type="radio" id="soft" name="mattress"
                                                      onChange={changeVaria}
                                                      checked={"soft" == varia.mattress}>
                                            {t('questionnaire_func.bed.soft')}
                                        </ToggleButton>
                                        <ToggleButton variant={"danger"} type="radio" id="medium" name="mattress"
                                                      onChange={changeVaria}
                                                      checked={"medium" == varia.mattress}>
                                            {t('questionnaire_func.bed.medium')}
                                        </ToggleButton>
                                        <ToggleButton variant={"danger"} type="radio" id="sturdy" name="mattress"
                                                      onChange={changeVaria}
                                                      checked={"sturdy" == varia.mattress}>
                                            {t('questionnaire_func.bed.sturdy')}
                                        </ToggleButton>
                                        <ToggleButton variant={"danger"} type="radio" id=" " name="mattress"
                                                      onChange={changeVaria}
                                                      checked={" " == varia.mattress}>
                                            {t('questionnaire_func.bed.apply')}
                                        </ToggleButton>
                                    </ButtonGroup>
                                </div>
                            </Collapse>
                        </div>
                    </div>
                </Form.Group>
            </div>
        </div>


    )
}

export default Questionnaire_functional;