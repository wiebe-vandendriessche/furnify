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
    //Changes value of context
    const changeWidth = (event) => {
        setDimensions({...dimensions, width: event.target.value});
        console.log("d: ", dimensions);
    }
    const changeLength = (event) => {
        setDimensions({...dimensions, length: event.target.value})
    }

    const changeHeight = (event) => {
        setDimensions({...dimensions, height: event.target.value})
    }
    const changeObstacleType = (event) => {
        setObstacles((prevObstacles) => prevObstacles.map((obstacle) => obstacle.id == event.target.id.split("obst")[1] ? {
            ...obstacle,
            type: event.target.value
        } : obstacle))
    }
    const changeObstacleLength = (event) => {
        setObstacles((prevObstacles) => prevObstacles.map((obstacle) => obstacle.id == event.target.name.split("obst")[1] ? {
            ...obstacle,
            obstLength: event.target.value
        } : obstacle))
    }
    const changeObstacleWidth = (event) => {
        setObstacles((prevObstacles) => prevObstacles.map((obstacle) => obstacle.id == event.target.name.split("obst")[1] ? {
            ...obstacle,
            width: event.target.value
        } : obstacle))
    }
    const changeObstacleHeight = (event) => {
        setObstacles((prevObstacles) => prevObstacles.map((obstacle) => obstacle.id == event.target.name.split("obst")[1] ? {
            ...obstacle,
            height: event.target.value
        } : obstacle))
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
        <Form className="overflow-auto">
            <Form.Group>
                <Form.Label>{t('questionnaire_space.q_dimensions')}</Form.Label>
                <div className="mb-3 m5">
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
                    <div className="m5">
                        <Row>
                            <Col>
                                <FloatingLabel
                                    controlId="rectangularLength"
                                    label={t('questionnaire_space.length')}
                                    className="mb-4"
                                >
                                    <Form.Control type="number" min={0} step={0.1} value={dimensions.length} size="sm"
                                                  onChange={changeLength} />
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    controlId="rectangularWidth"
                                    label={t('questionnaire_space.width')}
                                    className="mb-4"
                                >
                                    <Form.Control type="number" min={0} step={0.1} value={dimensions.width} size="sm"
                                                  onChange={changeWidth} />
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    controlId="rectangularHeight"
                                    label={t('questionnaire_space.height')}
                                    className="mb-4"
                                >
                                    <Form.Control type="number" min={0} step={0.1} value={dimensions.height} size="sm"
                                                  onChange={changeHeight} />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </div>
                </Collapse>
            </Form.Group>
            <Form.Group>
                <Form.Label>{t('questionnaire_space.q_aspects')}</Form.Label>
                <Button onClick={addObstacles} variant="danger">{t('questionnaire_space.aspect')}</Button>
                <div className="m5">
                    {obstacles.map((item) => (<Obstruction obstId={"obst" + item.id} type={item.type}
                                                           length={item.obstLength} width={item.width}
                                                           height={item.height}
                                                           changeLength={changeObstacleLength}
                                                           changeHeight={changeObstacleHeight}
                                                           changeWidth={changeObstacleWidth}
                                                           key={"obst" + item.id}
                                                           changeType={changeObstacleType}
                                                           deleteObst={deleteObstacle}/>))}
                </div>
            </Form.Group>

        </Form>


    )
}

export default Questionnaire_space;