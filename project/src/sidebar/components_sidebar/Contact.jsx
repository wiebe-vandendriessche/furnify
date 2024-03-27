import "../../App.css"
import "./Questionnaire.css"
import {useContactContext} from "../../contexts/ContactContext.jsx";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/high-res.css'
import {useTranslation} from 'react-i18next'
import {useEffect} from 'react'
import {FloatingLabel} from "react-bootstrap";
import Form from "react-bootstrap/Form";

function Contact() {
    const {t, i18n} = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    const {contact, setContact} = useContactContext();
    const changeContact = (event) => {
        setContact({...contact, [event.target.name]: event.target.value})
    }

    const changePhoneNumber = (event) => {
        setContact({...contact, phone_number: event})
    }

    return (

        <div className={"m-2"}>
            <div className={"mb-3"}>
                <h5 datatest-id={"question-contact"}>
                    {t('contact.q_contact')}
                </h5>
            </div>
            <Form>
                {Object.entries(contact).map(([key, value]) => (
                    key !== 'phone_number' ? (<FloatingLabel key={key}
                                                            datatest-id={"label-contact-"+key}
                                                            className={"mb-2"}
                                                            controlId="floatingInput"
                                                            label={t("contact."+key)}>
                        <Form.Control name={key} type="text" placeholder={key} defaultValue={value}
                                      onChange={changeContact}/>
                    </FloatingLabel>) : (

                        <PhoneInput key={key} className={"mb-2"} country={'be'} onlyCountries={["be", "nl"]}
                                    id="phoneNumber" name="phoneNumber" type="tel"
                                    value={contact.phone_number} onChange={changePhoneNumber}/>
                    )))
                }
            </Form>
        </div>
    )
}

export default Contact;
