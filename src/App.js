import React from 'react';
import './styles/index.css';
import UnitsToggle from './components/UnitsToggle';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';

function App() {
  return (
    <div className="App">
      TEST
      <UnitsToggle />
      <SearchBar />
      <CurrentWeather />
      <Forecast />
    </div>
  );
}

export default App;
