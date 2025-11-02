import { Location } from "../types/weather";
import { useState, useEffect } from "react";

const useWeatherData = (location: Location | null) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!location) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`);
        if (!res.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await res.json();
        setWeatherData(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [location]);

  return { weatherData, loading, error };
};

export default useWeatherData;