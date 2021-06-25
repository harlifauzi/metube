import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
    return (
        <div className="searchbar-container">
            <input placeholder='Playlist link ...' class='js-search' type="text" />
            <i class='bx bx-search'></i>
        </div>
    )
}

export default SearchBar
