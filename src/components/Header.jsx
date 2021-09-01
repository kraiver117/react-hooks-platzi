import React, { useState } from 'react'

export const Header = () => {
	const [darkMode, setDarkMode] = useState(false)

	const handleClick = () => {
		setDarkMode(!darkMode)
	}

	return (
		<div className="header">
			<h1>React Hooks</h1>
			<button type='button' onClick={handleClick}>
				{darkMode ? 'Dark Mode' : 'Light Mode'}
			</button>
			<button type='button' onClick={() => setDarkMode(!darkMode)}>
				{darkMode ? 'Dark Mode 2' : 'Light Mode 2'}
			</button>
		</div>
	)
}
