import { useState, useEffect } from "react";
import "./Questionnaire.css"
import Form from "react-bootstrap/Form";
import { ButtonGroup, Col, FloatingLabel, Row, ToggleButton } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import { useRoomWallLightupContext } from "../../contexts/RoomWallLightupContext.jsx";

// eslint-disable-next-line react/prop-types
function Window({ windowWall, deleteObst, changeOpening, insideWindow, changeWindow, type, obstId, width, height, windowXpos, windowYpos, maxHeight }) {
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
        console.log("test changeSelectedWall: " + wall);
        setTimeout(() => {
            setSelectedWall(null);
            setIsButtonDisabled(false);
            console.log("back to zero");
        }, 1500); // 1000 milliseconds = 1 second
    }


    function handleInput(event) {
        //prevent use of negative values
        console.log("HOOGTE")
        console.log(windowYpos+height+event.key)
        console.log("RESULTAAT")
        console.log(event)
        console.log(event.charCode)
        if (((event.target.name=="height" || event.target.name=="windowYpos") && !Number.isNaN(event.key) && Number(windowYpos)+Number(height)+Number(event.key)>maxHeight*100)) {
            console.log("negative value detected or height of obstacle>max possible height");
            event.preventDefault();
            return false;
        }
        return true;
    }
    function negativeValues(event){
        //prevent use of negative values
        if (event.key=="-") {
            event.preventDefault();
        }
    }

    /*
    
    function handleInput(event) {
        //prevent use of negative values
        if(!Number.isNaN(event.key) && event.target.name=="height"){
            if(event.target.value>maxHeight*100.0){
                event.preventDefault();
            }
        }
    }
        function handleInput(event) {
        //prevent use of negative values
        if(!Number.isNaN(event.key) && event.target.name=="height"){
            if(event.target.value>maxHeight*100.0){
                event.preventDefault();
            }
        }
    }*/

    console.log(obstId);
    console.log(windowWall)
    console.log(windowXpos);
    console.log(windowYpos);
    console.log(type)

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
                x
            </Button>
            <div className="m-1" hidden={showButton2}>
                <Form.Group>
                    <div className="m-1">
                        <Row>
                            <Col>
                                <FloatingLabel
                                    controlid={"width" + obstId}
                                    label={t('questionnaire_space.width')+ '(cm)'}
                                >
                                    <Form.Control type="number" name={"width"} min={0} step={1} defaultValue={width}
                                                  data-testid={"input-obst-" + type + "-width"}
                                                  onChange={(e) => {
                                                      handleInput(e)
                                                      changeWindow(e)
                                                  }}
                                                  onKeyPress={negativeValues}
                                                  id={"width"+obstId}
                                    />


                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    controlid={"height" + obstId}
                                    label={t('questionnaire_space.height')+ '(cm)'}
                                >
                                    <Form.Control type="number" name={"height"} min={0} step={1} defaultValue={height}
                                                  data-testid={"input-obst-" + type + "-height"}
                                                  onChange={(e) => {
                                                      handleInput(e)
                                                      changeWindow(e)
                                                  }}
                                                  onKeyPress={negativeValues}
                                                  id={"height"+obstId}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>

                    </div>
                </Form.Group>

                <Form.Group >
                    <Form.Label data-testid={"question-obstacle-window-opening"}>{t('obstructions.q_window.opening_window')}</Form.Label>
                    <div>
                        <ButtonGroup>
                            <ToggleButton
                                className="mb-4"
                                type="radio"
                                variant="danger"
                                name={"yes" + obstId}
                                controlid={"yes-inside_window-" + obstId}
                                data-testid={"btn-obstacle-window-inside"}
                                checked={"yes"==insideWindow}
                                onClick={(event) => {
                                    changeOpening(event)
                                }}
                            >{t('obstructions.q_window.yes')} </ToggleButton>
                            <ToggleButton
                                className="mb-4"
                                type="radio"
                                variant="danger"
                                data-testid={"btn-obstacle-window-outside"}
                                name={"no" + obstId}
                                controlid={"no-inside_window-" + obstId}
                                checked={"no"==insideWindow}
                                onClick={(event) => {
                                    changeOpening(event)
                                }}
                            >{t('obstructions.q_window.no')}</ToggleButton>
                        </ButtonGroup>
                    </div>

                    <Row>
                        <Col>
                            <FloatingLabel
                                style={{fontSize: '0.8rem'}}
                                controlid={"windowXpos" + obstId}
                                label="Window X Position (cm)"
                            >
                                <Form.Control
                                    type="number"
                                    name={"windowXpos"}
                                    min={0} step={1}
                                    value={windowXpos}
                                    onChange={(e) => {
                                        handleInput(e)
                                        changeWindow(e)
                                    }}
                                    onKeyPress={negativeValues}
                                    placeholder="Enter X Position (cm)"
                                    id={"xpos"+obstId}
                                />
                            </FloatingLabel>
                        </Col>
                        <Col>
                            <FloatingLabel
                                controlid={"windowYpos" + obstId}
                                label="Window Y Position (cm)"
                                style={{fontSize: '0.8rem'}}
                            >
                                <Form.Control
                                    type="number"
                                    value={windowYpos}
                                    name={"windowYpos"}
                                    min={0} step={1}
                                    onChange={(e) => {
                                        handleInput(e)
                                        changeWindow(e)
                                    }}
                                    onKeyPress={negativeValues}
                                    placeholder="Enter Y Position (cm)"
                                    id={"ypos"+obstId}
                                />
                            </FloatingLabel>
                        </Col>
                    </Row>

                    <Form.Label data-testid={"question-obstacle-window-wall"}>
                        {t("obstructions.q_window.window_wall")}
                    </Form.Label>
                    <div>
                        <ButtonGroup>
                            {/* Add radio buttons for window positions */}
                            {["front", "back", "left", "right"].map((x) => (
                                <ToggleButton
                                    key={x}
                                    className="mb-4"
                                    type="radio"
                                    variant="danger"
                                    name={`windowWall${obstId}`}
                                    controlid={`${x}-windowWall-${obstId}`}
                                    data-testid={`btn-obstacle-window-position-${x}`}
                                    onClick={(e) => {
                                        changeSelectedWall(x);
                                        changeOpening(e);
                                    }}
                                    disabled={isButtonDisabled} // Set button disabled state
                                    checked={x==windowWall}
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

export default Window;
