import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {ContactProvider, VariaProvider} from "./contexts/MyContext";
import {ConfiguratorProvider} from "./contexts/ConfiguratorContext.jsx";
import './i18n.ts'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <VariaProvider>
          <ContactProvider>
              <ConfiguratorProvider>
                  <App />
              </ConfiguratorProvider>
          </ContactProvider>
      </VariaProvider>
  </React.StrictMode>,
)
