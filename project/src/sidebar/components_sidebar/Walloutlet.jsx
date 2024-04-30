import { useState, useEffect } from "react";
import "./Questionnaire.css"
import Form from "react-bootstrap/Form";
import { ButtonGroup, Col, FloatingLabel, Row, ToggleButton } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { useRoomWallLightupContext } from "../../contexts/RoomWallLightupContext.jsx";
import { IoCloseSharp } from "react-icons/io5";

// eslint-disable-next-line react/prop-types
function Walloutlet({ walloutletWall, deleteObst, changeOpening, changeWalloutlet, type, obstId, width, height, depth, walloutletXpos, walloutletYpos, maxHeight }) {
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



    const { selectedWall, setSelectedWall } = useRoomWallLightupContext();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const changeSelectedWall = (wall) => {
        setIsButtonDisabled(true);
        setSelectedWall(wall);
        setTimeout(() => {
            setSelectedWall(null);
            setIsButtonDisabled(false);
        }, 1500); // 1000 milliseconds = 1 second
    }


    function handleInput(event) {
        //prevent use of negative values
        if (event.target.name == "height" || event.target.name == "walloutletYpos") {
            let sum = Number(event.target.value);
            if (event.target.name == "height") {
                sum += Number(walloutletYpos);
            }
            else {
                sum += Number(height);
            }
            if (sum > maxHeight * 100.0) {
                event.preventDefault()
                return;
            }
        }
        //TODO: if length of walls are being saved
        else if (event.target.name == "width" || event.target.name == "walloutletXpos") {

        }
        changeWalloutlet(event);

    }
    function negativeValues(event) {
        //prevent use of negative values
        if (event.key == "-") {
            event.preventDefault();
        }
    }

    return (
        <div className="obstruction-bg mb-2 flex">
            <Button id={"button" + obstId}
                data-testid={"btn-obstacle-expand-" + type}
                variant={"danger"} value={type ?? t("obstructions." + type)}
                onClick={
                    showButton
                }>{t("obstructions." + type)}</Button>
            <Button className={"fa-rectangle-xmark"} data-testid={"btn-obstacle-delete-" + type}
                variant={"danger"} id={"delete" + obstId}
                onClick={(e) => deleteObst(e)}>
                <IoCloseSharp />

            </Button>
            <div className="m-1" hidden={showButton2}>
                <Form.Group>
                    <div className="m-1">
                        <Row>
                            <Col>
                                <FloatingLabel
                                    controlid={"width" + obstId}
                                    label={t('questionnaire_space.width') + '(cm)'}
                                >
                                    <Form.Control type="number" name={"width"} min={0} step={1} value={width}
                                        data-testid={"input-obst-" + type + "-width"}
                                        onChange={(e) => {
                                            handleInput(e)
                                        }}
                                        onKeyPress={negativeValues}
                                        id={"width" + obstId}
                                    />


                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    controlid={"height" + obstId}
                                    label={t('questionnaire_space.height') + '(cm)'}
                                >
                                    <Form.Control type="number" name={"height"} min={0} step={1} value={height}
                                        data-testid={"input-obst-" + type + "-height"}
                                        onChange={(e) => {
                                            handleInput(e)
                                        }}
                                        onKeyPress={negativeValues}
                                        id={"height" + obstId}
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    controlid={"depth" + obstId}
                                    label={t('questionnaire_space.depth') + '(cm)'}
                                >
                                    <Form.Control type="number" name={"depth"} min={0} step={1} value={depth}
                                        data-testid={"input-obst-" + type + "-depth"}
                                        onChange={(e) => {
                                            handleInput(e)
                                        }}
                                        onKeyPress={negativeValues}
                                        id={"depth" + obstId}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>

                    </div>
                </Form.Group>

                <Form.Group >
                    <Row>
                        <Col>
                            <FloatingLabel
                                style={{ fontSize: '0.8rem' }}
                                controlid={"walloutletXpos" + obstId}
                                label="Walloutlet X Position (cm)"
                            >
                                <Form.Control
                                    type="number"
                                    name={"walloutletXpos"}
                                    min={0} step={1}
                                    value={walloutletXpos}
                                    onChange={(e) => {
                                        handleInput(e)
                                    }}
                                    onKeyPress={negativeValues}
                                    placeholder="Enter X Position (cm)"
                                    id={"xpos" + obstId}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel
                                controlid={"walloutletYpos" + obstId}
                                label="Walloutlet Y Position (cm)"
                                style={{ fontSize: '0.8rem' }}
                            >
                                <Form.Control
                                    type="number"
                                    value={walloutletYpos}
                                    name={"walloutletYpos"}
                                    min={0} step={1}
                                    onChange={(e) => {
                                        handleInput(e)
                                    }}
                                    onKeyPress={negativeValues}
                                    placeholder="Enter Y Position (cm)"
                                    id={"ypos" + obstId}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>

                    <Form.Label data-testid={"question-obstacle-walloutlet-wall"}>
                        {t("obstructions.q_walloutlet.walloutlet_wall")}
                    </Form.Label>
                    <div>
                        <ButtonGroup>
                            {/* Add radio buttons for walloutlet positions */}
                            {["front", "back", "left", "right"].map((x) => (
                                <ToggleButton
                                    key={x}
                                    className="mb-4"
                                    type="radio"
                                    variant="danger"
                                    name={`walloutletWall${obstId}`}
                                    controlid={`${x}-walloutletWall-${obstId}`}
                                    data-testid={`btn-obstacle-walloutlet-position-${x}`}
                                    onClick={(e) => {
                                        changeSelectedWall(x);
                                        changeOpening(e);
                                    }}
                                    disabled={isButtonDisabled} // Set button disabled state
                                    checked={x == walloutletWall}
                                >
                                    {t(`obstructions.q_walloutlet.${x}`)}
                                </ToggleButton>
                            ))}
                        </ButtonGroup>
                    </div>
                </Form.Group>

            </div>
        </div>
    )
}

export default Walloutlet;