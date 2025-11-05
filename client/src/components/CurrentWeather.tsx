import React from 'react';
import { Location, Units } from '../types/weather';
import useWeatherData from '../hooks/useWeatherData';

interface CurrentWeatherProps {
    selectedLocation: Location | null;
    units: Units;
}

function CurrentWeather({ selectedLocation, units }: CurrentWeatherProps) {
    const { weatherData, loading, error } = useWeatherData(selectedLocation);

    if (loading) return <p>Loading weather data...</p>;
    if (error) return <p>Error: {error}</p>;

    const convertTemp = (celsius: number): number => {
        if (units.temp === 'fahrenheit') {
            return (celsius * 9 / 5) + 32;
        }
        return celsius;
    };

    const convertWindSpeed = (kmh: number): number => {
        if (units.wind === 'mph') {
            return kmh * 0.621371;
        }
        return kmh;
    };

    const convertedTemp = convertTemp(weatherData?.current_weather.temperature);
    const convertedWind = convertWindSpeed(weatherData?.current_weather.windspeed);

    return (
        <div>
            <h2>Current Weather</h2>
            <div>
                <p>
                    Temperature: {convertedTemp?.toFixed(1)}
                    {units.temp === 'celsius' ? 'C' : 'F'}
                </p>
                <p>
                    Wind Speed: {convertedWind?.toFixed(1)}
                    {units.wind === 'km/h' ? 'km/h' : 'mph'}
                </p>
                <p>Weather Code: {weatherData?.current_weather.weathercode}</p>
            </div>
        </div>
    );
}

export default CurrentWeather;