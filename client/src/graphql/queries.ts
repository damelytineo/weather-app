import {gql} from '@apollo/client'; 

export const GET_LOCATIONS = gql`
    query GetLocations($name: String!) {
        locations(name: $name) {
            name
            latitude
            longitude
            country_code
        }
    }
`;

export const GET_WEATHER = gql`
    query GetWeather($latitude: Float!, $longitude: Float!) {
        weather(latitude: $latitude, longitude: $longitude) {
            temperature
            windspeed
            winddirection
            weathercode
            time
        }
    }
`;