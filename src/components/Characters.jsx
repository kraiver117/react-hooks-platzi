import React, { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../context/ThemeContext';
import '../styles/Characters.css'

export const Characters = () => {
	const { theme } = useContext(ThemeContext)

    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character/')
			.then(response => response.json())
			.then(data => setCharacters(data.results))
    }, [])

    return (
        <div className="characters mt-1">
			{characters.map(character => (
				<div className='mb-1' key={character.id}>
					<img src={character.image} alt={character.name} />
					<h2 className={'text-center ' + (theme ? 'text-white' : 'text-dark')}>{character.name}</h2>
				</div>
			))}
        </div>
    )
}
