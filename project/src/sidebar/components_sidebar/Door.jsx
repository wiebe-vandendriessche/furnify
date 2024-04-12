import { useState, useEffect } from "react";
import "./Questionnaire.css"
import Form from "react-bootstrap/Form";
import { ButtonGroup, Col, FloatingLabel, Row, ToggleButton } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { useRoomWallLightupContext } from "../../contexts/RoomWallLightupContext.jsx";

// eslint-disable-next-line react/prop-types
function Door({ deleteObst, changeObst, changeDoor, changeObstacle, type, obstId, length, width, height, door, obstacle }) {
    //i18n
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    const [showButton1, setShow1] = useState(false);
    const [showButton2, setShow2] = useState(true);
    const showButton = () => {
        setShow2(!showButton2)
        setShow1(!showButton1)
    };

    const [insideLeftDoor, setInsideLeftDoor] = useState(false);
    const [insideRightDoor, setInsideRightDoor] = useState(false);
    const [outsideDoor, setOutsideDoor] = useState(false);

    const changeInsideLeftDoor = () => {

        setInsideLeftDoor(true)
        setInsideRightDoor(false)
        setOutsideDoor(false)

    }
    const changeInsideRightDoor = () => {

        setInsideLeftDoor(false)
        setInsideRightDoor(true)
        setOutsideDoor(false)

    }
    const changeOutsideDoor = () => {
        setInsideLeftDoor(false)
        setInsideRightDoor(false)
        setOutsideDoor(true)

    }



    const { selectedWall, setSelectedWall } = useRoomWallLightupContext();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const changeSelectedWall = (wall) => {
        setIsButtonDisabled(true);
        setSelectedWall(wall);
        console.log("test changeSelectedWall: " + wall);
        setTimeout(() => {
            setSelectedWall(null);
            setIsButtonDisabled(false);
            console.log("back to zero");
        }, 1500); // 1000 milliseconds = 1 second
    }


    // Track the selected position of the obstacle obstruction
    const [obstacleWall, setObstacleWall] = useState("front");
    const [doorXpos, setDoorXpos] = useState(0.0);

    const handleObstacleXposChange = (event) => {
        console.log("Changing door x to: " + event.target.value)
        setDoorXpos(event.target.value);
    };



    const handleObstacleWallChange = (obstacleWall) => {
        // Update the selected position state
        console.log("setting obstacleWall to: " + obstacleWall)
        setObstacleWall(obstacleWall);
    };

    function handleKeyPress(event) {
        //prevent use of negative values
        if (event.charCode == 45) {
            console.log("negative value detected");
            event.preventDefault();
            return false;
        }
        return true;
    }

    console.log(obstId);
    console.log(obstacleWall)
    console.log(doorXpos);
    console.log(type)

    return (
        <div className="obstruction-bg mb-2 flex">
            <Button id={"button" + obstId}
                    data-testid={"btn-obstacle-expand-" + type}
                    variant={"danger"} value={type ?? t("obstructions." + type)}
                    onClick={(e) => {
                        showButton()
                    }}>{t("obstructions." + type)}</Button>
            <Button className={"fa-rectangle-xmark"} data-testid={"btn-obstacle-delete-" + type}
                    variant={"danger"} id={"delete" + obstId}
                    onClick={(e) => deleteObst(e)}>
                x
            </Button>
            <div className="m-1" hidden={showButton2}>
                <Form.Group>
                    <div className="m-1">
                        <Row>
                            <Col>
                                <FloatingLabel
                                    controlid={"width" + obstId}
                                    label={t('questionnaire_space.width')}
                                >
                                    <Form.Control type="number" name={"width"} min={0} step={0.1} defaultValue={width}
                                                  data-testid={"input-obst-" + type + "-width"}
                                                  onChange={(e) => changeObst(e)}
                                                  onKeyPress={handleKeyPress} />


                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    controlid={"height" + obstId}
                                    label={t('questionnaire_space.height')}
                                >
                                    <Form.Control type="number" name={"height"} min={0} step={0.1} defaultValue={height}
                                                  data-testid={"input-obst-" + type + "-height"}
                                                  onChange={(e) => changeObst(e)}
                                                  onKeyPress={handleKeyPress} />
                                </FloatingLabel>
                            </Col>
                        </Row>

                    </div>
                </Form.Group>

                <Form.Group>
                    <Form.Label data-testid={"question-obstacle-door-opening"}> {t('obstructions.q_door.opening_door')}</Form.Label>
                    <div>
                        <ButtonGroup>
                            <ToggleButton
                                controlid={"left" + obstId}
                                className="mb-4"
                                name={"door"}
                                onClick={(e) => {
                                    changeInsideLeftDoor()
                                    changeDoor(e)
                                }}
                                data-testid={"btn-obstacle-door-inside-l"}
                                type="radio"
                                value={"left" + obstId}
                                variant="danger"
                                checked={insideLeftDoor}
                            >
                                {t('obstructions.q_door.inside_left')}
                            </ToggleButton>
                            <ToggleButton
                                controlid={"right" + obstId}
                                className="mb-4"
                                name={"door"}
                                onClick={(e) => {
                                    changeInsideRightDoor()
                                    changeDoor(e)
                                }}
                                data-testid={"btn-obstacle-door-inside-r"}
                                type="radio"
                                value={"right" + obstId}
                                variant="danger"
                                checked={insideRightDoor}
                            >
                                {t('obstructions.q_door.inside_right')}
                            </ToggleButton>
                            <ToggleButton
                                controlid={"out" + obstId}
                                className="mb-4"
                                name={"door"}
                                onClick={(e) => {
                                    changeOutsideDoor()
                                    changeDoor(e)
                                }}
                                type="radio"
                                data-testid={"btn-obstacle-door-outside"}
                                value={"out" + obstId}
                                variant="danger"
                                checked={outsideDoor}>
                                {t('obstructions.q_door.outside')}
                            </ToggleButton>
                        </ButtonGroup>
                    </div>
                    <Row>
                        <Col>
                            <FloatingLabel
                                controlid={"doorXpos" + obstId}
                                label="Obstacle X Position"
                            >
                                <Form.Control
                                    type="number"
                                    name={"doorXpos"}
                                    min={0} step={0.1}
                                    defaultValue={doorXpos}
                                    onChange={handleObstacleXposChange}
                                    placeholder="Enter X Position"
                                />
                            </FloatingLabel>
                        </Col>

                    </Row>

                    <Form.Label data-testid={"question-obstacle-obstacle-wall"}>
                        {t("obstructions.q_window.window_wall")}
                    </Form.Label>
                    <div>
                        <ButtonGroup>
                            {/* Add radio buttons for obstacle positions */}
                            {["front", "back", "left", "right"].map((x) => (
                                <ToggleButton
                                    key={x}
                                    className="mb-4"
                                    type="radio"
                                    variant="danger"
                                    name={`obstacleWall${obstId}`}
                                    controlid={`obstacleWall${obstId}`}
                                    data-testid={`btn-obstacle-obstacle-position-${x}`}
                                    checked={obstacleWall === x}
                                    onClick={() => {
                                        handleObstacleWallChange(x);
                                        changeSelectedWall(x);
                                    }}
                                    disabled={isButtonDisabled} // Set button disabled state
                                >
                                    {t(`obstructions.q_window.${x}`)}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </div>
                </Form.Group>

            </div>
        </div>
    )
}

export default Door;
