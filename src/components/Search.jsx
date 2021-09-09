import React from 'react'

export const Search = ({search, searchInput, handleSearch}) => {
    console.log('useCallback');
    return (
        <div className="Search">
            <input type="text" value={search} ref={searchInput} onChange={handleSearch} />
        </div>
    )
}
