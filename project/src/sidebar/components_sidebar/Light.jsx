import { useState, useEffect } from "react";
import "./Questionnaire.css"
import Form from "react-bootstrap/Form";
import { Col, FloatingLabel, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types
function Light({ deleteObst, changeLight, type, obstId, width, height, obstLength, maxHeight}) {
    //i18n
    const { t, i18n } = useTranslation();
    console.log(obstId)
    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    const [showButton2, setShow2] = useState(true);
    const showButton = () => {
        setShow2(!showButton2)
    };

    function handleInput(event) {
        //Only check on height
        if(!Number.isNaN(event.nativeEvent.data) && event.target.name=="height"){
            if(event.target.value>maxHeight*100.0){
                alert("prevented")
                event.preventDefault();
                return;
            }
        }
        changeLight(event);
    }

    function negativeValues(event){
        //prevent use of negative values
        if (event.key=="-") {
            event.preventDefault();
        }
    }

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
                <Form.Group>
                    <div className="m-1">
                        <Row>
                            <Col>
                                <FloatingLabel
                                    controlid={"obstLength" + obstId}
                                    label={t('questionnaire_space.length') + '(cm)'}
                                >
                                    <Form.Control type="number" name={"obstLength"} min={0} step={1}
                                                  data-testid={"input-obst-"+type+"-length"}
                                                  value={obstLength}
                                                  onChange={(e) => {
                                                      handleInput(e)
                                                  }}
                                                  onKeyPress={negativeValues}
                                                  id={"length"+obstId}
                                    />
                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    controlid={"width" + obstId}
                                    label={t('questionnaire_space.width') + '(cm)'}
                                >
                                    <Form.Control type="number" name={"width"} min={0} step={1} value={width}
                                                  data-testid={"input-obst-"+type+"-width"}
                                                  onChange={(e) => {
                                                      handleInput(e)
                                                  }}
                                                  onKeyPress={negativeValues}
                                                  id={"width"+obstId}
                                    />


                                </FloatingLabel>
                            </Col>
                            <Col>
                                <FloatingLabel
                                    controlid={"height" + obstId}
                                    label={t('questionnaire_space.height') + '(cm)'}
                                >
                                    <Form.Control type="number" name={"height"} min={0} step={1} value={height}
                                                  data-testid={"input-obst-"+type+"-height"}
                                                  onChange={(e) => {
                                                      handleInput(e)
                                                  }}
                                                  onKeyPress={negativeValues}
                                                  id={"height"+obstId}
                                    />
                                </FloatingLabel>
                            </Col>
                        </Row>

                    </div>
                </Form.Group>


            </div>
        </div>
    )
}

export default Light;