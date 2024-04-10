import { Canvas } from '@react-three/fiber'
import { Box, OrbitControls, Sky, Stars } from '@react-three/drei'
// import Room from './components/roomComponents/Room'
import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './sidebar/Sidebar'
import { useTranslation } from 'react-i18next'
import Scene from './3D/Scene'
import { ConfiguratorProvider } from './contexts/ConfiguratorContext'
import { FloorplanScene } from './2D/FloorplanScene'


function App() {

  const { i18n } = useTranslation();

  const showFloorplan = true;

  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  }, [])

  return (
    <div className="App">
      <Sidebar />
      <main>
        <div className="container">
          {showFloorplan && <FloorplanScene />}
          {!showFloorplan && <Scene />}
        </div>
      </main>
    </div>
  )
    ;
}

export default App;
