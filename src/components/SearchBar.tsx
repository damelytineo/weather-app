import React from 'react';
import iconSearch from '../assets/images/icon-search.svg';

function SearchBar() {
  return (
    <div className="search-container">
      <input type="text" placeholder="Search for a place..." className="search-input" />
      <img src={iconSearch} alt="Search Icon" className="search-icon" />
      <button className="btn btn-primary search-button" type="button">Search</button>
    </div>
  );
}

export default SearchBar;