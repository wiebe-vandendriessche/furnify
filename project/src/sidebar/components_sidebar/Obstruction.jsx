import {useState, useEffect} from "react";
import "./Questionnaire.css"
import Form from "react-bootstrap/Form";
import {ButtonGroup, Col, FloatingLabel, Row, ToggleButton} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useTranslation} from "react-i18next";

// eslint-disable-next-line react/prop-types
function Obstruction({deleteObst, changeObst, changeDoor, changeWindow, type, obstId, length, width, height, door, window}) {
    //i18n
    const {t, i18n} = useTranslation();

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
    const [hideDoor, setHideDoor] = useState(true);
    const [hideWindow, setHideWindow] = useState(true);
    const showExtraQuestion = (event) => {
        showWichQuestion(event.target.value)
    }
    const showWichQuestion = (value) => {
        setHideDoor(true)
        setHideWindow(true)
        if (value == t('obstructions.door')) {
            setHideDoor(false)
            if (door == 'left') {
                changeInsideLeftDoor()
            } else if (door == 'right') {
                changeInsideRightDoor()
            } else if (door == 'out') {
                changeOutsideDoor()
            }
        } else if (value == t('obstructions.window')) {
            setHideWindow(false)
        }
    }
    const [insideWindow, setinsideWindow] = useState(window);

    function handleKeyPress(event) {
        // Allow digits (0-9) and prevent backspace (charCode 8)
        if (
            (event.charCode !== 8 && event.charCode === 0) ||
            (event.charCode >= 48 && event.charCode <= 57)
        ) {
            return true;
        } else {
            event.preventDefault();
            return false;
        }
    }

    console.log(obstId);
    console.log(type)
    return (
        <div className="obstruction-bg mb-2 flex">
            <Button id={"button" + obstId} variant={"danger"} value={type ?? t(type)}
                   onClick={(e) => {
                       showButton()
                       showExtraQuestion(e)}}>{t(type)}</Button>
            <Button className={"fa-rectangle-xmark"} variant={"danger"} id={"delete" + obstId}
                    onClick={(e) => deleteObst(e)}>
                x
            </Button>
            <div className="m-1" hidden={showButton2}>
                <Form.Group className="mb-3">
                    <Form.Select name="type" id={"type" + obstId}
                                 defaultValue={type}
                                 onChange={(e) => {
                                     changeObst(e)
                                     showExtraQuestion(e)
                                 }}>
                        <option value={t('obstructions.other')}>{t('obstructions.other')}</option>
                        <option value={t('obstructions.window')}>{t('obstructions.window')}</option>
                        <option value={t('obstructions.door')}>{t('obstructions.door')}</option>
                        <option value={t('obstructions.radiator')}>{t('obstructions.radiator')}</option>
                        <option value={t('obstructions.walloutlet')}>{t('obstructions.walloutlet')}</option>
                        <option value={t('obstructions.switch')}>{t('obstructions.switch')}</option>
                        <option value={t('obstructions.sloping_Wall')}>{t('obstructions.sloping_Wall')}</option>

                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <div className="m-1">
                        <Row>
                            <Col>
                                <FloatingLabel
                                    controlId={"length" + obstId}
                                    label={t('questionnaire_space.length')}
                                >
                                    <Form.Control type="number" name={"obstLength"} min={0} step={0.1}
                                                  defaultValue={length} onChange={(e) => changeObst(e)}
                                                  onKeyPress={handleKeyPress}/>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    controlId={"width" + obstId}
                                    label={t('questionnaire_space.width')}
                                >
                                    <Form.Control type="number" name={"width"} min={0} step={0.1} defaultValue={width}
                                                  onChange={(e) => changeObst(e)}
                                                  onKeyPress={handleKeyPress}/>

                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    controlId={"height" + obstId}
                                    label={t('questionnaire_space.height')}
                                >
                                    <Form.Control type="number" name={"height"} min={0} step={0.1} defaultValue={height}
                                                  onChange={(e) => changeObst(e)}
                                                  onKeyPress={handleKeyPress}/>
                                </FloatingLabel>
                            </Col>
                        </Row>

                    </div>
                </Form.Group>

                <Form.Group hidden={hideDoor}>
                    <Form.Label> {t('obstructions.q_door.opening_door')}</Form.Label>
                    <div>
                        <ButtonGroup>
                            <ToggleButton
                                controlId={"left" + obstId}
                                className="mb-4"
                                name={"left" + obstId}
                                onClick={(e) => {
                                    changeInsideLeftDoor()
                                    changeDoor(e)
                                }}
                                type="radio"
                                value="Rectangular"
                                variant="danger"
                                checked={insideLeftDoor}
                            >
                                {t('obstructions.q_door.inside_left')}
                            </ToggleButton>
                            <ToggleButton
                                controlId={"right" + obstId}
                                className="mb-4"
                                name={"right" + obstId}
                                onClick={(e) => {
                                    changeInsideRightDoor()
                                    changeDoor(e)
                                }}
                                type="radio"
                                value="Rectangular"
                                variant="danger"
                                checked={insideRightDoor}
                            >
                                {t('obstructions.q_door.inside_right')}
                            </ToggleButton>
                            <ToggleButton
                                controlId={"out" + obstId}
                                className="mb-4"
                                name={"out" + obstId}
                                onClick={(e) => {
                                    changeOutsideDoor()
                                    changeDoor(e)
                                }}
                                type="radio"
                                value="Other"
                                variant="danger"
                                checked={outsideDoor}>
                                {t('obstructions.q_door.outside')}
                            </ToggleButton>
                        </ButtonGroup>
                    </div>
                </Form.Group>
                <Form.Group hidden={hideWindow}>
                    <Form.Label>{t('obstructions.q_window.opening_window')}</Form.Label>
                    <div>
                        <ButtonGroup>
                            <ToggleButton
                                className="mb-4"
                                type="radio"
                                variant="danger"
                                name={"yes" + obstId}
                                controlId={"yes" + obstId}
                                checked={insideWindow}
                                onClick={(event) => {
                                    setinsideWindow(!insideWindow)
                                    changeWindow(event, !insideWindow)
                                }}
                            >{t('obstructions.q_window.yes')} </ToggleButton>
                            <ToggleButton
                                className="mb-4"
                                type="radio"
                                variant="danger"
                                name={"no" + obstId}
                                controlId={"yes" + obstId}
                                checked={!insideWindow}
                                onClick={(event) => {
                                    setinsideWindow(!insideWindow)
                                    changeWindow(event, !insideWindow)
                                }}
                            >{t('obstructions.q_window.no')}</ToggleButton>
                        </ButtonGroup>
                    </div>
                </Form.Group>

            </div>
        </div>
    )
}

export default Obstruction;
