import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky, Stars } from '@react-three/drei'
import Room from './components/roomComponents/Room'
import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './sidebar/Sidebar.jsx'
import { useTranslation } from 'react-i18next'
import { DimensionProvider } from './components/contexts/DimensionContext';
import Scene from './components/Scene'


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
        <DimensionProvider>
          <div className="container">
            <Scene />
          </div>
        </DimensionProvider>
      </main>
    </div>
  )
  ;
}

export default App;
