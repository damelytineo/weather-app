import React from 'react';
import { Location } from '../types/weather';
import useWeatherData from '../hooks/useWeatherData';

interface CurrentWeatherProps {
    selectedLocation: Location | null;
}

function CurrentWeather({ selectedLocation }: CurrentWeatherProps) {
    const { weatherData, loading, error } = useWeatherData(selectedLocation);

    if (loading) return <p>Loading weather data...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Current Weather</h2>
            {weatherData ? (
                <div>
                    <p>Temperature: {weatherData.current_weather.temperature}°C</p>
                    <p>Wind Speed: {weatherData.current_weather.windspeed} km/h</p>
                    <p>Weather Code: {weatherData.current_weather.weathercode}</p>
                </div>
            ) : (
                <p>No weather data available.</p>
            )}
        </div>
    );
}

export default CurrentWeather;
