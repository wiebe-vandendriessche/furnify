import "../../App.css"
import {useContactContext} from "../../contexts/MyContext.jsx";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/high-res.css'

function Contact() {
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

        <>
            <div>
                <h2>
                    Laat uw contactgegevens achter zodat we u kunnen bereiken
                </h2>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label htmlFor="firstName">Voornaam:</label>
                            </td>
                            <td>
                                <input id="firstName" name="firstName" type="text" defaultValue={firstName} onChange={changeFirstName}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="lastName">Achternaam:</label>
                            </td>
                            <td>
                                <input id="lastName" name="lastName" type="text" defaultValue={lastName} onChange={changeLastName}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="phoneNumber">
                                    Telefoonnummer:
                                </label>
                            </td>
                            <td>
                                <PhoneInput country={'be'} onlyCountries={["be", "nl"]} enableSearch={true} searchPlaceholder={""} disableSearchIcon={true} id="phoneNumber" name="phoneNumber" type="tel" value={phoneNumber} onChange={changePhoneNumber}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="mail">
                                    E-mail:
                                </label>
                            </td>
                            <td>
                                <input id="mail" name="mail" type="email" defaultValue={mail} onChange={changeMail}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="address">
                                    Adres:
                                </label>
                            </td>
                            <td>
                                <input id="address" name="address" type="text" defaultValue={address} onChange={changeAddress}/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>)
}

export default Contact;