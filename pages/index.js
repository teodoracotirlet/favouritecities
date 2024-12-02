import { useState, useEffect } from 'react';
import { Box, VStack, Input, Button, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';
import { getLocation } from '../utils/location'; // Funcția pentru detectarea locației
import Link from 'next/link';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteCities, setFavoriteCities] = useState([]);
  const [randomCities, setRandomCities] = useState([]);
  const [detectedCity, setDetectedCity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('/api/favorites');
        setFavoriteCities(response.data.slice(0, 5)); // Limitează la 5 orașe
      } catch (error) {
        console.error('Error fetching favorite cities:', error);
      }
    };

    const fetchRandomCities = async () => {
      try {
        const response = await axios.get('/api/random-cities'); // Endpoint pentru orașe random
        setRandomCities(response.data.slice(0, 5)); // Limitează la 5 orașe
      } catch (error) {
        console.error('Error fetching random cities:', error);
      }
    };

    fetchFavorites();
    fetchRandomCities();
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/search?query=${searchQuery}`;
    }
  };

  const handleDetectLocation = async () => {
    try {
      const { latitude, longitude } = await getLocation();
      const weatherResponse = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
        params: {
          lat: latitude,
          lon: longitude,
          appid: 'API_KEY', // Înlocuiește cu cheia ta
          units: 'metric',
        },
      });

      setDetectedCity({
        name: weatherResponse.data.name,
        country: weatherResponse.data.sys.country,
        temperature: weatherResponse.data.main.temp,
        description: weatherResponse.data.weather[0].description,
      });

      setError(null);

      // Poți salva locația detectată ca destinație preferată
      await axios.post('/api/favorites', {
        name: weatherResponse.data.name,
        country: weatherResponse.data.sys.country,
        latitude,
        longitude,
      });
    } catch (err) {
      setError('Nu s-a putut detecta locația.');
      console.error(err);
    }
  };

  return (
    <Box p={5}>
      {/* Câmpul de căutare */}
      <Heading mb={5}>Bine ai venit!</Heading>
      <Input
        placeholder="Caută un oraș..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        mb={4}
      />
      <Button onClick={handleSearch} colorScheme="teal">
        Caută
      </Button>

      {/* Buton pentru detectarea locației */}
      <Box mt={10}>
        <Button colorScheme="teal" onClick={handleDetectLocation}>
          Detectează locația mea
        </Button>
        {error && <Text color="red.500" mt={4}>{error}</Text>}
        {detectedCity && (
          <Box mt={6}>
            <Text fontSize="xl">Locația detectată: {detectedCity.name}, {detectedCity.country}</Text>
            <Text>Temperatură: {detectedCity.temperature}°C</Text>
            <Text>Starea vremii: {detectedCity.description}</Text>
          </Box>
        )}
      </Box>

      {/* Lista cu orașe preferate */}
      <Box mt={10}>
        <Heading size="lg" mb={4}>
          Orașele preferate
        </Heading>
        {favoriteCities.length > 0 ? (
          <VStack spacing={4}>
            {favoriteCities.map((city) => (
              <Text key={city.id}>
                {city.name}, {city.country}
              </Text>
            ))}
          </VStack>
        ) : (
          <Text>Nu ai adăugat încă orașe preferate.</Text>
        )}
      </Box>

      {/* Lista cu orașe random */}
      <Box mt={10}>
        <Heading size="lg" mb={4}>
          Orașe random
        </Heading>
        {randomCities.length > 0 ? (
          <VStack spacing={4}>
            {randomCities.map((city) => (
              <Text key={city.id}>
                {city.name}, {city.country}
              </Text>
            ))}
          </VStack>
        ) : (
          <Text>Nu s-au găsit orașe random.</Text>
        )}
      </Box>
    </Box>
  );
}
