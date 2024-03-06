import React, {useState, useEffect} from "react";
import "./questionnaire.css"
import Form from "react-bootstrap/Form";
import {Button, FloatingLabel} from "react-bootstrap";
import { useTranslation } from 'react-i18next'
import {FaRectangleXmark} from "react-icons/fa6";
    

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
            <input type="button" id={"button"+obstId} value={type ?? t('obstructions.type')} onClick={showButton}  />
            <FaRectangleXmark id={"delete"+obstId} name={"delete"+obstId} onClick={(e)=> {
                deleteObst(e)
            }}/>

            <div hidden={showButton2}>
                <Form.Group className="mb-3">
                    <Form.Select name="type" id={"type"+obstId} onChange={(e)=>{changeType(e)}}>
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
                    <div>
                        <FloatingLabel
                            controlId={"length"+obstId}
                            label={t('questionnaire_space.length')}
                            className="mb-4"
                        >
                            <Form.Control type="number" name={"length"+obstId} min={0} step={0.1} defaultValue={length} onChange={(e)=>changeLength(e)}/>
                        </FloatingLabel>
                        <FloatingLabel
                            controlId={"width"+obstId}
                            label={t('questionnaire_space.width')}
                            className="mb-4"
                        >
                            <Form.Control type="number" name={"width"+obstId} min={0} step={0.1} defaultValue={width} onChange={(e)=>changeWidth(e)}/>

                        </FloatingLabel>
                        <FloatingLabel
                            controlId={"height"+obstId}
                            label={t('questionnaire_space.height')}
                            className="mb-4"
                        >
                            <Form.Control type="number" name={"height"+obstId} min={0} step={0.1} defaultValue={height} onChange={(e)=>changeHeight(e)}/>
                        </FloatingLabel>
                    </div>
                </Form.Group>
            </div>
        </div>
    )
}

export default Obstruction;
