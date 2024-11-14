import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cityResults, setCityResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // API Key pentru Open Meteo (inlocuiește cu cheia ta)
  const apiKey = 'API_KEY_OPEN_METEO';  // Înlocuiește cu cheia ta

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!searchTerm) return;

    setLoading(true);
    try {
      const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search`, {
        params: {
          name: searchTerm,
          language: 'en',
          format: 'json',
          limit: 5,
        },
      });
      setCityResults(response.data.results);
    } catch (error) {
      console.error('Error fetching city data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Search for a city</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Search</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {cityResults.map((city) => (
            <li key={city.id}>
              <Link href={`/city/${city.id}`}>
                <a>
                  {city.name}, {city.country}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
