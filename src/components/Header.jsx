import React from 'react'

export const Header = ({darkMode, handleClick}) => {
	return (
		<div className="header text-center">
			<h1 className={darkMode ? 'text-white' : 'text-dark'}>React Hooks</h1>
			<button type='button' onClick={handleClick}>
				{darkMode ? 'Light Mode' : 'Dark Mode'}
			</button>
		</div>
	)
}
