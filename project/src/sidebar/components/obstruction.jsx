import {useState} from "react";
import "../../App.css"
import Form from "react-bootstrap/Form";
import {Col, FloatingLabel, Row} from "react-bootstrap";

// eslint-disable-next-line react/prop-types
function Obstruction({changeLength, changeHeight, changeWidth, changeType, type, obstId, length, width, height}) {
    const [showButton1, setShow1] = useState(false);
    const [showButton2, setShow2] = useState(true);
    const showButton = () => {
        setShow2(!showButton2)
        setShow1(!showButton1)
    };

    console.log(obstId);
    return (
        <div>
            <input type="button" id={"button"+obstId} value={type ?? "Aspect"} onClick={showButton}  ></input>
            <div hidden={showButton2}>
                <Form.Group className="mb-3">
                    <Form.Select name={type} id={"type" + obstId} onChange={(e)=>{changeType(e)}} defaultValue={type?type:"type"}>
                        <option value="type">type</option>
                        <option value="raam">raam</option>
                        <option value="deur">deur</option>
                        <option value="radiator">radiator</option>
                        <option value="stopcontact">stopcontact</option>
                        <option value="schakelaar">schakelaar</option>
                        <option value="schuine wand">schuine wand</option>
                        <option value="anders">anders</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <div>
                        <Row className="g-2">
                            <Col md>
                                <FloatingLabel
                                    label="Lengte(cm)"
                                    className="mb-4"
                                >
                                    <Form.Control type="number" name={"length"+obstId} min={0} step={0.1} defaultValue={length} onChange={(e)=>changeLength(e)}/>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel
                                    label="Breedte(cm)"
                                    className="mb-4"
                                >
                                    <Form.Control type="number" name={"width"+obstId} min={0} step={0.1} defaultValue={width} onChange={(e)=>changeWidth(e)}/>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel
                                    label="Hoogte(cm)"
                                    className="mb-4"
                                >
                                    <Form.Control type="number" name={"height"+obstId} min={0} step={0.1} defaultValue={height} onChange={(e)=>changeHeight(e)}/>
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
