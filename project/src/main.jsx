import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ConfiguratorProvider, ContactProvider, VariaProvider} from "./contexts/MyContext";
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
