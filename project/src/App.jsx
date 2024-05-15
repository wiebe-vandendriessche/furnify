import './App.css'
import Sidebar from './sidebar/Sidebar'
import Scene from './3D/Scene'
import {useConfiguratorContext} from './contexts/ConfiguratorContext'
import {FloorplanScene} from './2D/FloorplanScene'
import Modal from 'react-bootstrap/Modal';
import React, {useEffect, useState} from "react";
import Button from "react-bootstrap/Button";
import { get_modules } from './algorithm/module_choice'
import { useTranslation } from 'react-i18next'



function PrivacyPolicy(props) {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [])
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
                    {t('privacy.intro')}
                    </p>
                </div>
                <h4>Furnify</h4>
                <div><p>{t('privacy.pol')}
                    <a href={"https://www.furnifyhome.eu/pages/privacy"}>
                    {t('privacy.here')}</a></p>
                </div>
                <h4>Mailchimp</h4>
                <div><p>{t('privacy.mailchimp')}</p></div>
                <div className="content__gdprLegal"><p>{t('privacy.disclaimer1')}<a
                        href="https://mailchimp.com/legal/terms">{t('privacy.learn')}</a> {t('privacy.disclaimer2')}</p>
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
