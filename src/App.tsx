import React from 'react';
import UnitsDropdown from './components/UnitsDropdown';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';

function App() {
  return (
    <div>
      <UnitsDropdown />
      <SearchBar />
      <CurrentWeather />
      <Forecast />
    </div>
  );
}

export default App;
