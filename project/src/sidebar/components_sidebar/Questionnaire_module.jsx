import "../../App.css"
import "./Questionnaire.css"
import { useVariaContext } from "../../contexts/VariaContext.jsx";
import { useConfiguratorContext } from "../../contexts/ConfiguratorContext.jsx";
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { ToggleButton, Collapse, ButtonGroup, Form, FloatingLabel, Button, FormGroup } from "react-bootstrap";
import { check } from "../../algorithm/module_choice.ts";
import { use2d } from "../../contexts/2dContext.tsx"
import { useModuleContext } from "../../contexts/ModuleContext.jsx"


export function Questionnaire_module() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])



    const varia = useVariaContext();


    const { rotate } = useConfiguratorContext();

    const get2D = use2d();
    const value = useConfiguratorContext();


    const { errors, setErrors } = useModuleContext();
    const { possible_modules, setPossileModules } = useModuleContext();
    const { chosen_module, setChosenModule } = useModuleContext();
    const module = (event) => {
        let result = check(value, varia, get2D);
        setErrors({
            softer: result.errors.softer,
            demands: result.errors.demands,
            roomSize: result.errors.roomSize,
            points2D: result.errors.points2D
        });
        setPossileModules(result.possible)
        if (result.possible.length == 0) {
            setChosenModule({name: "", height: 0, width:0, depth:0, open: 0, closed:0,saved:0,bed:false,
            sofa:false,desk:false, storage:false, width_options:[],components:[]})
        }
        else {
            setChosenModule(result.possible[0]);
        }
    }

    const changeMod = (event) => {

        console.log(event.target)
        console.log(possible_modules[event.target.id])
        setChosenModule(possible_modules[event.target.id])

    }



    return (

        <div className="m-2">
            <Form>
                <div className={"mb-3"}>
                    <FormGroup>
                        <div className={"mb-3"}>
                            <h5>Please press the button to discover which modules would fit you</h5>
                            <Button onClick={module} variant="danger">
                                Find Modules
                            </Button>
                        </div>
                        <div>
                            {Object.entries(errors).map(([key, value]) => (
                                <Collapse in={value} key={key}>
                                    <h6>{"Error: " + key}</h6>
                                </Collapse>
                            ))}
                        </div>
                        <div hidden={chosen_module.name == "" || (errors.points2D || errors.demands || errors.roomSize)}>
                            <div>
                                {Object.entries(possible_modules).map(([key, value]) => (
                                    <ToggleButton key={value.name} className={"tbtn"} type="radio"
                                        variant={"outline-danger"}
                                        id={key}
                                        onChange={changeMod}
                                        checked={value.name == chosen_module.name}>{value.name}</ToggleButton>
                                ))}
                            </div>
                            <div className={"aspect"}>
                                <div id="name">
                                    <span>Naam: </span>
                                    <span>{chosen_module.name}</span> 
                                </div>
                                <div id="saved">
                                    <span>Bespaarde vierkantemeters: </span>
                                    <span>{chosen_module.saved}</span> 
                                </div>
                                <div id="saved">
                                    <span>Componenten: </span>
                                    {Object.entries(chosen_module.components).map(([key, value]) => (
                                    <span>{value} </span> 
                                    ))}
                                </div>


                                <ToggleButton onClick={rotate}>Rotate 90</ToggleButton>
                            </div>
                        </div>
                    </FormGroup>
                </div>
            </Form >
        </div >


    )
}

export default Questionnaire_module;
