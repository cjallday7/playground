import { useState } from 'react'
import ElasticToggle from './components/ElasticToggle'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <ElasticToggle isOn={darkMode} onToggle={setDarkMode} />
    </div>
  )
}

export default App
