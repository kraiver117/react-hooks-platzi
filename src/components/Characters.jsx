import React, { useState, useEffect, useContext, useReducer } from 'react'
import { ThemeContext } from '../context/ThemeContext';
import '../styles/Characters.css'

//Create initial state of our reducer
const initialState = {
	favorites: []
}

//Create our reducer
const favoriteReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_TO_FAVORITE':
			return {
				...state,
				favorites: [...state.favorites, action.payload]
			}
		
		case 'DELETE_FAVORITE':
			return {
				...state,
				favorites: state.favorites.filter(favorite => favorite.id !== action.payload.id)
			}
		
		default:
			return state
	}
}

export const Characters = () => {
	const { theme } = useContext(ThemeContext)

	//NOTE: USE REDUCER DO NOT REPLACE REDUX,IS ONLY AN ALTERNATIVE TO USE INSTEAD OF USESTATE
	//Use reducer destructuring an array, in the first position we have state and in the second we have the dispatch
	//use Reducer accept in the first parameter a reducer and in the second the initial state
	const [state, dispatch] = useReducer(favoriteReducer, initialState)

    const [characters, setCharacters] = useState([])

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character/')
			.then(response => response.json())
			.then(data => setCharacters(data.results))
    }, [])

	const handleClick = (favorite) => {
		//A dispatch accept and object with type and payload to handle the action type in our reducer
		dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
	}

	const handleDeleteFavorites = (favorite) => {
		dispatch({ type: 'DELETE_FAVORITE', payload: favorite })
	}

    return (
        <div className="characters mt-1">
			{/* We can access to the state provide to our useReducer */}
			{state.favorites.length > 0 && <h2>Favoritos</h2>}
			{state.favorites.map(character => (
				<div className="mb-1" key={character.id}>
					<img src={character.image} alt={character.name} />
					<h2 className={'text-center ' + (theme ? 'text-white' : 'text-dark')}>{character.name}</h2>
					<button type='button' onClick={() => handleDeleteFavorites(character)}>
						Quitar de favoritos
					</button>
				</div>
			))}
			{characters.map(character => (
				<div className='mb-1' key={character.id}>
					<img src={character.image} alt={character.name} />
					<h2 className={'text-center ' + (theme ? 'text-white' : 'text-dark')}>{character.name}</h2>
					<button type='button' onClick={() => handleClick(character)}>
						Agregar a favoritos
					</button>
				</div>
			))}
        </div>
    )
}
