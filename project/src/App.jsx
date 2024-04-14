import { Canvas } from '@react-three/fiber'
// import Room from './components/roomComponents/Room'
import './App.css'
import Sidebar from './sidebar/Sidebar'
import Scene from './3D/Scene'


function App() {


  return (
      <div className="App">
        <Sidebar />
        <main>
          <div className="container">
            <Scene />
          </div>
        </main>
      </div>
  )
    ;
}

export default App;
