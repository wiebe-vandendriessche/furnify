import { useState } from 'react'
import './App.css'
import Sidebar from './sidebar/Sidebar.jsx'

function App() {
  const [count, setCount] = useState(0);


  return (
    <div className="App">
        <Sidebar/>
        <main>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>

            </div>
        </main>
    </div>
  )
}

export default App;
