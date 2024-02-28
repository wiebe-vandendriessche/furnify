import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky, Stars } from '@react-three/drei'
import Room from './components/roomComponents/Room'
import './App.css'
import Scene from './components/Scene'
import DimensionInput from './components/DimensionInput'
import { DimensionProvider } from './components/contexts/DimensionContext';

function App() {

  return (
    <DimensionProvider>
      <div className="container">
        <DimensionInput />
        <Scene />
      </div>
    </DimensionProvider>
  );
}

export default App
