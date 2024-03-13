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

    const {firstName, setFirstName, lastName, setLastName, mail, setMail, phoneNumber, setPhoneNumber, address, setAddress}=useContactContext();
    const changeFirstName = (event) => {
        setFirstName(event.target.value);
    }
    const changeLastName = (event) => {
        setLastName(event.target.value);
    }
    const changePhoneNumber = (event) => {
        setPhoneNumber(event);
    }
    const changeMail = (event) => {
        setMail(event.target.value);
    }
    const changeAddress = (event) => {
        setAddress(event.target.value);
    }


    return (
            /*<div>
                <h2>
                {t('contact.q_contact')}
                </h2>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="firstName">{t('contact.firstname')}:</label>
                            </td>
                            <td>
                                <input id="firstName" name="firstName" type="text" defaultValue={firstName} onChange={changeFirstName}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="lastName">{t('contact.lastname')}:</label>
                            </td>
                            <td>
                                <input id="lastName" name="lastName" type="text" defaultValue={lastName} onChange={changeLastName}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="phoneNumber">
                                {t('contact.phone_number')}:
                                </label>
                            </td>
                            <td>
                                <PhoneInput country={'be'} onlyCountries={["be", "nl"]} enableSearch={true} searchPlaceholder={""} disableSearchIcon={true} id="phoneNumber" name="phoneNumber" type="tel" value={phoneNumber} onChange={changePhoneNumber}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="mail">
                                {t('contact.email')}:
                                </label>
                            </td>
                            <td>
                                <input id="mail" name="mail" type="email" defaultValue={mail} onChange={changeMail}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="address">
                                {t('contact.address')}:
                                </label>
                            </td>
                            <td>
                                <input id="address" name="address" type="text" defaultValue={address} onChange={changeAddress}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>*/

        <div className="m5">
            <h2>
                {t('contact.q_contact')}
            </h2>
            <Form>
                <FloatingLabel
                    controlId="floatingInput"
                    label={t('contact.firstname')}>
                    <Form.Control type="text" placeholder={"firstName"} defaultValue={firstName}
                                  onChange={changeFirstName}/>
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label={t('contact.lastname')}>
                    <Form.Control type="text" placeholder={"name"} defaultValue={lastName} onChange={changeLastName}/>
                </FloatingLabel>
                <FloatingLabel
                    controlId="floatingInput"
                    label="">
                    <PhoneInput country={'be'} onlyCountries={["be", "nl"]} enableSearch={true} searchPlaceholder={""}
                                disableSearchIcon={true} id="phoneNumber" name="phoneNumber" type="tel"
                                value={phoneNumber} onChange={changePhoneNumber}/>
                </FloatingLabel>

                <FloatingLabel
                    controlId="floatingInput"
                    label={t('contact.email')}>
                    <Form.Control type="email" placeholder={"email"} defaultValue={mail} onChange={changeMail}/>
                    <FloatingLabel
                        controlId="floatingInput"
                        label={t('contact.address')}>
                        <Form.Control type="text" placeholder={"address"} defaultValue={address}
                                      onChange={changeAddress}/>
                    </FloatingLabel>
                </FloatingLabel>
            </Form>
        </div>
    )
}

export default Contact;
