import "../../App.css"
import "./Questionnaire.css"
import { useContactContext } from "../../contexts/ContactContext.jsx";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/high-res.css'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { FloatingLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function Contact() {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])

    const { contact, setContact } = useContactContext();
    //saving changes
    const changeContact = (event) => {
        setContact({ ...contact, [event.target.name]: event.target.value });
    }

    const changePhoneNumber = (num, country) => {
        setContact({ ...contact, phone_number: { number: num, country: country } });
    }

    return (

        <div className={"m-2"}>
            <div className={"mb-3"}>
                {/**/}
                <h5 data-testid={"question-contact"}>
                    {t('contact.q_contact')}
                </h5>
            </div>
            <Form>
                {Object.entries(contact).map(([key, value]) => (
                    key !== 'phone_number' ? (<FloatingLabel key={key}
                        data-testid={"label-contact-" + key}
                        className={"mb-2"}
                        controlid="floatingInput"
                        label={t("contact." + key)}>
                        <Form.Control name={key} type="text" placeholder={key} defaultValue={value}
                            data-testid={"input-contact-" + key}
                            onChange={changeContact} />
                    </FloatingLabel>) : (
                        //onlyCountries sets all countries that can be chose to show
                        <PhoneInput key={key} className={"mb-2"} country={contact.phone_number.country} onlyCountries={["be", "nl"]}
                            enableSearch={true}
                            searchPlaceholder={""}
                            disableSearchIcon={true} id="phone_number" name="phone_number" type="tel"
                            data-testid={"input-contact-phone"}
                            value={contact.phone_number.number} onChange={(value, country) => changePhoneNumber(value, country.countryCode)} />
                    )))
                }
            </Form>
            <Button variant={"danger"} type={"submit"}>{t('contact.submit')}</Button>
        </div>
    )
}

export default Contact;
