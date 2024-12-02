import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const CityPage = () => {
  const [cityData, setCityData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false); // Pentru a verifica dacă orașul este salvat
  const router = useRouter();
  const { id } = router.query;

  const geocodingAPIKey = 'API_KEY_OPEN_METEO'; // Înlocuiește cu cheia ta
  const weatherAPIKey = 'API_KEY_OPENWEATHER'; // Înlocuiește cu cheia ta

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

        // Verifică dacă orașul este deja în baza de date
        const favoriteCheck = await axios.get('/api/favorites', { params: { id: cityInfo.id } });
        setIsFavorite(favoriteCheck.data.isFavorite);

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

  const handleFavoriteToggle = async () => {
    try {
      if (isFavorite) {
        await axios.delete('/api/favorites', { data: { id: cityData.id } });
      } else {
        await axios.post('/api/favorites', {
          id: cityData.id,
          name: cityData.name,
          country: cityData.country,
          latitude: cityData.latitude,
          longitude: cityData.longitude,
        });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

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

      <button onClick={handleFavoriteToggle}>
        {isFavorite ? 'Șterge din preferate' : 'Salvează ca preferat'}
      </button>
    </div>
  );
};

export default CityPage;
