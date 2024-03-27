import "../../App.css"
import "./Questionnaire.css"
import {useVariaContext} from "../../contexts/VariaContext.jsx";
import {useConfiguratorContext} from "../../contexts/ConfiguratorContext.jsx";
import {useTranslation} from 'react-i18next'
import {useEffect} from 'react'
import Form from "react-bootstrap/Form";
import {FormGroup, ToggleButton, ButtonGroup, Col, Row} from "react-bootstrap";


export function Questionnaire_spec() {
    const {t, i18n} = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    //Uses reactcontext
    const {specs, setSpecs} = useConfiguratorContext();
    const {varia, setVaria} = useVariaContext();

    const changeSpecs = (event) => {
        setSpecs({...specs, [event.target.name]: event.target.value})
    }
    const changeVaria = (event) => {
        setVaria({[event.target.name]: event.target.value});
    }
    return (
        <div className="m-2">
            <Form>
                <div className="mb-4">
                    <FormGroup>
                        <div className={"mb-3"}><h5 datatest-id={"question-specs-preferences"}>{t('questionnaire_specs.q_preferences')}</h5></div>
                        <div className={"m-1"}>
                            <ButtonGroup>
                                <ToggleButton variant={"danger"} type="radio" id="wall" value={"wall"} name="layout"
                                              onChange={changeSpecs}
                                              datatest-id={"btn-specs-preferences-wall"}
                                              checked={"wall" === specs.layout}>
                                    {t('questionnaire_specs.preferences.wall')}
                                </ToggleButton>
                                <ToggleButton variant={"danger"} type="radio" id="Partition" value={"partition"}
                                              name="layout"
                                              datatest-id={"btn-specs-preferences-partition_wall"}
                                              onChange={changeSpecs} checked={"partition" === specs.layout}>
                                    {t('questionnaire_specs.preferences.partition_wall')}
                                </ToggleButton>
                                <ToggleButton variant={"danger"} type="radio" id="middle" name="layout" value={"middle"}
                                              datatest-id={"btn-specs-preferences-middle_wall"}
                                              onChange={changeSpecs} checked={"middle" === specs.layout}>
                                    {t('questionnaire_specs.preferences.in_the_middle_of_space')}
                                </ToggleButton>
                            </ButtonGroup>
                        </div>
                    </FormGroup>
                </div>
                <div className={"d-inline-flex mb-4"}>
                    <FormGroup>
                        <div className={"mb-3"}><h5 datatest-id={"question-specs-materials"}>{t('questionnaire_specs.q_materials')}</h5></div>
                        <div className={"m-1"}>
                            <Row>
                                <Col>
                                    <ButtonGroup>
                                        <ToggleButton variant={"danger"} type="radio" id="matBirch" value={"birch"}
                                                      name="material"
                                                      datatest-id={"btn-material-birch"}
                                                      onChange={changeSpecs}
                                                      checked={specs.material === "birch"}>
                                            {t('questionnaire_specs.materials.birch')}
                                        </ToggleButton>
                                        <ToggleButton variant={"danger"} type="radio" id="matOak" value={"oak"}
                                                      name="material"
                                                      datatest-id={"btn-material-oak"}
                                                      onChange={changeSpecs} checked={specs.material === "oak"}>
                                            {t('questionnaire_specs.materials.oak')}
                                        </ToggleButton>
                                        <ToggleButton variant={"danger"} type="radio" id="matWalnut" name="material"
                                                      value={"walnut"}
                                                      datatest-id={"btn-material-walnut"}
                                                      onChange={changeSpecs} checked={specs.material === "walnut"}>
                                            {t('questionnaire_specs.materials.walnut')}
                                        </ToggleButton>
                                    </ButtonGroup>
                                </Col>
                                <Col>
                                    <ButtonGroup>
                                        <ToggleButton variant={"danger"} type="radio" id="colWhite" name="color" value="#FFFFFF"
                                                      datatest-id={"btn-color-white"}
                                                      onChange={changeSpecs} checked={specs.color === "#FFFFFF"}>
                                            {t('questionnaire_specs.materials.white')}
                                        </ToggleButton>
                                        <ToggleButton variant={"danger"} type="radio" id="colBlack" name="color" value="#000000"
                                                      datatest-id={"btn-color-black"}
                                                      onChange={changeSpecs} checked={specs.color === "#000000"}>
                                            {t('questionnaire_specs.materials.black')}
                                        </ToggleButton>
                                    </ButtonGroup>
                                </Col>
                            </Row>


                        </div>
                    </FormGroup>
                </div>
                <div className="mb-4">
                    <FormGroup>
                        <div className={"mb-3"}><h5 datatest-id={"question-specs-other"} >{t('questionnaire_specs.q_other')}</h5></div>
                    </FormGroup>
                    <Form.Control as={"textarea"} rows="3" cols="40" value={varia.requirements}
                                  name="requirements" onChange={changeVaria}></Form.Control>
                </div>
            </Form>
        </div>
    )
}

export default Questionnaire_spec;
