import { Canvas } from '@react-three/fiber'
import { Box, OrbitControls, Sky, Stars } from '@react-three/drei'
// import Room from './components/roomComponents/Room'
import { useEffect, useState } from 'react'
import './App.css'
import Sidebar from './sidebar/Sidebar'
import { useTranslation } from 'react-i18next'
import Scene from './3D/Scene'
import { ConfiguratorProvider } from './contexts/ConfiguratorContext'
import { FloorplanEditor } from './2D/FloorplanEditor'


function App() {

  const { i18n } = useTranslation();

  useEffect(() => {
    const lng = navigator.language;
    i18n.changeLanguage(lng);
  }, [])

  return (
    <div className="App">
      <Sidebar />
      <main>
        <div className="container">
          {/* <Scene /> */}
          <Canvas orthographic camera={{ position: [0, 0, 5], zoom: 100 }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <FloorplanEditor />
            <axesHelper />
            {/* <OrbitControls /> */}
          </Canvas>
        </div>
      </main>
    </div>
  )
    ;
}

export default App;
