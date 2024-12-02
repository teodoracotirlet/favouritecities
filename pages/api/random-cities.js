import { prisma } from '../../lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const randomCities = await prisma.city.findMany({
        take: 5, // Selectează 5 orașe
        orderBy: {
          createdAt: 'desc', // Sau randomizare după preferință
        },
      });
      res.status(200).json(randomCities);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching random cities' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}
