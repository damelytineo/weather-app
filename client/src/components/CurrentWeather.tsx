import React from 'react';
import { Location, Units } from '../types/weather';
import { useQuery } from '@apollo/client/react';
import { GET_WEATHER } from '../graphql/queries';

interface CurrentWeatherProps {
    selectedLocation: Location | null;
    units: Units;
}

function CurrentWeather({ selectedLocation, units }: CurrentWeatherProps) {

    const { loading, error, data } = useQuery<getWeatherData>(GET_WEATHER, {
        variables: {
            latitude: selectedLocation?.latitude,
            longitude: selectedLocation?.longitude,
        },
        skip: !selectedLocation,
    });

    if (loading) return <p>Loading weather data...</p>;
    if (error) return <p>Error loading weather data: {error.message}</p>;

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

    const convertedTemp = convertTemp(data?.current_weather.temperature);
    const convertedWind = convertWindSpeed(data?.current_weather.windspeed);

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
                <p>Weather Code: {data?.current_weather.weathercode}</p>
            </div>
        </div>
    );
}

export default CurrentWeather;