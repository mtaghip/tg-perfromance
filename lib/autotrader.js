const TOKEN_URL = 'https://api.autotrader.co.uk/oauth/access_token';
const API_BASE = 'https://api.autotrader.co.uk';

let _token = null;
let _tokenExpiry = 0;

async function getToken() {
  if (_token && Date.now() < _tokenExpiry) return _token;

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.AUTOTRADER_API_KEY,
      client_secret: process.env.AUTOTRADER_API_SECRET,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`AutoTrader token error ${res.status}: ${text}`);
  }

  const { access_token, expires_in } = await res.json();
  _token = access_token;
  _tokenExpiry = Date.now() + (expires_in - 60) * 1000;
  return _token;
}

async function apiFetch(path, retries = 1) {
  const token = await getToken();
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 429 && retries > 0) {
    await new Promise(r => setTimeout(r, 1500));
    return apiFetch(path, retries - 1);
  }

  if (!res.ok) throw new Error(`AutoTrader API ${res.status} on ${path}`);
  return res.json();
}

function normalize(v) {
  const rawImages = v.media?.images || v.images || [];
  const images = rawImages.map(i => (typeof i === 'string' ? i : i.href || i.url || i.src)).filter(Boolean);

  return {
    id: String(v.stockId || v.id || ''),
    make: v.make || '',
    model: v.model || '',
    year: v.year || v.registrationYear || '',
    price: v.price?.value ?? v.advertisedPrice?.value ?? v.price ?? null,
    mileage: v.mileage?.value ?? v.mileage ?? null,
    fuel: v.fuelType || v.fuel || '',
    transmission: v.transmission || v.gearbox || '',
    colour: v.colour || v.color || '',
    images,
    description: v.description || '',
    spec: {
      engine: v.engineCapacity || v.engine || '',
      doors: v.doors || '',
      bodyType: v.bodyType || '',
      drivetrain: v.drivetrain || '',
      co2: v.co2Emissions || '',
      mpg: v.fuelConsumption?.combined || v.mpg || '',
      reg: v.registration || v.vrm || '',
      owners: v.previousOwners ?? '',
      serviceHistory: v.serviceHistory || '',
    },
  };
}

const advertiserId = () => process.env.AUTOTRADER_ADVERTISER_ID;

export async function fetchStock() {
  const data = await apiFetch(`/stock?advertiserId=${advertiserId()}`);
  const list = data.vehicles || data.stock || data.results || (Array.isArray(data) ? data : []);
  return list.map(normalize);
}

export async function fetchVehicle(id) {
  const data = await apiFetch(`/stock/${id}?advertiserId=${advertiserId()}`);
  return normalize(data.vehicle || data);
}
