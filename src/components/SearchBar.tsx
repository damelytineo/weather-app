import React from 'react';
import iconSearch from '../assets/images/icon-search.svg';

interface SearchBarProps {
  locationResults: any[];
  setLocationResults: React.Dispatch<React.SetStateAction<any[]>>;
}

function SearchBar({ locationResults, setLocationResults}: SearchBarProps) { //add setSelectedLocation to props
  const [searchInput, setSearchInput] = React.useState<string>('');

  const fetchLocations = async (location: string) => {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`);
    const data = await res.json();

    const seen = new Set<string>();
    const filteredRes= (data.results || [])
      .filter((place: { name: string; country_code: string }) =>
        place.name.toLowerCase().includes(location.toLowerCase())
      )
      .filter((place: { country_code: string }) => {
        if (seen.has(place.country_code)) return false;
        seen.add(place.country_code);
        return true;
      })
      .map((place: { name: string; country_code: string }) => ({
        name: place.name,
        country_code: place.country_code,
      }));

    setLocationResults(filteredRes);
  };

  return (
    <div className="search-container">
      <input type="text" placeholder="Search for a place..." className="search-input" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
      <img src={iconSearch} alt="Search Icon" className="search-icon" />
      <button className="btn btn-primary search-button" type="button" onClick={() => fetchLocations(searchInput)}>Search</button>
      {locationResults.length > 0 && (
        <ul className="location-results">
          {locationResults.map((place, index) => (
            <li key={index}>
              {place.name}, {place.country_code}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;