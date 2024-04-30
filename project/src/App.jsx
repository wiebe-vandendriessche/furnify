import './App.css'
import Sidebar from './sidebar/Sidebar'
import Scene from './3D/Scene'
import { useConfiguratorContext } from './contexts/ConfiguratorContext'
import { FloorplanScene } from './2D/FloorplanScene'
import { get_modules } from './algorithm/module_choice'
import { Loader } from '@react-three/drei'
import { Suspense } from 'react'
function App() {

  const { rectangular, setRectangular } = useConfiguratorContext();
  get_modules();

  return (
    <>
        <div className="App">
          <Sidebar />
          <main>
            <div className="container">
              {rectangular && <Scene />}
              {!rectangular && <FloorplanScene />}
            </div>
          </main>
        </div>
    </>
  );
}

export default App;
