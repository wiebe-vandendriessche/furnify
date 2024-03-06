import "../../App.css"
import { useEffect, useState } from "react";
import "./questionnaire.css"
import { useConfiguratorContext } from "../../contexts/MyContext.jsx";
import Obstruction from "./obstruction";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { FloatingLabel, ToggleButton } from "react-bootstrap";
import { useTranslation } from 'react-i18next'


function Questionnaire_space() {
    //i18n
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    const lng = navigator.language;


    //Uses reactcontext
    const { dimensions, setDimensions, obstacles, setObstacles} = useConfiguratorContext();
    //Changes value of context
    const changeWidth = (event) => {
        setDimensions({...dimensions, width: event.target.value});
    }
    const changeLength = (event) => {
        setDimensions({...dimensions, length: event.target.value})
    }

    const changeHeight = (event) => {
        setDimensions({...dimensions, height: event.target.value})
    }
    const changeObstacleType=(event)=>{
        setObstacles((prevObstacles)=>prevObstacles.map((obstacle, index)=> index==event.target.id.split("obst")[1]?{...obstacle, type: event.target.value}:obstacle))
    }
    const changeObstacleLength=(event)=>{
        setObstacles((prevObstacles)=>prevObstacles.map((obstacle, index)=>index==event.target.name.split("obst")[1]?{...obstacle, length:event.target.value}:obstacle))
    }
    const changeObstacleWidth=(event)=>{
        setObstacles((prevObstacles)=>prevObstacles.map((obstacle, index)=>index==event.target.name.split("obst")[1]?{...obstacle, width: event.target.value}:obstacle))
    }
    const changeObstacleHeight=(event)=>{
        setObstacles((prevObstacles)=>prevObstacles.map((obstacle, index)=>index==event.target.name.split("obst")[1]?{...obstacle, height:event.target.value}:obstacle))
    }
    const deleteObstacle=(event)=>{
        setObstacles((prevObstacles)=>prevObstacles.filter((obstacle, index)=>(index!=event.target.id.split("obst")[1])))
        console.log("verwijder");
    }
    const [open, setOpen] = useState(false);
    const addObstacles = () => {
        if (obstacles.length > 0) {
            setObstacles([...obstacles, (obstacles[obstacles.length - 1] + 1)]);
        } else {
            setObstacles([{type: "type", width: 0, height: 0, length:0}]);
        }
    }


    return (

        /*<div>
            <table>
                <tbody>
                <tr>
                    <td>
                        <fieldset>
                            <legend>
                                Wat zijn de afmetingen van de woonruimte?
                            </legend>
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        Vorm:
                                    </td>
                                    <td>
                                        <input type="radio" id="colRectangular" name="space" value="Rectangular"
                                               onClick={showDim}/>
                                        <label htmlFor="colRectangular">Rechthoekig</label>
                                        <input type="radio" id="colOther" name="space" value="Other"
                                               onClick={showNoDim}/>
                                        <label htmlFor="colOther">Anders</label>
                                    </td>
                                </tr>
                                <tr hidden={showDims}>
                                    <td>
                                        <label htmlFor="length">Lengte:</label>
                                    </td>
                                    <td>
                                        <input id="length" type="number" min={0} step={0.1} value={dimensions.length}
                                               onChange={changeLength}/>
                                    </td>
                                    <td>
                                        <p>cm</p>
                                    </td>
                                </tr>
                                <tr hidden={showDims}>
                                    <td>
                                        <label htmlFor="width">Breedte:</label>
                                    </td>
                                    <td>
                                        <input id="width" type="number" min={0} step={0.1} value={dimensions.width}
                                               onChange={changeWidth}/>
                                    </td>
                                    <td>
                                        <p>cm</p>
                                    </td>
                                </tr>
                                <tr hidden={showDims}>
                                    <td>
                                        <label htmlFor="height">Hoogte:</label>
                                    </td>
                                    <td>
                                        <input id="height" type="number" min={0} step={0.1} value={dimensions.height}
                                               onChange={changeHeight}/>
                                    </td>
                                    <td>
                                        <p>cm</p>
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
                                Voeg toe met welke aspecten we in uw woonruimte rekening moeten houden.
                            </legend>

                            <button onClick={addObstr}>Voeg aspect toe</button>
                            <div>
                                {Obst.map((item) => (<Obstruction key={item}/>))}
                            </div>

                        </fieldset>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>*/
        <Form className="overflow-auto">
            <Form.Group>
                <Form.Label>{t('questionnaire_space.q_dimensions')}</Form.Label>
                <div className="mb-3">
                    <ButtonGroup>
                        <ToggleButton
                            onClick={() => setOpen(!open)}
                            type="radio"
                            value="Rectangular"
                            variant="danger"
                            checked={open}
                        >
                            {t('questionnaire_space.rectangular')}
                        </ToggleButton>
                        <ToggleButton
                            type="radio"
                            value="Other"
                            variant="danger"
                            checked={!open}
                            onClick={() => setOpen(false)}>
                            {t('questionnaire_space.other')}
                        </ToggleButton>
                    </ButtonGroup>
                </div>
                <Collapse in={open}>
                    <div>
                        <FloatingLabel
                            controlId="floatingInput"
                            label={t('questionnaire_space.length')}
                            className="mb-4"
                        >
                            <Form.Control type="number" min={0} step={0.1} value={dimensions.length} size="sm"
                                onChange={changeLength} />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label={t('questionnaire_space.width')}
                            className="mb-4"
                        >
                            <Form.Control type="number" min={0} step={0.1} value={dimensions.length} size="sm"
                                onChange={changeWidth} />
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label={t('questionnaire_space.height')}
                            className="mb-4"
                        >
                            <Form.Control type="number" min={0} step={0.1} value={dimensions.length} size="sm"
                                onChange={changeHeight} />
                        </FloatingLabel>
                    </div>
                </Collapse>
            </Form.Group>
            <Form.Group>
                <Form.Label>Voeg toe met welke aspecten we in uw woonruimte rekening moeten houden.</Form.Label>
                <Button onClick={addObstacles} variant="danger">Voeg aspect toe</Button>
                <div>
                    {obstacles.map((item, index) => (<Obstruction obstId={"obst" + JSON.stringify(index)} type={item.type}
                                                                  length={item.length} width={item.width} height={item.height}
                                                                  changeLength={changeObstacleLength} changeHeight={changeObstacleHeight}
                                                                  changeWidth={changeObstacleWidth} key={"obst"+index} changeType={changeObstacleType}
                                                                  deleteObst={deleteObstacle}      />))}
                </div>
            </Form.Group>

        </Form>


    )
}

export default Questionnaire_space;