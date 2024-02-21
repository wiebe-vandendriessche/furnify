import {
    //BrowserRouter,
    Routes,
    //Route,
} from "react-router-dom";
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Sidebar from './sidebar/sidebar.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
        <Sidebar/>
        <main>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
            </div>
            <Routes></Routes>

        </main>
    </div>
  )
}

export default App
