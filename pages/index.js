// pages/index.js
import Link from 'next/link';
import { Box, Button } from '@chakra-ui/react';

export default function Home() {
  return (
    <Box textAlign="center" mt={10}>
      <h1>Bine ai venit la aplicația mea de orașe!</h1>
      <p>Explorează orașe, adaugă-le la favorite și află informații despre ele.</p>
      <Link href="/search" passHref>
        <Button colorScheme="teal" size="lg" mt={4}>
          Începe să cauți orașe
        </Button>
      </Link>
    </Box>
  );
}
