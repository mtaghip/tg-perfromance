import { fetchStock } from '../../lib/autotrader';

const SITE = 'https://www.tgperformancecars.co.uk';

let feedCache = { xml: null, at: 0 };
const TTL = 60 * 60 * 1000; // 1 hour

function esc(val) {
  if (val == null) return '';
  return String(val)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildFeed(cars) {
  const items = cars.map(car => {
    const title = esc(`${car.year} ${car.make} ${car.model}`.trim());
    const desc = esc(
      (car.description || `${car.year} ${car.make} ${car.model}. ${car.fuel || ''} ${car.transmission || ''}. ${car.mileage != null ? Number(car.mileage).toLocaleString() + ' miles.' : ''}`)
        .trim()
        .slice(0, 5000)
    );
    const link = `${SITE}/stock/${esc(car.id)}`;
    const img = car.images?.[0] ? esc(car.images[0]) : null;
    const additionalImgs = (car.images || []).slice(1, 10).map(i => `\n      <g:additional_image_link>${esc(i)}</g:additional_image_link>`).join('');
    const price = car.price != null ? `${Number(car.price).toFixed(2)} GBP` : '0.00 GBP';

    return `
    <item>
      <g:id>${esc(car.id)}</g:id>
      <g:title>${title}</g:title>
      <g:description>${desc}</g:description>
      <g:link>${link}</g:link>
      ${img ? `<g:image_link>${img}</g:image_link>${additionalImgs}` : ''}
      <g:condition>used</g:condition>
      <g:price>${price}</g:price>
      <g:availability>in_stock</g:availability>
      <g:brand>${esc(car.make)}</g:brand>
      <g:google_product_category>916</g:google_product_category>
      <g:product_type>Used Cars &gt; ${esc(car.make)} &gt; ${esc(car.model)}</g:product_type>
      ${car.colour ? `<g:color>${esc(car.colour)}</g:color>` : ''}
      ${car.spec?.bodyType ? `<g:vehicle_body_style>${esc(car.spec.bodyType)}</g:vehicle_body_style>` : ''}
      ${car.fuel ? `<g:fuel_type>${esc(car.fuel)}</g:fuel_type>` : ''}
      ${car.transmission ? `<g:transmission>${esc(car.transmission)}</g:transmission>` : ''}
      ${car.spec?.engine ? `<g:engine>${esc(car.spec.engine)}</g:engine>` : ''}
      <g:vehicle_make>${esc(car.make)}</g:vehicle_make>
      <g:vehicle_model>${esc(car.model)}</g:vehicle_model>
      ${car.year ? `<g:vehicle_year>${esc(car.year)}</g:vehicle_year>` : ''}
      ${car.mileage != null ? `<g:mileage>${Number(car.mileage)} mi</g:mileage>` : ''}
      <g:custom_label_0>${esc(car.make)}</g:custom_label_0>
      <g:custom_label_1>${esc(car.fuel || '')}</g:custom_label_1>
      ${car.price != null ? `<g:custom_label_2>${car.price <= 10000 ? 'Under 10k' : car.price <= 20000 ? '10k-20k' : car.price <= 40000 ? '20k-40k' : 'Over 40k'}</g:custom_label_2>` : ''}
    </item>`.trim();
  }).join('\n    ');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>TG Performance Cars — Used Performance Cars for Sale</title>
    <link>${SITE}</link>
    <description>Used performance and prestige cars in Flitwick, Bedfordshire. All HPI checked. Finance available.</description>
    ${items}
  </channel>
</rss>`;
}

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end();

  if (!process.env.AUTOTRADER_API_KEY) {
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    return res.status(200).send(
      `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:g="http://base.google.com/ns/1.0"><channel><title>TG Performance Cars</title><link>${SITE}</link><description>Vehicle feed</description></channel></rss>`
    );
  }

  try {
    if (!feedCache.xml || Date.now() - feedCache.at > TTL) {
      const cars = await fetchStock();
      feedCache = { xml: buildFeed(cars), at: Date.now() };
    }
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=7200');
    res.status(200).send(feedCache.xml);
  } catch (err) {
    console.error('Feed error:', err.message);
    res.status(500).send('<?xml version="1.0"?><error>Feed generation failed</error>');
  }
}
