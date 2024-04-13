import { useState, useEffect } from "react";
import "./Questionnaire.css"
import Form from "react-bootstrap/Form";
import { Col, FloatingLabel, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types
function Obstruction({ deleteObst, changeObst, type, obstId, width, height, obstLength}) {
    //i18n
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    const [showButton2, setShow2] = useState(true);
    const showButton = () => {
        setShow2(!showButton2)
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

    console.log(type)

    return (
        <div className="obstruction-bg mb-2 flex">
            <Button id={"button" + obstId}
                data-testid={"btn-obstacle-expand-" + type}
                variant={"danger"} value={type ?? t("obstructions." + type)}
                onClick={showButton
                }>{t("obstructions." + type)}</Button>
            <Button className={"fa-rectangle-xmark"} data-testid={"btn-obstacle-delete-" + type}
                variant={"danger"} id={"delete" + obstId}
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
                        <option value={"other"}>{t('obstructions.other')}</option>
                        <option value={"window"}>{t('obstructions.window')}</option>
                        <option value={"door"}>{t('obstructions.door')}</option>
                        <option value={"radiator"}>{t('obstructions.radiator')}</option>
                        <option value={"walloutlet"}>{t('obstructions.walloutlet')}</option>
                        <option value={"switch"}>{t('obstructions.switch')}</option>
                        <option value={"sloping_Wall"}>{t('obstructions.sloping_Wall')}</option>

                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <div className="m-1">
                        <Row>
                            <Col>
                                <FloatingLabel
                                    controlid={"obstLength" + obstId}
                                    label={t('questionnaire_space.length') + '(cm)'}
                                >
                                    <Form.Control type="number" name={"obstLength"} min={0} step={0.1}
                                                  data-testid={"input-obst-"+type+"-length"}
                                                  defaultValue={length} onChange={(e) => changeObst(e)}
                                                  onKeyPress={handleKeyPress}/>
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    controlid={"width" + obstId}
                                    label={t('questionnaire_space.width') + '(cm)'}
                                >
                                    <Form.Control type="number" name={"width"} min={0} step={0.1} defaultValue={width}
                                                  data-testid={"input-obst-"+type+"-width"}
                                                  onChange={(e) => changeObst(e)}
                                                  onKeyPress={handleKeyPress}/>


                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    controlid={"height" + obstId}
                                    label={t('questionnaire_space.height') + '(cm)'}
                                >
                                    <Form.Control type="number" name={"height"} min={0} step={0.1} defaultValue={height}
                                                  data-testid={"input-obst-"+type+"-height"}
                                                  onChange={(e) => changeObst(e)}
                                                  onKeyPress={handleKeyPress}/>
                                </FloatingLabel>
                            </Col>
                        </Row>

                    </div>
                </Form.Group>

                <Form.Group hidden={hideDoor}>
                    <Form.Label data-testid={"question-obstacle-door-opening"}> {t('obstructions.q_door.opening_door')}</Form.Label>
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
                                data-testid={"btn-obstacle-door-inside-l"}
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
                                data-testid={"btn-obstacle-door-inside-r"}
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
                                data-testid={"btn-obstacle-door-outside"}
                                value="Other"
                                variant="danger"
                                checked={outsideDoor}>
                                {t('obstructions.q_door.outside')}
                            </ToggleButton>
                        </ButtonGroup>
                    </div>
                </Form.Group>
                <Form.Group hidden={hideWindow}>
                    <Form.Label data-testid={"question-obstacle-window-opening"}>{t('obstructions.q_window.opening_window')}</Form.Label>
                    <div>
                        <ButtonGroup>
                            <ToggleButton
                                className="mb-4"
                                type="radio"
                                variant="danger"
                                name={"yes" + obstId}
                                controlId={"yes" + obstId}
                                data-testid={"btn-obstacle-window-inside"}
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
                                data-testid={"btn-obstacle-window-outside"}
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
