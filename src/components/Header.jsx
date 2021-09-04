import React, { useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext';

export const Header = ({ handleClick}) => {

	//Access to the state withing ThemeContext
	const { theme } = useContext(ThemeContext)

	return (
		<div className="header text-center">
			<h1 className={theme ? 'text-white' : 'text-dark'}>React Hooks</h1>
			<button type='button' onClick={handleClick}>
				{theme ? 'Light Mode' : 'Dark Mode'}
			</button>
		</div>
	)
}
