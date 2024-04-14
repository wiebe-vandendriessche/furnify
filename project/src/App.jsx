import './App.css'
import Sidebar from './sidebar/Sidebar'
import Scene from './3D/Scene'
import { useConfiguratorContext } from './contexts/ConfiguratorContext'
import { FloorplanScene } from './2D/FloorplanScene'


function App() {

  const { rectangular, setRectangular } = useConfiguratorContext();

  return (
    <div className="App">
      <Sidebar />
      <main>
        <div className="container">
          {rectangular && <Scene />}
          {!rectangular && <FloorplanScene />}
        </div>
      </main>
    </div>
  )
    ;
}

export default App;
