import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const CityPage = () => {
  const [cityData, setCityData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  const geocodingAPIKey = 'API_KEY_OPEN_METEO';  // Înlocuiește cu cheia ta
  const weatherAPIKey = 'API_KEY_OPENWEATHER';  // Înlocuiește cu cheia ta

  useEffect(() => {
    if (!id) return;
    setLoading(true);

    const fetchCityData = async () => {
      try {
        const cityResponse = await axios.get(`https://geocoding-api.open-meteo.com/v1/search`, {
          params: {
            name: id,
            language: 'en',
            format: 'json',
            limit: 1,
          },
        });

        const cityInfo = cityResponse.data.results[0];
        setCityData(cityInfo);

        // Fetch weather data
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
          params: {
            lat: cityInfo.latitude,
            lon: cityInfo.longitude,
            appid: weatherAPIKey,
            units: 'metric',
          },
        });
        setWeatherData(weatherResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCityData();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!cityData) return <p>City not found</p>;

  return (
    <div>
      <h1>{cityData.name}, {cityData.country}</h1>
      <p>Latitude: {cityData.latitude}</p>
      <p>Longitude: {cityData.longitude}</p>

      {weatherData && (
        <div>
          <h2>Weather</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default CityPage;
