import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { VariaProvider } from "./contexts/VariaContext.jsx";
import { ConfiguratorProvider } from "./contexts/ConfiguratorContext.jsx";
import { ContactProvider } from "./contexts/ContactContext.jsx";
import "./i18n.ts";
import { DrawingProvider } from "./contexts/2dContext.tsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <VariaProvider>
      <ContactProvider>
        <ConfiguratorProvider>
          <DrawingProvider>
            <App />
          </DrawingProvider>
        </ConfiguratorProvider>
      </ContactProvider>
    </VariaProvider>
  </React.StrictMode>
);
