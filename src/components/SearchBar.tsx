import React from 'react';
import iconSearch from '../assets/images/icon-search.svg';

interface SearchBarProps {
  locationResults: any[];
  setLocationResults: React.Dispatch<React.SetStateAction<any[]>>;
  setSelectedLocation: React.Dispatch<React.SetStateAction<{ name: string; country_code: string } | null>>
}

function SearchBar({ locationResults, setLocationResults, setSelectedLocation }: SearchBarProps) {
  const [searchInput, setSearchInput] = React.useState<string>('');

  const fetchLocations = async (location: string) => {
    const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}`);
    const data = await res.json();

    const seen = new Set<string>();
    const filteredRes = (data.results || [])
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
        <ul className="list-group position-absolute w-100" style={{ zIndex: 1000 }}>
          {locationResults.map((location, index) => (
            <li key={index} className="list-group-item list-group-item-action p-0">
              <button
                className="btn btn-link w-100 text-start p-2"
                type="button"
                onClick={() => {
                  setSelectedLocation({ name: location.name, country_code: location.country_code });
                  setLocationResults([]);
                  setSearchInput('');
                }}
              >
                {location.name}, {location.country_code}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;