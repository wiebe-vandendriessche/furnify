import {useState, useEffect} from "react";
import "./questionnaire.css"
import Form from "react-bootstrap/Form";
import {Col, FloatingLabel, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useTranslation} from "react-i18next";

// eslint-disable-next-line react/prop-types
function Obstruction({deleteObst, changeObst, type, obstId, length, width, height}) {
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

    console.log(obstId);
    console.log(type)
    return (
        <div className="obstruction-bg m5">
            <input type="button" id={"button"+obstId} value={type ?? t('obstructions.type')} onClick={showButton}  />
            <Button className={"fa-rectangle-xmark"} variant={"danger"} id={"delete"+obstId} onClick={(e)=>deleteObst(e)}>
                x
            </Button>
            <div className="m5" hidden={showButton2}>
                <Form.Group className="mb-3">
                    <Form.Select name="type" id={"type"+obstId} value={ type ?? t('obstructions.type')} onChange={(e)=>{changeObst(e)}}>
                        <option value={t('obstructions.type')}>{t('obstructions.type')}</option>
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
                                    controlId={"length"+obstId}
                                    label={t('questionnaire_space.length')}
                                    className="mb-4"
                                >
                                    <Form.Control type="number" name={"length"} min={0} step={0.1} defaultValue={length} onChange={(e)=>changeObst(e)}/>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    controlId={"width"+obstId}
                                    label={t('questionnaire_space.width')}
                                    className="mb-4"
                                >
                                    <Form.Control type="number" name={"width"} min={0} step={0.1} defaultValue={width} onChange={(e)=>changeObst(e)}/>

                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    controlId={"height"+obstId}
                                    label={t('questionnaire_space.height')}
                                    className="mb-4"
                                >
                                    <Form.Control type="number" name={"height"} min={0} step={0.1} defaultValue={height} onChange={(e)=>changeObst(e)}/>
                                </FloatingLabel>
                            </Col>
                        </Row>

                    </div>
                </Form.Group>
            </div>
        </div>
    )
}

export default Obstruction;
