export interface Location {
    name: string;
    country_code: string;
    latitude: number;
    longitude: number;
}

export interface Units {
    temp: 'celsius' | 'fahrenheit';
    wind: 'km/h' | 'mph';
    precip: 'mm' | 'in';
}
