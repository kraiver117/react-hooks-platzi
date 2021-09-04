import React, { useContext } from 'react'
import { ThemeContext } from './context/ThemeContext'
import { Header } from './components/Header'
import { Characters } from './components/Characters'

import './App.css'

function App() {
  //To consume the state of our context we need to use useContext and access to the values within the ThemeContext
  // In others components we access to the state using useContext instead passing props for each component
  const { theme, setTheme } = useContext(ThemeContext)

	const handleClick = () => {
		setTheme(!theme)
	}

  return (
    <div className={theme ? 'bg-black' : 'bg-light'}>
      <Header handleClick={handleClick} />
      <Characters />
      <h1>Hola mundo</h1>
    </div>
  );
}

export default App;
