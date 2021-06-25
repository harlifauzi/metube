import React from 'react';
import './SearchBar.css';

const SearchBar = ({ onSubmit, value, onChange }) => {
    return (
        <form type="submit" onSubmit={onSubmit} className="searchbar-container">
            <input 
                type="text"
                placeholder='Playlist link ...' 
                className='js-search' 
                value={value}
                onChange={onChange}
             />
            <i className='bx bx-search'></i>
        </form>
    )
}

export default SearchBar
