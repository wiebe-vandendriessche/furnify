import "../../App.css"
import "./questionnaire.css"
import {useVariaContext} from "../../contexts/VariaContext.jsx";
import {useConfiguratorContext} from "../../contexts/ConfiguratorContext.jsx";
import {useTranslation} from 'react-i18next'
import {useEffect} from 'react'
import Form from "react-bootstrap/Form";
import {FormGroup, FormLabel, ToggleButton,ButtonGroup} from "react-bootstrap";


function Questionnaire_spec() {
    const {t, i18n} = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    //Uses reactcontext
    const {specs, setSpecs} = useConfiguratorContext();
    const {varia, setVaria} = useVariaContext();

    const changeSpecs=(event)=>{
        setSpecs({...specs, [event.target.name]: event.target.value})
    }
    const changeVaria = (event) => {
        setVaria({[event.target.name]: event.target.value});
    }
    return (


        <div className="m5">
            <Form>
                <div className="m5">
                    <FormGroup>
                        <FormLabel>{t('questionnaire_specs.q_prefrences')}</FormLabel>
                        <ButtonGroup>
                            <ToggleButton variant={"danger"} type="radio" id="wall" value={"wall"} name="layout"
                                          onChange={changeSpecs}
                                          checked={"wall" === specs.layout}>
                                {t('questionnaire_specs.prefrences.wall')}
                            </ToggleButton>
                            <ToggleButton variant={"danger"} type="radio" id="Partition" value={"partition"} name="layout"
                                          onChange={changeSpecs} checked={"partition" === specs.layout}>
                                {t('questionnaire_specs.prefrences.partition_wall')}
                            </ToggleButton>
                            <ToggleButton variant={"danger"} type="radio" id="middle" name="layout" value={"middle"}
                                          onChange={changeSpecs} checked={"middle" === specs.layout}>
                                {t('questionnaire_specs.prefrences.in_the_middle_of_space')}
                            </ToggleButton>
                        </ButtonGroup>
                    </FormGroup>
                </div>
                <div className={"d-inline-flex m5"}>
                    <FormGroup>
                        <FormLabel>{t('questionnaire_specs.q_materials')}</FormLabel>
                        <ButtonGroup>
                            <ToggleButton variant={"danger"} type="radio" id="matBirch" value={"birch"} name="material"
                                          onChange={changeSpecs}
                                          checked={specs.material === "birch"}>
                                {t('questionnaire_specs.materials.birch')}
                            </ToggleButton>
                            <ToggleButton variant={"danger"} type="radio" id="matOak" value={"oak"} name="material"
                                          onChange={changeSpecs} checked={specs.material === "oak"}>
                                {t('questionnaire_specs.materials.oak')}
                            </ToggleButton>
                            <ToggleButton variant={"danger"} type="radio" id="matWalnut" name="material"
                                          value={"walnut"}
                                          onChange={changeSpecs} checked={specs.material === "walnut"}>
                                {t('questionnaire_specs.materials.walnut')}
                            </ToggleButton>
                        </ButtonGroup>
                        <ButtonGroup>
                            <ToggleButton variant={"danger"} type="radio" id="colWhite" name="color" value="#FFFFFF"
                                          onChange={changeSpecs} checked={specs.color === "#FFFFFF"}>
                                {t('questionnaire_specs.materials.white')}
                            </ToggleButton>
                            <ToggleButton variant={"danger"} type="radio" id="colBlack" name="color" value="#000000"
                                          onChange={changeSpecs} checked={specs.color === "#000000"}>
                                {t('questionnaire_specs.materials.black')}
                            </ToggleButton>
                        </ButtonGroup>
                    </FormGroup>
                </div>
                <div className="m5">
                    <FormGroup>
                        <FormLabel>{t('questionnaire_specs.q_other')}</FormLabel>
                    </FormGroup>
                    <Form.Control as={"textarea"} rows="3" cols="40" value={varia.requirements}
                                  name="requirements" onChange={changeVaria}></Form.Control>
                </div>
            </Form>
        </div>
    )
}

export default Questionnaire_spec;