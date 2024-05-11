import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {VariaProvider} from "./contexts/VariaContext.jsx";
import {ConfiguratorProvider} from "./contexts/ConfiguratorContext.jsx";
import {ContactProvider} from "./contexts/ContactContext.jsx";
import {RoomWallLightupProvider} from './contexts/RoomWallLightupContext.jsx';
import {DrawingProvider} from "./contexts/2dContext.tsx";
import "./i18n.ts";
import {BrowserRouter} from "react-router-dom";
import Routing from "./Routing.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <VariaProvider>
                <ContactProvider>
                    <ConfiguratorProvider>
                        <RoomWallLightupProvider>
                            <DrawingProvider>
                                <Routing/>
                            </DrawingProvider>
                        </RoomWallLightupProvider>
                    </ConfiguratorProvider>
                </ContactProvider>
            </VariaProvider>
        </BrowserRouter>

    </React.StrictMode>
);
