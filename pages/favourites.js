import { useState, useEffect } from 'react';
import { Box, Button, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import axios from 'axios';

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('/api/favorites');
        setFavorites(response.data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <Box textAlign="center" mt={10}>
      <h1>Orașele tale favorite</h1>
      {favorites.length > 0 ? (
        <VStack spacing={4} mt={6}>
          {favorites.map((city) => (
            <Button
              key={city.id}
              colorScheme="teal"
              size="lg"
              onClick={() => alert(`Ai selectat ${city.name}`)}
            >
              {city.name}, {city.country}
            </Button>
          ))}
        </VStack>
      ) : (
        <p>Nu ai salvat niciun oraș favorit.</p>
      )}
      <Link href="/search" passHref>
        <Button colorScheme="teal" size="lg" mt={6}>
          Înapoi la căutare
        </Button>
      </Link>
    </Box>
  );
}
