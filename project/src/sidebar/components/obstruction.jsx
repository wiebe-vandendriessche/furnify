import React, {useState, useEffect} from "react";
import "./questionnaire.css"
import Form from "react-bootstrap/Form";
import {Button, FloatingLabel} from "react-bootstrap";
import { useTranslation } from 'react-i18next'
    

// eslint-disable-next-line react/prop-types
function Obstruction({deleteObst, changeLength, changeHeight, changeWidth, changeType, type, obstId, length, width, height}) {
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

    console.log(obstId);
    return (
        <div>
            <input type="button" id={"button"+obstId} value={type ?? "Aspect"} onClick={showButton}  />
            <FaRectangleXmark id={"delete"+obstId} onClick={(e)=>deleteObst(e)}/>
            <div hidden={showButton2}>
                <Form.Group className="mb-3">
                    <Form.Select name="type" id="type" onChange={saveName}>
                        <option value="Type">Type</option>
                        <option value="raam">{t('obstructions.window')}</option>
                        <option value="deur">{t('obstructions.door')}</option>
                        <option value="radiator">{t('obstructions.radiator')}</option>
                        <option value="stopcontact">{t('obstructions.walloutlet')}</option>
                        <option value="schakelaar">{t('obstructions.switch')}</option>
                        <option value="schuine wand">{t('obstructions.sloping_Wall')}</option>
                        <option value="anders">{t('obstructions.other')}</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <div>
                        <FloatingLabel
                            controlId="floatingInput"
                            label={t('questionnaire_space.length')}
                            className="mb-4"
                        >
                            <Form.Control type="number" min={0} step={0.1}/>
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label={t('questionnaire_space.width')}
                            className="mb-4"
                        >
                            <Form.Control type="number" min={0} step={0.1}/>
                        </FloatingLabel>
                        <FloatingLabel
                            controlId="floatingInput"
                            label={t('questionnaire_space.height')}
                            className="mb-4"
                        >
                            <Form.Control type="number" min={0} step={0.1}/>
                        </FloatingLabel>
                    </div>
                </Form.Group>
            </div>
        </div>
    )
}

export default Obstruction;
