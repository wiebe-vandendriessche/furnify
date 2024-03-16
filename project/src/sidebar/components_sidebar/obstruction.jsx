import { useState, useEffect } from "react";
import "./questionnaire.css"
import Form from "react-bootstrap/Form";
import { Col, FloatingLabel, Row, ButtonGroup, ToggleButton } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types
function Obstruction({ deleteObst, changeLength, changeHeight, changeWidth, changeType, type, obstId, length, width, height }) {
    //i18n
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    const lng = navigator.language;

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
        }
        else if(value == t('obstructions.window')){
            setHideWindow(false)
        }
    }

    const [insideWindow, setinsideWindow] = useState(true);

   


    return (
        <div className="obstruction-bg m5">
            <input type="button" id={"button" + obstId} value={type ?? t('obstructions.other')} onClick={(e) => {
                showButton()
                showExtraQuestion(e)
            }} />
            <Button className={"fa-rectangle-xmark"} variant={"danger"} id={"delete" + obstId} onClick={(e) => deleteObst(e)}>
                x
            </Button>
            <div className="m5" hidden={showButton2}>
                <Form.Group className="mb-3">
                    <Form.Select name="type" id={"type" + obstId} onChange={(e) => {
                        changeType(e)
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
                    <div className="m5">
                        <Row>
                            <Col>
                                <FloatingLabel
                                    controlId={"length" + obstId}
                                    label={t('questionnaire_space.length')}
                                    className="mb-4"
                                >
                                    <Form.Control type="number" name={"length" + obstId} min={0} step={0.1} defaultValue={length} onChange={(e) => changeLength(e)} />
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    controlId={"width" + obstId}
                                    label={t('questionnaire_space.width')}
                                    className="mb-4"
                                >
                                    <Form.Control type="number" name={"width" + obstId} min={0} step={0.1} defaultValue={width} onChange={(e) => changeWidth(e)} />

                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    controlId={"height" + obstId}
                                    label={t('questionnaire_space.height')}
                                    className="mb-4"
                                >
                                    <Form.Control type="number" name={"height" + obstId} min={0} step={0.1} defaultValue={height} onChange={(e) => changeHeight(e)} />
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
                                onClick={changeInsideLeftDoor}
                                type="radio"
                                value="Rectangular"
                                variant="danger"
                                checked={insideLeftDoor}
                            >
                                {t('obstructions.q_door.inside_left')}
                            </ToggleButton>
                            <ToggleButton
                                onClick={changeInsideRightDoor}
                                type="radio"
                                value="Rectangular"
                                variant="danger"
                                checked={insideRightDoor}
                            >
                                {t('obstructions.q_door.inside_right')}
                            </ToggleButton>
                            <ToggleButton
                                onClick={changeOutsideDoor}
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
                            <ToggleButton className={"wo"} type="radio" variant="danger" checked={insideWindow} onClick={() => setinsideWindow(!insideWindow)}
                            >{t('obstructions.q_window.yes')} </ToggleButton>
                            <ToggleButton className={"wo"} type="radio" variant="danger"checked={!insideWindow} onClick={() => setinsideWindow(!insideWindow)}
                            >{t('obstructions.q_window.no')}</ToggleButton>
                            
                        </ButtonGroup>
                    </div>
                </Form.Group>

            </div>
        </div>
    )
}

export default Obstruction;
