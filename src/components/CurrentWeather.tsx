import React from 'react';
import { Location } from '../types/weather';

interface CurrentWeatherProps {
    selectedLocation: Location | null;
}

function CurrentWeather({ selectedLocation }: CurrentWeatherProps) {
    return (
        <div>
            <h2>Current Weather Component</h2>
            {selectedLocation ? (
                <p>Showing weather for {selectedLocation.name}, {selectedLocation.country_code}</p>
            ) : (
                <p>Current geo location weather</p>
            )}
        </div>
    );
}

export default CurrentWeather;
