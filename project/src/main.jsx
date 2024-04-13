import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { VariaProvider } from "./contexts/VariaContext.jsx";
import { ConfiguratorProvider } from "./contexts/ConfiguratorContext.jsx";
import { ContactProvider } from "./contexts/ContactContext.jsx";
import './i18n.ts'
import { RoomWallLightupProvider } from './contexts/RoomWallLightupContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <VariaProvider>
            <ContactProvider>
                <ConfiguratorProvider>
                    <RoomWallLightupProvider>
                        <App />
                    </RoomWallLightupProvider>
                </ConfiguratorProvider>
            </ContactProvider>
        </VariaProvider>
    </React.StrictMode>,
)
