import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './sidebar/Sidebar.jsx'

import { useTranslation } from 'react-i18next'

function App() {

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  }, [])

  const lng = navigator.language;

  return (
    <div className="App">
      <Sidebar />
      <main>
        <h2>
          {t('greeting.hello')}
        </h2>
        <span>
          Browser Language: {lng}
        </span>
      </main>
    </div>
  )
}

export default App;
