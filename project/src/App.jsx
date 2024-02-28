import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Room from './components/Room'
import './App.css'

function App() {
  const [width, setWidth] = useState(4);
  const [height, setHeight] = useState(2.5);
  const [depth, setdepth] = useState(7);

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(`Width: ${width}, Height: ${height}, depth: ${depth}`);
  };


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
      <Canvas className="canvas">
        {/* <Room width={width} height={height} depth={depth} /> */}
        <ambientLight intensity={0.3}></ambientLight>
        <directionalLight position={[0, 15, 15]}/>
        <Room width={width} depth={depth} height={height} wallThickness={0.3} floorThickness={0.3} />
        <OrbitControls />
        <axesHelper />
      </Canvas>
    </div>  
  );
}

export default App
