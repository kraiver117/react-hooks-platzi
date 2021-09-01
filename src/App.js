import React, { useState } from 'react'
import { Header } from './components/Header'
import { Characters } from './components/Characters'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(false)

	const handleClick = () => {
		setDarkMode(!darkMode)
	}

  return (
    <div className={darkMode ? 'bg-black' : 'bg-light'}>
      <Header darkMode={darkMode} handleClick={handleClick} />
      <Characters darkMode={darkMode} />
      <h1>Hola mundo</h1>
    </div>
  );
}

export default App;
