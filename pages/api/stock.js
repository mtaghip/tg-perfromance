import { fetchStock } from '../../lib/autotrader';

let cache = { data: null, at: 0 };
const TTL = 5 * 60 * 1000;

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  if (!process.env.AUTOTRADER_API_KEY) {
    return res.status(200).json([]);
  }

  try {
    if (!cache.data || Date.now() - cache.at > TTL) {
      cache = { data: await fetchStock(), at: Date.now() };
    }

    const { make, fuel, maxPrice, minPrice, q } = req.query;
    let results = cache.data;

    if (make) results = results.filter(c => c.make.toLowerCase() === make.toLowerCase());
    if (fuel) results = results.filter(c => c.fuel.toLowerCase() === fuel.toLowerCase());
    if (minPrice) results = results.filter(c => c.price != null && c.price >= Number(minPrice));
    if (maxPrice) results = results.filter(c => c.price != null && c.price <= Number(maxPrice));
    if (q) {
      const term = q.toLowerCase();
      results = results.filter(c =>
        `${c.make} ${c.model} ${c.year} ${c.colour} ${c.fuel}`.toLowerCase().includes(term)
      );
    }

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.status(200).json(results);
  } catch (err) {
    console.error('Stock API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch stock' });
  }
}
