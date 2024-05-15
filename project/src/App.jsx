import './App.css'
import Sidebar from './sidebar/Sidebar'
import Scene from './3D/Scene'
import {useConfiguratorContext} from './contexts/ConfiguratorContext'
import {FloorplanScene} from './2D/FloorplanScene'
import Modal from 'react-bootstrap/Modal';
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import {get_modules} from './algorithm/module_choice'

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
                <div>
                    <p>
                        The information you fill in is collected and processed by us through various services.
                        See below for more information.
                    </p>
                </div>
                <h4>Furnify</h4>
                <div><p>
                    The information you fill in the form and the position of the module in the 3D space are stored in a
                    MongoDB database. The rest of Furnify's privacy policy can be found <a
                    href={"https://www.furnifyhome.eu/pages/privacy"}>
                    here.
                </a>
                </p></div>
                <h4>Mailchimp</h4>
                <div><p>You can unsubscribe from our mailchimp campaign at any time by sending a mail to info@furnifyhome.eu.</p></div>
                <div class="content__gdprLegal"><p>We use Mailchimp as our marketing platform. By clicking below to
                    subscribe, you acknowledge that your information will be transferred to Mailchimp for processing. <a
                        href="https://mailchimp.com/legal/terms">Learn more</a> about Mailchimp's privacy practices.</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant={"danger"} onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


function App() {
    const [modalShow, setModalShow] = React.useState(false);
    const {rectangular, setRectangular} = useConfiguratorContext();
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
