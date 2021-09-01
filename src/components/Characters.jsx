import React, { useState, useEffect } from 'react'
import '../styles/Characters.css'

export const Characters = ({darkMode}) => {

    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character/')
			.then(response => response.json())
			.then(data => setCharacters(data.results))
    }, [])

    return (
        <div className="characters mt-1">
			{characters.map(character => (
				<div className='mb-1'>
					<img src={character.image} alt={character.name} />
					<h2 className={'text-center ' + (darkMode ? 'text-white' : 'text-dark')}>{character.name}</h2>
				</div>
			))}
        </div>
    )
}
