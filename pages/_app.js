// pages/_app.js
import { ChakraProvider, Box, Button } from '@chakra-ui/react'
import Link from 'next/link'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Box p={4} bg="teal.500" color="white" mb={4}>
        <nav>
          <Link href="/" passHref>
            <Button colorScheme="teal" mr={4}>
              Acasă
            </Button>
          </Link>
          <Link href="/search" passHref>
            <Button colorScheme="teal" mr={4}>
              Căutare
            </Button>
          </Link>
          <Link href="/favorites" passHref>
            <Button colorScheme="teal">
              Favorite
            </Button>
          </Link>
        </nav>
      </Box>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
