import "../../App.css"
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
        setContact({...contact, phoneNumber: event})
    }

    return (

        <div className="m5">
            <h2>
                {t('contact.q_contact')}
            </h2>
            <Form>
                {Object.entries(contact).map(([key, value]) => (
                    key !== 'phoneNumber' ? (<FloatingLabel key={key}
                                                           controlId="floatingInput"
                                                           label={t(key)}>
                        <Form.Control name={key} type="text" placeholder={key} defaultValue={value}
                                      onChange={changeContact}/>
                    </FloatingLabel>) : (
                        <FloatingLabel key={key}
                            controlId="floatingInput"
                            label="">
                            <PhoneInput country={'be'} onlyCountries={["be", "nl"]} enableSearch={true}
                                        searchPlaceholder={""}
                                        disableSearchIcon={true} id="phoneNumber" name="phoneNumber" type="tel"
                                        value={contact.phoneNumber} onChange={changePhoneNumber}/>
                        </FloatingLabel>
                    )))
                }
            </Form>
        </div>
    )
}

export default Contact;