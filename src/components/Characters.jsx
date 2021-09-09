import React, { 
	useState, 
	useContext, 
	useReducer, 
	useMemo, 
	useRef,
	useCallback 
} from 'react'
import useCharacters from '../hooks/useCharacters';
import { ThemeContext } from '../context/ThemeContext';
import '../styles/Characters.css'
import { Search } from './Search';

//API
const API = 'https://rickandmortyapi.com/api/character/'

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

	const [search, setSearch] = useState('')

	//useRef refers an element in the DOM that allows to use all its properties
	const searchInput = useRef(null)

	//---Calling custom hook---//
	const characters = useCharacters(API);

	// const handleSearch = () => {
	// 	//Use ref of the Dom element instead of use e.target.value
	// 	setSearch(searchInput.current.value)
	// }

	//USING USECALLBACK HOOK
	//useCallback only generates one reference of the functions and avoid to build again the reference in every render
	const handleSearch = useCallback(() => {
		console.log('useCallback')
		setSearch(searchInput.current.value)
	},[])

	// const filteredCharacters = characters.filter((character) => {
	// 	console.log('Without useMemo')
	// 	return character.name.toLowerCase().includes(search.toLocaleLowerCase())
	// })

	//useMemo only re-calculate again if the array of dependencies changes
	//This is great to avoid expensive calculations in every render
	//NOTE: Do not use memo on API calls and if you work with dates and times on javascript
	const filteredCharacters = useMemo(() => {
		console.log('use Memo');
		return characters.filter((character) => character.name.toLowerCase().includes(search.toLowerCase()))
	}, [characters, search])

	const handleClick = (favorite) => {
		//A dispatch accept and object with type and payload to handle the action type in our reducer
		dispatch({ type: 'ADD_TO_FAVORITE', payload: favorite })
	}

	const handleDeleteFavorites = (favorite) => {
		dispatch({ type: 'DELETE_FAVORITE', payload: favorite })
	}

    return (
        <div className="characters mt-1">
			{/* Search */}
			<Search search={search} searchInput={searchInput} handleSearch={handleSearch} />

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
			{filteredCharacters?.map(character => (
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
