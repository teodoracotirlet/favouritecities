import { getDatabaseConnection } from '../../utils/database';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { city } = req.body;

    try {
      const db = await getDatabaseConnection();
      await db.run('INSERT INTO favorites (name, latitude, longitude) VALUES (?, ?, ?)', [
        city.name,
        city.latitude,
        city.longitude,
      ]);
      res.status(200).json({ message: 'Oraș salvat cu succes' });
    } catch (error) {
      res.status(500).json({ error: 'Eroare la salvarea orașului' });
    }
  } else {
    res.status(405).json({ error: 'Metodă neacceptată' });
  }
}
