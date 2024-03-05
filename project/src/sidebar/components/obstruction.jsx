import {useState} from "react";
import "../../App.css"
import Form from "react-bootstrap/Form";
import {Col, FloatingLabel, Row} from "react-bootstrap";

function Obstruction({id}) {
    const type = "type" + id;
    const typeopen = "typeopen" + id;
    const [showButton1, setShow1] = useState(false);
    const [showButton2, setShow2] = useState(true);
    const [typeObstr, setObstr] = useState("Aspect")
    const showButton = () => {
        setShow2(!showButton2) + setShow1(!showButton1)
    };
    const saveName = (event) => {
        setObstr(event.target.value)
       
    }

    return (
        <div>
            <input type="button" id={typeopen} value={typeObstr ?? "Aspect"} onClick={showButton}  ></input>
            <div hidden={showButton2}>
                <Form.Group className="mb-3">
                    <Form.Select name={type} id={"type" + id} onChange={saveName}>
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
                                    <Form.Control type="number" min={0} step={0.1}/>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel
                                    label="Breedte(cm)"
                                    className="mb-4"
                                >
                                    <Form.Control type="number" min={0} step={0.1}/>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel
                                    label="Hoogte(cm)"
                                    className="mb-4"
                                >
                                    <Form.Control type="number" min={0} step={0.1}/>
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
