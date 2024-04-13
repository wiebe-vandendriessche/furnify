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
import Window from "./Window.jsx";
import Door from "./Door.jsx";


export function Questionnaire_space() {
    //i18n
    const {t, i18n} = useTranslation();
    const [stateId, setStateId] = useState(1);
    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    const sortObstacles = (list1, list2, list3) => {
        //merge the lists
        const allObsts = [...list1, ...list2, ...list3];
        console.log("BEGIN")
        console.log(allObsts)
        // sort the list according to id
        allObsts.sort((a, b) => a.id - b.id);
        console.log("EINDE")
        console.log(allObsts)
        return allObsts;
    }

    function createObstacle(valueType) {
        switch (valueType) {
            case "door":
                return {
                    type: valueType,
                    width: 0,
                    height: 0,
                    id: stateId,
                    opening_door: "right",
                    obstacleWall: "front",
                    doorXpos: 0
                };
            case "window":
                return {
                    type: valueType,
                    width: 0,
                    height: 0,
                    id: stateId,
                    windowWall: "front",
                    inside_window: "no",
                    windowXpos: 0,
                    windowYpos: 0
                };
            default:
                return {
                    type: valueType,
                    width: 0,
                    height: 0,
                    obstLength: 0,
                    id: stateId,
                };
        }
    }

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
        setObstacles({
            ...obstacles,
            other: obstacles["other"].map((obstacle)=>obstacle.id==event.target.id.split("obst")[1]?{
                ...obstacle,
                [event.target.name]: event.target.value}:
            obstacle)})
        }


    const changeDoor= (event)=>{
        console.log("VERANDERING");
        console.log("ID:" +event.target.id);
        console.log("NAME:"+event.target.name)
        setObstacles({
            ...obstacles,
            door: obstacles["door"].map((obstacle)=> obstacle.id == event.target.id.split("door")[1]?{
                ...obstacle,
                [event.target.name]: event.target.value}:obstacle)
            })
        }
    const changeWindow= (event)=>{
        setObstacles({
            ...obstacles,
            window: obstacles["window"].map((obstacle)=> obstacle.id == event.target.id.split("window")[1]?{
                ...obstacle,
                [event.target.name]: event.target.value}:obstacle)
            })
        }



    //Opening door done separate, because it doesn't work otherwise
    const changeOpeningDoor = (event) => {
        let param=event.target.getAttribute("controlid").split("-");
        console.log("SPLIT:"+param);
        console.log(param[0]);
        console.log(param[2].split("door"))
        setObstacles({
            ...obstacles,
            door: obstacles["door"].map((obstacle) => obstacle.id == param[2].split("door")[1] ? {
                ...obstacle,
                [param[1]]: param[0]
            } : obstacle)
        })

    }
    const changeOpeningWindow = (event) => {
        let param=event.target.getAttribute("controlid").split("-");
        console.log("SPLIT:"+param);
        console.log(param[0]);
        console.log(param[2].split("window"))
        setObstacles({
            ...obstacles,
            window: obstacles["window"].map((obstacle) => obstacle.id == param[2].split("window")[1] ? {
                ...obstacle,
                [param[1]]: param[0]
            } : obstacle)
        })

    }

    const deleteObstacle = (event) => {
        event.preventDefault();
        let obstacleIndex = event.currentTarget.id.split("obst")[1];
        console.log(event.currentTarget.id)
        console.log("INDEX" + obstacleIndex);
        setObstacles((prevObstacles) => ({
            ...prevObstacles,
            other: prevObstacles.other.filter((obstacle) => obstacle.id != obstacleIndex)
        }));
    };

    const deleteDoorObstacle = (event) => {
        event.preventDefault();
        let obstacleIndex = event.currentTarget.id.split("door")[1];
        console.log("ID"+event.currentTarget.id)
        console.log("INDEX" + obstacleIndex);
        setObstacles((prevObstacles) => ({
            ...prevObstacles,
            door: prevObstacles.door.filter((obstacle) => obstacle.id != obstacleIndex)
        }));
    };
    const deleteWindowObstacle = (event) => {
        event.preventDefault();
        let obstacleIndex = event.currentTarget.id.split("window")[1];
        console.log("ID"+event.currentTarget.id)
        console.log("INDEX" + obstacleIndex);
        setObstacles((prevObstacles) => ({
            ...prevObstacles,
            window: prevObstacles.window.filter((obstacle) => obstacle.id != obstacleIndex)
        }));
    };

    const addObstacles = (event) => {
        setStateId(stateId + 1)
        const valueType = event.currentTarget.getAttribute("value");
        let obst=createObstacle(valueType);
        if (obstacles[valueType].length>0) {
            console.log(obstacles[event.currentTarget.getAttribute("value")])
            console.log("value: " + event.currentTarget.getAttribute("value"))
            console.log(stateId)
            setObstacles({
                    ...obstacles, [valueType]: [...obstacles[valueType], obst]
                });
            }

        else {
            console.log("value: " + event.currentTarget.getAttribute("value"))
            setObstacles({
                    ...obstacles, [valueType] : [obst]
                });


        }
        console.log(stateId)
        console.log(obstacles)
    }


    //prevent user from typing negative values
    function handleKeyPress(event) {
        //prevent use of negative values
        if (event.charCode == 45) {
            console.log("negative value detected");
            event.preventDefault();
            return false;
        }
        return true;
    }

    const changeForm = (bool) => {
        setRectangular(bool);
    }
    console.log("OBSTACLES:")
    console.log(obstacles)


    return (
        <div className={"m-2"}>
            <Form>
                <div className={"mb-4"}>
                    <Form.Group>
                        <div className={"mb-3"}>
                            <h5 data-testid={"question-space-dimensions"}>{t('questionnaire_space.q_dimensions')}</h5>
                        </div>
                        <div className="m-1">
                            <ButtonGroup>
                                <ToggleButton
                                    onClick={() => {
                                        changeForm(true)
                                    }}
                                    data-testid={"btn-space-room-rectangular"}
                                    type="radio"
                                    value="Rectangular"
                                    variant="danger"
                                    checked={rectangular}
                                >
                                    {t('questionnaire_space.rectangular')}
                                </ToggleButton>
                                <ToggleButton
                                    data-testid={"btn-space-room-other"}
                                    type="radio"
                                    value="Other"
                                    variant="danger"
                                    checked={!rectangular}
                                    onClick={() => {
                                        changeForm(false)
                                    }}>
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
                                                    controlid={"rectangular" + key}
                                                    label={t('questionnaire_space.' + key) +' (m)'}
                                                    className="mb-4"
                                                    data-testid={"label-space-room-rectangular-" + key}
                                                >
                                                    <Form.Control
                                                        data-testid={"input-space-room-rectangular-" + key}
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
                        <h5 data-testid={"question-space-aspects"}>{t('questionnaire_space.q_aspects')}</h5>
                    </div>
                    <div className={"m-1"}>
                        <Button data-testid={"btn-space-aspect-window"} onClick={addObstacles} variant="danger"
                                value={"window"}>
                            {t('obstructions.window')}
                        </Button>
                        <Button data-testid={"btn-space-aspect-door"} onClick={addObstacles} variant="danger"
                                value={"door"}>
                            {t('obstructions.door')}
                        </Button>
                        <Button data-testid={"btn-space-aspect-other"} onClick={addObstacles} variant="danger"
                                value={"other"}>
                            {t('obstructions.other')}
                        </Button>
                        <div className={"aspect"}>
                            {sortObstacles(obstacles["window"], obstacles["door"], obstacles["other"]).map(item => {
                                console.log("item voordien:");
                                console.log(item);
                                console.log("type:" + item.type);
                                console.log("id: " + item.id);
                                console.log("opening:"+item.opening_door)
                                console.log("item nadien:");
                                console.log(item);
                                if (item.type === "window") {
                                    return <Window
                                        obstId={"window" + item.id}
                                        type={item.type}
                                        width={item.width}
                                        height={item.height}
                                        insideWindow={item.inside_window}
                                        key={"obst" + item.id}
                                        windowXpos={item.windowXpos}
                                        windowYpos={item.windowYpos}
                                        changeOpening={changeOpeningWindow}
                                        changeWindow={changeWindow}
                                        deleteObst={deleteWindowObstacle}
                                        windowWall={item.windowWall}
                                    />;
                                } else if (item.type === "door") {
                                    console.log("OPENING");
                                    console.log(item.opening_door);
                                    return <Door
                                        obstId={"door" + item.id}
                                        type={item.type}
                                        width={item.width}
                                        height={item.height}
                                        openingDoor={item.opening_door}
                                        key={"obst" + item.id}
                                        doorXpos={item.doorXpos}
                                        changeDoor={changeDoor}
                                        changeOpening={changeOpeningDoor}
                                        deleteObst={deleteDoorObstacle}
                                        doorWall={item.obstacleWall}
                                    />;
                                } else {
                                    return <Obstruction
                                        obstId={"obst" + item.id}
                                        type={item.type}
                                        length={item.obstLength}
                                        width={item.width}
                                        height={item.height}
                                        key={"obst" + item.id}
                                        changeObst={changeObstacle}
                                        deleteObst={deleteObstacle}
                                        obstLength={item.obstLength}
                                    />;
                                }
                            })}




                        </div>
                    </div>

                </Form.Group>

            </Form>
        </div>
    )
}

export default Questionnaire_space;
