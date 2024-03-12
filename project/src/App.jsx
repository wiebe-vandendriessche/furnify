import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky, Stars } from '@react-three/drei'
// import Room from './components/roomComponents/Room'
import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './sidebar/Sidebar'
import { useTranslation } from 'react-i18next'
import Scene from './3D/Scene'
import { ConfiguratorProvider } from './contexts/MyContext'


function App() {

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  }, [])

  const lng = navigator.language;

  return (
    <ConfiguratorProvider>
      <div className="App">
        <Sidebar />
        <main>
          <div className="container">
            <Scene />
          </div>
        </main>
      </div>
    </ConfiguratorProvider>
  )
    ;
}

export default App;
