import "../../App.css"
import "./questionnaire.css"
import {useContactContext} from "../../contexts/ContactContext.jsx";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/high-res.css'
import {useTranslation} from 'react-i18next'
import {useEffect} from 'react'
import {FloatingLabel} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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

        <div className={"m-2"}>
            <div className={"mb-3"}>
                <h5>
                    {t('contact.q_contact')}
                </h5>
            </div>
            <div className={"mb-3"}>
                {Object.entries(contact).map(([key, value]) => (
                    key !== 'phone_number' ? (<FloatingLabel key={key}
                                                             className={"mb-2"}
                                                             controlId="floatingInput"
                                                             label={t("contact." + key)}>
                        <Form.Control name={key} placeholder={key} defaultValue={value}
                                      onChange={changeContact} required/>
                    </FloatingLabel>) : (

                        <PhoneInput key={key} className={"mb-2"} country={'be'} onlyCountries={["be", "nl"]}
                                    enableSearch={true}
                                    searchPlaceholder={""}
                                    disableSearchIcon={true} id="phoneNumber" name="phone_number" type="tel"
                                    value={contact.phoneNumber} onChange={changePhoneNumber} required/>
                    )))
                }
            </div>

            <Button variant={"danger"} type={"submit"}>submit</Button>
        </div>
    )
}

export default Contact;