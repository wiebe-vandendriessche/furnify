import "../../App.css"
import {useState} from "react";
import "./questionnaire.css"
import {useConfiguratorContext} from "../../contexts/MyContext.jsx";
import Obstruction from "./obstruction";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {Col, FloatingLabel, Row, ToggleButton} from "react-bootstrap";

function Questionnaire_space() {
    //Uses reactcontext
    const { dimensions, setDimensions, obstacles, setObstacles} = useConfiguratorContext();
    //Changes value of context
    const changeWidth = (event) => {
        setDimensions({...dimensions, width: event.target.value});
    }
    const changeLength = (event) => {
        setDimensions({...dimensions, length: event.target.value})
    }

    const changeHeight = (event) => {
        setDimensions({...dimensions, height: event.target.value})
    }
    const changeObstacleType=(event)=>{
        setObstacles((prevObstacles)=>prevObstacles.map((obstacle, index)=> index==event.target.id.split("obst")[1]?{...obstacle, type: event.target.value}:obstacle))
    }
    const changeObstacleLength=(event)=>{
        setObstacles((prevObstacles)=>prevObstacles.map((obstacle, index)=>index==event.target.name.split("obst")[1]?{...obstacle, length:event.target.value}:obstacle))
    }
    const changeObstacleWidth=(event)=>{
        setObstacles((prevObstacles)=>prevObstacles.map((obstacle, index)=>index==event.target.name.split("obst")[1]?{...obstacle, width: event.target.value}:obstacle))
    }
    const changeObstacleHeight=(event)=>{
        setObstacles((prevObstacles)=>prevObstacles.map((obstacle, index)=>index==event.target.name.split("obst")[1]?{...obstacle, height:event.target.value}:obstacle))
    }
    const [open, setOpen] = useState(false);
    const addObstacles = () => {
        if (obstacles.length > 0) {
            setObstacles([...obstacles, (obstacles[obstacles.length - 1] + 1)]);
        } else {
            setObstacles([{type: "Type", width: 0, height: 0, length:0}]);
        }
    }


    return (
        <Form className="overflow-auto">
            <Form.Group>
                <Form.Label>Wat zijn de afmetingen van de woonruimte?</Form.Label>
                <div className="mb-3">
                    <ButtonGroup>
                        <ToggleButton
                            onClick={() => setOpen(!open)}
                            type="radio"
                            value="Rectangular"
                            variant="danger"
                            checked={open}
                        >
                            Rechthoekig
                        </ToggleButton>
                        <ToggleButton
                            type="radio"
                            value="Other"
                            variant="danger"
                            checked={!open}
                            onClick={() => setOpen(false)}>
                            anders
                        </ToggleButton>
                    </ButtonGroup>
                </div>
                <Collapse in={open}>
                    <div>
                        <Row className="g-2">
                            <Col md>
                                <FloatingLabel
                                    label="Lengte(cm)"
                                >
                                    <Form.Control type="number" min={0} step={0.1} value={dimensions.length} size="sm"
                                                  onChange={changeLength}/>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel
                                    label="Breedte(cm)"
                                >
                                    <Form.Control type="number" min={0} step={0.1} value={dimensions.width} size="sm"
                                                  onChange={changeWidth}/>
                                </FloatingLabel>
                            </Col>
                            <Col md>
                                <FloatingLabel
                                    label="Hoogte(cm)"
                                >
                                    <Form.Control type="number" min={0} step={0.1} value={dimensions.height} size="sm"
                                                  onChange={changeHeight}/>
                                </FloatingLabel>
                            </Col>
                        </Row>


                    </div>
                </Collapse>
            </Form.Group>
            <Form.Group>
                <Form.Label>Voeg toe met welke aspecten we in uw woonruimte rekening moeten houden.</Form.Label>
                <Button onClick={addObstacles} variant="danger">Voeg aspect toe</Button>
                <div>
                    {obstacles.map((item, index) => (<Obstruction obstId={"obst" + JSON.stringify(index)} type={item.type}
                                                                  length={item.length} width={item.width} height={item.height}
                                                                  changeLength={changeObstacleLength} changeHeight={changeObstacleHeight} changeWidth={changeObstacleWidth} key={item} changeType={changeObstacleType}/>))}
                </div>
            </Form.Group>

        </Form>


    )
}

export default Questionnaire_space;