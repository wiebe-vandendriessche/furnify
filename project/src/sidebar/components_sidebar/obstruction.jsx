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

    const [insideLeft, setInsideLeft] = useState(false);
    const [insideRight, setInsideRight] = useState(false);
    const [outside, setOutside] = useState(false);

    const changeInsideLeft = () => {
        setInsideLeft(true)
        setInsideRight(false)
        setOutside(false)
    }
    const changeInsideRight = () => {
        setInsideLeft(false)
        setInsideRight(true)
        setOutside(false)
    }
    const changeOutside = () => {
        setInsideLeft(false)
        setInsideRight(false)
        setOutside(true)
    }
    const [hideDoor, setHideDoor] = useState(true);
    const showExtraQuestion = (event) => {
        showWichQuestion(event.target.value)
    }
    const showWichQuestion = (value) => {
        setHideDoor(true)
        if (value == t('obstructions.door')) {
            setHideDoor(false)
            console.log("in if")
        }
    }
    


    return (
        <div className="obstruction-bg m5">
            <input type="button" id={"button" + obstId} value={type ?? t('obstructions.type')} onClick={ (e) =>{
                showButton()
                showExtraQuestion(e)}} />
            <Button className={"fa-rectangle-xmark"} variant={"danger"} id={"delete" + obstId} onClick={(e) => deleteObst(e)}>
                x
            </Button>
            <div className="m5" hidden={showButton2}>
                <Form.Group className="mb-3">
                    <Form.Select name="type" id={"type" + obstId} onChange={(e) => {
                        changeType(e)
                        showExtraQuestion(e)
                    }}>
                        <option value={t('obstructions.window')}>{t('obstructions.window')}</option>
                        <option value={t('obstructions.door')}>{t('obstructions.door')}</option>
                        <option value={t('obstructions.radiator')}>{t('obstructions.radiator')}</option>
                        <option value={t('obstructions.walloutlet')}>{t('obstructions.walloutlet')}</option>
                        <option value={t('obstructions.switch')}>{t('obstructions.switch')}</option>
                        <option value={t('obstructions.sloping_Wall')}>{t('obstructions.sloping_Wall')}</option>
                        <option value={t('obstructions.other')}>{t('obstructions.other')}</option>
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
                    <Form.Label>Hoe opent de deur?</Form.Label>
                    <div>
                        <ButtonGroup>
                            <ToggleButton
                                onClick={changeInsideLeft}
                                type="radio"
                                value="Rectangular"
                                variant="danger"
                                checked={insideLeft}
                            >
                                Naar binnen, links in de ruimte
                            </ToggleButton>
                            <ToggleButton
                                onClick={changeInsideRight}
                                type="radio"
                                value="Rectangular"
                                variant="danger"
                                checked={insideRight}
                            >
                                Naar binnen, rechts in de ruimte
                            </ToggleButton>
                            <ToggleButton
                                onClick={changeOutside}
                                type="radio"
                                value="Other"
                                variant="danger"
                                checked={outside}>
                                Naar buiten
                            </ToggleButton>
                        </ButtonGroup>
                    </div>
                </Form.Group>
            </div>
        </div>
    )
}

export default Obstruction;
