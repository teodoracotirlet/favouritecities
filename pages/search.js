// pages/search.js
import { Box, Input, Button, VStack } from '@chakra-ui/react';
import Link from 'next/link';

export default function Search() {
  return (
    <Box textAlign="center" mt={10}>
      <h1>Căutare orașe</h1>
      <VStack spacing={4} mt={4}>
        <Input placeholder="Căutare orașe..." size="lg" />
        <Button colorScheme="teal" size="lg">
          Căutare
        </Button>
      </VStack>
      <Link href="/favorites" passHref>
        <Button colorScheme="teal" size="lg" mt={6}>
          Vezi favoritele
        </Button>
      </Link>
    </Box>
  );
}
