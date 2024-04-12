import { useState, useEffect } from "react";
import "./Questionnaire.css"
import Form from "react-bootstrap/Form";
import { Col, FloatingLabel, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types
function Obstruction({ deleteObst, changeObst, type, obstId, width, height}) {
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
                        }}>
                        <option value={"other"}>{t('obstructions.other')}</option>
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
                                    <Form.Control type="number" name={"height"} min={0} step={0.1}
                                                  data-testid={"input-obst-" + type + "-height"}
                                                  defaultValue={height} onChange={(e) => changeObst(e)}
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
            </div>
        </div>
    )
}

export default Obstruction;
