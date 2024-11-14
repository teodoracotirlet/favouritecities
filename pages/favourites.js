// pages/favorites.js
import { Box, Button, VStack } from '@chakra-ui/react';
import Link from 'next/link';

export default function Favorites() {
  return (
    <Box textAlign="center" mt={10}>
      <h1>Orașele tale favorite</h1>
      <VStack spacing={4} mt={6}>
        <Button colorScheme="teal" size="lg">
          București
        </Button>
        <Button colorScheme="teal" size="lg">
          Cluj-Napoca
        </Button>
        <Button colorScheme="teal" size="lg">
          Iași
        </Button>
      </VStack>
      <Link href="/search" passHref>
        <Button colorScheme="teal" size="lg" mt={6}>
          Înapoi la căutare
        </Button>
      </Link>
    </Box>
  );
}
