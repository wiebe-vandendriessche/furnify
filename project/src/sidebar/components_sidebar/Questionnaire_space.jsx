import "../../App.css"
import {useEffect, useState} from "react";
import "./Questionnaire.css"
import {useConfiguratorContext} from "../../contexts/ConfiguratorContext.jsx";
import Obstruction from "./Obstruction.jsx";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {useTranslation} from 'react-i18next'
import {Col, FloatingLabel, Row, ToggleButton} from "react-bootstrap";


export function Questionnaire_space() {
    //i18n
    const {t, i18n} = useTranslation();
    const [stateId, setStateId] = useState(1);
    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])


    //Uses reactcontext
    const {rectangular, setRectangular, dimensions, setDimensions, obstacles, setObstacles} = useConfiguratorContext();
    //Changes values of dimensions in context
    const changeDim = (event) => {
        setDimensions({...dimensions, [event.target.name]: event.target.value});
        console.log(event.target.name);
    }

    const changeObstacle = (event) => {
        console.log(event)
        console.log(event.target)
        console.log(event.target.name);
        console.log(event.target.value)
        setObstacles((prevObstacles) => prevObstacles.map((obstacle) => obstacle.id == event.target.id.split("obst")[1] ? {
                ...obstacle,
                [event.target.name]: event.target.value
            } : obstacle
        ))
    }

    const changeObstacleDoor = (event) => {
        setObstacles((prevObstacles) => prevObstacles.map((obstacle) => obstacle.id == event.target.getAttribute('controlId').split("obst")[1] ? {
            ...obstacle,
            door: event.target.getAttribute('controlId').split("obst")[0]
        } : obstacle))
    }
    const changeObstacleWindow = (event, value) => {
        setObstacles((prevObstacles) => prevObstacles.map((obstacle) => obstacle.id == event.target.getAttribute('controlId').split("obst")[1] ? {
            ...obstacle,
            window: value
        } : obstacle))
    }

    const deleteObstacle = (event) => {
        event.preventDefault();
        let obstacleIndex = event.currentTarget.id.split("obst")[1]
        setObstacles((prevObstacles) => prevObstacles.filter((obstacle) => (obstacle.id != obstacleIndex)));
    }
    const addObstacles = (event) => {
        setStateId(stateId + 1)
        if (obstacles.length > 0) {
            console.log("value: " + event.currentTarget.getAttribute("value"))
            console.log(stateId)
            setObstacles([...obstacles, {
                type: event.currentTarget.getAttribute("value"),
                width: 0,
                height: 0,
                obstLength: 0,
                id: stateId,
                door: 0,
                window: true
            }]);
        } else {
            console.log("value: " + event.currentTarget.getAttribute("value"))
            setObstacles([{ type: event.currentTarget.getAttribute("value"), width: 0, height: 0, obstLength: 0, id: stateId, door: 0, window: true }]);
        }
        console.log(stateId)
    }

    //prevent user from typing negative values
    function handleKeyPress(event) {
        //prevent use of negative values
        if(event.charCode==45){
            console.log("negative value detected");
            event.preventDefault();
            return false;
        }
        return true;
    }

    const changeForm=(bool)=>{
        setRectangular(bool);
    }


    return (
        <div className={"m-2"}>
            <Form>
                <div className={"mb-4"}>
                    <Form.Group>
                        <div className={"mb-3"} >
                            <h5 datatest-id={"question-space-dimensions"} >{t('questionnaire_space.q_dimensions')}</h5>
                        </div>
                        <div className="m-1">
                            <ButtonGroup>
                                <ToggleButton
                                    onClick={()=>{changeForm(true)}}
                                    datatest-id={"btn-space-room-rectangular"}
                                    type="radio"
                                    value="Rectangular"
                                    variant="danger"
                                    checked={rectangular}
                                >
                                    {t('questionnaire_space.rectangular')}
                                </ToggleButton>
                                <ToggleButton
                                    datatest-id={"btn-space-room-other"}
                                    type="radio"
                                    value="Other"
                                    variant="danger"
                                    checked={!rectangular}
                                    onClick={()=>{changeForm(false)}}>
                                    {t('questionnaire_space.other')}
                                </ToggleButton>
                            </ButtonGroup>
                        </div>
                        <div className={"m-3"}>
                            <Collapse in={rectangular}>
                                <Row>
                                    {Object.entries(dimensions).map(([key, value]) => (
                                            <Col key={key}>
                                                <FloatingLabel
                                                    controlId={"rectangular" + key}
                                                    label={t('questionnaire_space.' + key)}
                                                    className="mb-4"
                                                    datatest-id={"label-space-room-rectangular-"+key}
                                                >
                                                    <Form.Control
                                                        datatest-id={"input-space-room-rectangular-"+key}
                                                        type="number" min={0} step={0.1} value={value}
                                                                  size="sm"
                                                                  name={key} onChange={changeDim}
                                                                  onKeyPress={handleKeyPress}/>
                                                </FloatingLabel>
                                            </Col>
                                        )
                                    )}

                                </Row>
                            </Collapse>
                        </div>
                    </Form.Group>
                </div>
                <Form.Group>
                    <div className={"mb-3"}>
                        <h5 datatest-id={"question-space-aspects"} >{t('questionnaire_space.q_aspects')}</h5>
                    </div>
                    <div className={"m-1"}>
                        <Button datatest-id={"btn-space-aspect-window"} onClick={addObstacles} variant="danger" value={"window"}>
                            {t('obstructions.window')}
                        </Button>
                        <Button datatest-id={"btn-space-aspect-door"} onClick={addObstacles} variant="danger" value={"door"}>
                            {t('obstructions.door')}
                        </Button>
                        <Button datatest-id={"btn-space-aspect-other"} onClick={addObstacles} variant="danger" value={"other"}>
                            {t('obstructions.other')}
                        </Button>
                        <div className={"aspect"}>
                            {obstacles.map((item) => (<Obstruction obstId={"obst" + item.id} type={item.type}
                                                                   length={item.obstLength} width={item.width}
                                                                   height={item.height}
                                                                   door={item.door}
                                                                   window={item.window}
                                                                   key={"obst" + item.id}
                                                                   changeObst={changeObstacle}
                                                                   changeDoor={changeObstacleDoor}
                                                                   changeWindow={changeObstacleWindow}
                                                                   deleteObst={deleteObstacle}/>))}
                        </div>
                    </div>

                </Form.Group>

            </Form>
        </div>
    )
}

export default Questionnaire_space;
