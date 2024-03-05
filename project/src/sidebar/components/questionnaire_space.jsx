import "../../App.css"
import {useState} from "react";
import "./questionnaire.css"
import {useConfiguratorContext} from "../../contexts/MyContext.jsx";
import Obstruction from "./obstruction";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import {FloatingLabel, ToggleButton} from "react-bootstrap";

function Questionnaire_space() {
    //Uses reactcontext
    const { dimensions, setDimensions} = useConfiguratorContext();
    //Changes value of context
    const changeWidth = (event) => {
        setDimensions({ ...dimensions, width: event.target.value });
    }
    const changeLength = (event) => {
        setDimensions({ ...dimensions, length: event.target.value })
    }

    const changeHeight = (event) => {
        setDimensions({ ...dimensions, height: event.target.value })
    }


    /*const [showDims, setShow] = useState(true);
    const showDim = () => {
        setShow(false);
    }
    const showNoDim = () => {
        setShow(true)
    }*/
    const [open, setOpen] = useState(false);
    const [Obst, setObstr] = useState([])
    const addObstr = () => {
        if (Obst.length > 0) {
            setObstr([...Obst, (Obst[Obst.length - 1] + 1)]);
        } else {
            setObstr([1]);
        }
        console.log(Obst)
    }



    return (

        /*<div>
            <table>
                <tbody>
                <tr>
                    <td>
                        <fieldset>
                            <legend>
                                Wat zijn de afmetingen van de woonruimte?
                            </legend>
                            <table>
                                <tbody>
                                <tr>
                                    <td>
                                        Vorm:
                                    </td>
                                    <td>
                                        <input type="radio" id="colRectangular" name="space" value="Rectangular"
                                               onClick={showDim}/>
                                        <label htmlFor="colRectangular">Rechthoekig</label>
                                        <input type="radio" id="colOther" name="space" value="Other"
                                               onClick={showNoDim}/>
                                        <label htmlFor="colOther">Anders</label>
                                    </td>
                                </tr>
                                <tr hidden={showDims}>
                                    <td>
                                        <label htmlFor="length">Lengte:</label>
                                    </td>
                                    <td>
                                        <input id="length" type="number" min={0} step={0.1} value={dimensions.length}
                                               onChange={changeLength}/>
                                    </td>
                                    <td>
                                        <p>cm</p>
                                    </td>
                                </tr>
                                <tr hidden={showDims}>
                                    <td>
                                        <label htmlFor="width">Breedte:</label>
                                    </td>
                                    <td>
                                        <input id="width" type="number" min={0} step={0.1} value={dimensions.width}
                                               onChange={changeWidth}/>
                                    </td>
                                    <td>
                                        <p>cm</p>
                                    </td>
                                </tr>
                                <tr hidden={showDims}>
                                    <td>
                                        <label htmlFor="height">Hoogte:</label>
                                    </td>
                                    <td>
                                        <input id="height" type="number" min={0} step={0.1} value={dimensions.height}
                                               onChange={changeHeight}/>
                                    </td>
                                    <td>
                                        <p>cm</p>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </fieldset>
                    </td>
                </tr>
                <tr>
                    <td>
                        <fieldset>
                            <legend>
                                Voeg toe met welke aspecten we in uw woonruimte rekening moeten houden.
                            </legend>

                            <button onClick={addObstr}>Voeg aspect toe</button>
                            <div>
                                {Obst.map((item) => (<Obstruction key={item}/>))}
                            </div>

                        </fieldset>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>*/
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
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Lengte"
                                className="mb-4"
                            >
                                <Form.Control type="number" min={0} step={0.1} value={dimensions.length} size="sm"
                                              onChange={changeLength} />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Breedte"
                                className="mb-4"
                            >
                                <Form.Control type="number" min={0} step={0.1} value={dimensions.length} size="sm"
                                              onChange={changeWidth} />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Hoogte"
                                className="mb-4"
                            >
                                <Form.Control type="number" min={0} step={0.1} value={dimensions.length} size="sm"
                                              onChange={changeHeight} />
                            </FloatingLabel>
                        </div>
                    </Collapse>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Voeg toe met welke aspecten we in uw woonruimte rekening moeten houden.</Form.Label>
                    <Button onClick={addObstr} variant="danger">Voeg aspect toe</Button>
                    <div>
                        {Obst.map((item) => (<Obstruction key={item}/>))}
                    </div>
                </Form.Group>

            </Form>


)
}

export default Questionnaire_space;