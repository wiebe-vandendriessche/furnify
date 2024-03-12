import "../../App.css"
import {useContactContext} from "../../contexts/ContactContext.jsx";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/high-res.css'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import {FloatingLabel} from "react-bootstrap";
import Form from "react-bootstrap/Form";

function Contact() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    const {contact, setContact}=useContactContext();
    const changeContact = (event) => {
        setContact({...contact,[event.target.name]: event.target.value})
    }

    const changePhoneNumber=(event)=>{
        setContact({...contact, phoneNumber: event})
    }

    return (

        <div className="m5">
            <h2>
                {t('contact.q_contact')}
            </h2>
            <Form>
                <FloatingLabel
                    controlId="floatingInput"
                    label={t('contact.firstname')}>
                    <Form.Control name="firstName" type="text" placeholder={"firstName"} defaultValue={contact.firstName}
                                  onChange={changeContact}/>
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label={t('contact.lastname')}>
                    <Form.Control name="lastName" type="text" placeholder={"name"} defaultValue={contact.lastName} onChange={changeContact}/>
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="">
                    <PhoneInput country={'be'} onlyCountries={["be", "nl"]} enableSearch={true} searchPlaceholder={""}
                                disableSearchIcon={true} id="phoneNumber" name="phoneNumber" type="tel"
                                value={contact.phoneNumber} onChange={changePhoneNumber}/>
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInput"
                    label={t('contact.email')}>
                    <Form.Control type="email" name="mail" placeholder={"email"} defaultValue={contact.mail} onChange={changeContact}/>
                    <FloatingLabel
                        controlId="floatingInput"
                        label={t('contact.address')}>
                        <Form.Control name="address" type="text" placeholder={"address"} defaultValue={contact.address}
                                      onChange={changeContact}/>
                    </FloatingLabel>
                </FloatingLabel>
            </Form>
        </div>
    )
}

export default Contact;