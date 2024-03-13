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
                    </Form.Group>
                </div>

                <div className="m5">
                    <Form.Group>
                        <Form.Label>
                            {t('questionnaire_func.q_function')}
                        </Form.Label>
                        <div className={"flex m5"}>
                            {Object.entries(functionalities).map(([key, value]) => (
                                <ToggleButton key={key} className={"tbtn"} type="checkbox" variant={"outline-danger"}
                                              id={key}
                                              onChange={changeFunctionalities}
                                              checked={value}>{t('questionnaire_func.functions.' + key)}</ToggleButton>
                            ))}
                        </div>
                        <Collapse in={functionalities.bed}>
                            <div className="mb-3 m5">
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
                                    <ToggleButton variant={"danger"} type="radio" id="hard" name="mattress"
                                                  onChange={changeVaria}
                                                  checked={"hard" == varia.mattress}>
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
                    </Form.Group>
                </div>
            </Form>
        </div>


    )
}

export default Questionnaire_functional;