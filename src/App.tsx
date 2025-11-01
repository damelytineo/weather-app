import React from 'react';
import Logo from './components/Logo';
import UnitsDropdown from './components/UnitsDropdown';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';

function App() {
  const [locationResults, setLocationResults] = React.useState<any[]>([]);

  return (
    <div>
      <Logo />
      <UnitsDropdown />
      <SearchBar 
        locationResults={locationResults}
        setLocationResults={setLocationResults}
      />
      <CurrentWeather />
      <Forecast />
    </div>
  );
}

export default App;
