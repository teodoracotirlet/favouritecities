import axios from 'axios';

export const getLocation = async () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ latitude, longitude });
        },
        async () => {
          try {
            const response = await axios.get('https://ipinfo.io/json', {
              params: { token: 'API_KEY' }, // Înlocuiește cu cheia ta
            });
            const [latitude, longitude] = response.data.loc.split(',');
            resolve({ latitude, longitude });
          } catch (error) {
            reject('Nu s-a putut detecta locația.');
          }
        }
      );
    } else {
      reject('Geolocation API nu este suportat de browser.');
    }
  });
};
