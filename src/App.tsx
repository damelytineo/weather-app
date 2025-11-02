import React from 'react';
import Logo from './components/Logo';
import UnitsDropdown from './components/UnitsDropdown';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import { Location } from './types/weather';

function App() {
  const [locationResults, setLocationResults] = React.useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = React.useState<Location | null>(null);

  return (
    <div>
      <Logo />
      <UnitsDropdown />
      <SearchBar
        locationResults={locationResults}
        setLocationResults={setLocationResults}
        setSelectedLocation={setSelectedLocation}
      />
      <CurrentWeather selectedLocation={selectedLocation} />
      <Forecast />
    </div>
  );
}

export default App;
