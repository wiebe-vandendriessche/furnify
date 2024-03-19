import "../../App.css"
import {useEffect, useState} from "react";
import "./questionnaire.css"
import {useConfiguratorContext} from "../../contexts/ConfiguratorContext.jsx";
import Obstruction from "./obstruction";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {useTranslation} from 'react-i18next'
import {Col, FloatingLabel, Row, ToggleButton} from "react-bootstrap";


function Questionnaire_space() {
    //i18n
    const {t, i18n} = useTranslation();
    const [stateId, setStateId] = useState(1);
    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])


    //Uses reactcontext
    const {dimensions, setDimensions, obstacles, setObstacles} = useConfiguratorContext();
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
    const deleteObstacle = (event) => {
        event.preventDefault();
        let obstacleIndex = event.currentTarget.id.split("obst")[1]
        setObstacles((prevObstacles) => prevObstacles.filter((obstacle) => (obstacle.id != obstacleIndex)));
    }
    const [open, setOpen] = useState(false);
    const addObstacles = () => {
        setStateId(stateId + 1)
        if (obstacles.length > 0) {
            console.log("hier")
            console.log(stateId)
            setObstacles([...obstacles, {
                type: t('obstructions.type'),
                width: 0,
                height: 0,
                obstLength: 0,
                id: stateId
            }]);
        } else {

            setObstacles([{type: t('obstructions.type'), width: 0, height: 0, obstLength: 0, id: stateId}]);
        }
        console.log(stateId)
    }


    return (
        <div className={"m-2"}>
            <Form>
                <div className={"mb-4"}>
                    <Form.Group>
                        <div className={"mb-3"}>
                            <h5>{t('questionnaire_space.q_dimensions')}</h5>
                        </div>
                        <div className="m-1">
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
                        <div className={"m-3"}>
                            <Collapse in={open}>
                                <Row>
                                    {Object.entries(dimensions).map(([key, value]) => (
                                            <Col key={key}>
                                                <FloatingLabel
                                                    controlId={"rectangular" + key}
                                                    label={t('questionnaire_space.' + key)}
                                                    className="mb-4"
                                                >
                                                    <Form.Control type="number" min={0} step={0.1} value={value}
                                                                  size="sm"
                                                                  name={key} onChange={changeDim}/>
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
                        <h5>{t('questionnaire_space.q_aspects')}</h5>
                    </div>
                    <div className={"m-1 aspect"}>
                        <Button onClick={addObstacles} variant="danger">{t('questionnaire_space.aspect')}</Button>
                        <div>
                            {obstacles.map((item) => (<Obstruction obstId={"obst" + item.id} type={item.type}
                                                                   length={item.obstLength} width={item.width}
                                                                   height={item.height}
                                                                   key={"obst" + item.id}
                                                                   changeObst={changeObstacle}
                                                                   deleteObst={deleteObstacle}/>))}
                        </div>
                    </div>

                </Form.Group>

            </Form>
        </div>
    )
}

export default Questionnaire_space;