// pages/city.js
import { Box, Button } from '@chakra-ui/react';
import Link from 'next/link';

export default function City() {
  return (
    <Box textAlign="center" mt={10}>
      <h1>Orașul București</h1>
      <p>Aici poți afla mai multe informații despre orașul București.</p>
      <Button colorScheme="teal" size="lg" mt={4}>
        Adaugă la favorite
      </Button>
      <Link href="/search" passHref>
        <Button colorScheme="teal" size="lg" mt={4} variant="outline">
          Înapoi la căutare
        </Button>
      </Link>
    </Box>
  );
}
