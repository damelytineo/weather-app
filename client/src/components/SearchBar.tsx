import React from 'react';
import iconSearch from '../assets/images/icon-search.svg';
import { Location } from '../types/weather';
import { useLazyQuery } from "@apollo/client/react";
import { GET_LOCATIONS } from '../graphql/queries';

interface SearchBarProps {
  locationResults: Location[];
  setLocationResults: React.Dispatch<React.SetStateAction<Location[]>>;
  setSelectedLocation: React.Dispatch<React.SetStateAction<Location | null>>;
}

interface getLocationsData {
  locations: Location[];
}

function SearchBar({ locationResults, setLocationResults, setSelectedLocation }: SearchBarProps) {
  const [searchInput, setSearchInput] = React.useState<string>('');
  const [getLocations] = useLazyQuery<getLocationsData>(GET_LOCATIONS);

  // use query
  const fetchLocations = async (location: string) => {
    const { data } = await getLocations({
      variables: { name: location },
    });

    if (!data) {
      setLocationResults([]);
      return;
    }

    const seen = new Set<string>();
    const filteredRes: Location[] = (data.locations || [])
      .filter((place: { name: string; country_code: string }) =>
        place.name.toLowerCase().includes(location.toLowerCase())
      )
      .filter((place: { country_code: string }) => {
        if (seen.has(place.country_code)) return false;
        seen.add(place.country_code);
        return true;
      })
      .map((place: { name: string; country_code: string; latitude: number; longitude: number }) => ({
        name: place.name,
        country_code: place.country_code,
        latitude: place.latitude,
        longitude: place.longitude,
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
                  setSelectedLocation(location);
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