import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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

          <label htmlFor="length">Length:</label>
          <input
            type="number"
            id="length"
            name="length"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            required
          />

          <button type="submit">Submit</button>
        </div>
      </form>
      <Canvas className="canvas">
        <ambientLight intensity={1} />
        {/* <Room width={width} height={height} length={length} /> */}
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <Room width={5} depth={5} height={3} wallThickness={0.5} floorThickness={0.3} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App
