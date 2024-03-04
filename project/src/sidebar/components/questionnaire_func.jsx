import "../../App.css"
import "./questionnaire.css"
import {useConfiguratorContext, useVariaContext} from "../../contexts/MyContext.jsx";

function Questionnaire_functional() {
    const {functionalities, setFunctionalities}=useConfiguratorContext();
    const {mattress, setMattress, room, setRoom}=useVariaContext();
    const changeBed = () => {
        setFunctionalities({...functionalities, bed: !functionalities.bed})
        if(!functionalities.bed){
            setMattress("");
        }
    }
    const changeDesk = () => {
        setFunctionalities(
            {...functionalities, desk: !functionalities.desk}
        );
    }
    const changeSofa = () => {
        setFunctionalities(
            {...functionalities, sofa: !functionalities.sofa}
        );
    }
    const changeStoragespace = () => {
        setFunctionalities(
            {...functionalities, storagespace: !functionalities.storagespace});
    }

    const changeMattresstype=(event)=>{
        setMattress(event.target.id);
    }
    const changeRoom=(event)=>{
        setRoom(event.target.id);
    }

    return (
        <>
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <fieldset>
                                    <legend> Welke woonruimte wenst u te optimaliseren?  </legend>
                                    <table>
                                        <tbody>
                                            <tr>
                                            
                                                <td>
                                                    <input type="radio" id="guestroom" name="room" onChange={changeRoom} checked={"guestroom"===room}/>
                                                    <label htmlFor="guestroom">logeerkamer</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="radio" id="livingroom" name="room" onChange={changeRoom} checked={"livingroom"===room}/>
                                                    <label htmlFor="livingroom">woonkamer</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="radio" id="bedroom" name="room" onChange={changeRoom} checked={"bedroom"===room}/>
                                                    <label htmlFor="bedroom">slaapkamer</label>
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
                                        Wat zijn de belangrijkste functies die u nodig heeft om uw woonruimte optimaal te benutten?
                                    </legend>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="bed" name="bed" onChange={changeBed} checked={functionalities.bed}/>
                                                    <label htmlFor="bed">Bed</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="desk" name="desk" onChange={changeDesk} checked={functionalities.desk}/>
                                                    <label htmlFor="desk">Bureauruimte</label>

                                                </td>

                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="sofa" name="sofa" onChange={changeSofa} checked={functionalities.sofa}/>
                                                    <label htmlFor="sofa">Sofa</label>

                                                </td>

                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="checkbox" id="storageSpace" name="storageSpace" onChange={changeStoragespace} checked={functionalities.storagespace}/>
                                                    <label htmlFor="storageSpace">Opbergruimte</label>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </fieldset>

                            </td>
                        </tr>
                        <tr>
                            <td>
                                <fieldset hidden = {!functionalities.bed}>
                                    <legend>
                                        Welke matras verkiest u?
                                    </legend>
                                    <table>
                                        <tbody>
                                            <tr>
                                            
                                                <td>
                                                    <input type="radio" id="soft" name="mattress" onChange={changeMattresstype} checked={"soft"===mattress}/>
                                                    <label htmlFor="soft">extra zacht</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="radio" id="medium" name="mattress" onChange={changeMattresstype} checked={"medium"===mattress}/>
                                                    <label htmlFor="medium">medium</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="radio" id="hard" name="mattress" onChange={changeMattresstype} checked={"hard"===mattress}/>
                                                    <label htmlFor="hard">extra stevig</label>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <input type="radio" id="non" name="mattress" />
                                                    <label htmlFor="non">niet van toepassing</label>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </fieldset>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>)
}

export default Questionnaire_functional;