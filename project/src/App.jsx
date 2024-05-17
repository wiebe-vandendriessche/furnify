import './App.css'
import Sidebar from './sidebar/Sidebar'
import Scene from './3D/Scene'
import {useConfiguratorContext} from './contexts/ConfiguratorContext'
import {FloorplanScene} from './2D/FloorplanScene'
import Modal from 'react-bootstrap/Modal';
import React from "react";
import Button from "react-bootstrap/Button";
import { get_modules } from './algorithm/module_choice'

function PrivacyPolicy(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    privacy policy
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Furnify</h4>
                <div><a href={"https://www.furnifyhome.eu/pages/privacy"}>
                    learn more
                </a></div>
                <h4>Mailchimp</h4>
                <div><p>You can unsubscribe at any time by clicking the link in the footer of our emails. For
                    information
                    about our privacy practices, please visit our website.</p></div>
                <div ><p>We use Mailchimp as our marketing platform. By clicking below to
                    subscribe, you acknowledge that your information will be transferred to Mailchimp for processing. <a
                        href="https://mailchimp.com/legal/terms">Learn more</a> about Mailchimp's privacy practices.</p>
                </div>
            </Modal.Body>
        </Modal>
    );
}


function App() {
    const [modalShow, setModalShow] = React.useState(false);
    const {rectangular} = useConfiguratorContext();
    get_modules();

    return (

        <div className="App">
            <Sidebar/>
            <main>
                <div className="container">
                    {rectangular && <Scene/>}
                    {!rectangular && <FloorplanScene/>}
                </div>

                <Button className={"privacy"} variant="danger" onClick={() => setModalShow(true)}>
                    privacy
                </Button>

                <PrivacyPolicy
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
            </main>
        </div>
    );
}

export default App;
