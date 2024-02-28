import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky, Stars } from '@react-three/drei'
import Room from './components/Room'

import * as THREE from 'three';
import './App.css'
import { useRef } from 'react'
import { PointLight, PointLightHelper } from 'three'
import { useHelper } from '@react-three/drei'

function App() {
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(2.5);
  const [depth, setdepth] = useState(7);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(`Width: ${width}, Height: ${height}, depth: ${depth}`);
  };

  // const lightref = useRef<PointLight>(null);
  // useHelper(lightref, PointLightHelper, 1, "red");



  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="width">Width:</label>
          <input
            type="number"
            id="width"
            name="width"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            required
          />

          <label htmlFor="height">Height:</label>
          <input
            type="number"
            id="height"
            name="height"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            required
          />

          <label htmlFor="depth">depth:</label>
          <input
            type="number"
            id="depth"
            name="depth"
            value={depth}
            onChange={(e) => setdepth(Number(e.target.value))}
            required
          />

          <button type="submit">Submit</button>
        </div>
      </form>
      <Canvas className="canvas" >
        <ambientLight intensity={.5}/>
        <directionalLight position={[0, 100, 100]}/>
        <Room width={width} depth={depth} height={height} wallThickness={0.3} floorThickness={0.3} />
        
        <OrbitControls />

        <Sky distance={450000} sunPosition={[0, 100, 100]} inclination={10} azimuth={0.25} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <axesHelper />
      </Canvas>
    </div>
  );
}

export default App
