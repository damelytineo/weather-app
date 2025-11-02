import React from 'react';

function CurrentWeather({ selectedLocation }: { selectedLocation: { name: string; country_code: string } | null }) {
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
