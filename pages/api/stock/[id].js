import { fetchVehicle } from '../../../lib/autotrader';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  if (!process.env.AUTOTRADER_API_KEY) {
    return res.status(404).json({ error: 'Vehicle not found' });
  }

  const { id } = req.query;
  try {
    const vehicle = await fetchVehicle(id);
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    res.status(200).json(vehicle);
  } catch (err) {
    console.error('Vehicle fetch error:', err.message);
    res.status(404).json({ error: 'Vehicle not found' });
  }
}
