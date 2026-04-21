import { useState, useEffect, useCallback } from 'react';
import Seo from '../../components/Seo';
import CarCard from '../../components/CarCard';

const FUEL_TYPES = ['Petrol', 'Diesel', 'Hybrid', 'Electric'];
const PRICE_OPTIONS = [10000, 15000, 20000, 30000, 50000, 75000, 100000];

function SkeletonCard() {
  return (
    <div style={{ borderRadius: '8px', overflow: 'hidden', border: '1px solid #1e1e1e', background: '#111' }}>
      <div className="skeleton" style={{ height: '210px' }} />
      <div style={{ padding: '1.25rem' }}>
        <div className="skeleton" style={{ height: '11px', width: '35%', marginBottom: '0.5rem' }} />
        <div className="skeleton" style={{ height: '18px', width: '65%', marginBottom: '1rem' }} />
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem' }}>
          <div className="skeleton" style={{ height: '22px', width: '58px', borderRadius: '100px' }} />
          <div className="skeleton" style={{ height: '22px', width: '72px', borderRadius: '100px' }} />
          <div className="skeleton" style={{ height: '22px', width: '64px', borderRadius: '100px' }} />
        </div>
        <div className="skeleton" style={{ height: '22px', width: '45%' }} />
      </div>
    </div>
  );
}

export default function StockPage() {
  const [cars, setCars] = useState([]);
  const [makes, setMakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ make: '', fuel: '', maxPrice: '', q: '' });

  const loadStock = useCallback(async (f) => {
    setLoading(true);
    try {
      const params = new URLSearchParams(
        Object.fromEntries(Object.entries(f).filter(([, v]) => v !== ''))
      );
      const res = await fetch(`/api/stock?${params}`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : [];
      setCars(list);
      if (!makes.length && list.length) {
        setMakes([...new Set(list.map(c => c.make).filter(Boolean))].sort());
      }
    } catch {
      setCars([]);
    }
    setLoading(false);
  }, [makes.length]);

  useEffect(() => { loadStock(filters); }, []);

  function setFilter(key, value) {
    const next = { ...filters, [key]: value };
    setFilters(next);
    loadStock(next);
  }

  function clearFilters() {
    const reset = { make: '', fuel: '', maxPrice: '', q: '' };
    setFilters(reset);
    loadStock(reset);
  }

  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <>
      <Seo
        title="Used Performance Cars for Sale"
        description="Browse our full stock of used performance and prestige cars in Bedfordshire. Filter by make, fuel type and price. Finance available. HPI checked."
      />

      <div className="page-hero">
        <div className="container">
          <h1>Our <span>Stock</span></h1>
          <p>Live inventory — updated automatically from AutoTrader</p>
        </div>
      </div>

      <div className="container" style={{ padding: '2rem 1.5rem' }}>
        {/* Filters */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
          padding: '1.25rem 1.5rem',
          background: '#111',
          borderRadius: '8px',
          border: '1px solid #1e1e1e',
          alignItems: 'flex-end',
        }}>
          <div style={{ flex: '1', minWidth: '140px' }}>
            <label>Make</label>
            <select value={filters.make} onChange={e => setFilter('make', e.target.value)}>
              <option value="">All Makes</option>
              {makes.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
          </div>
          <div style={{ flex: '1', minWidth: '140px' }}>
            <label>Fuel Type</label>
            <select value={filters.fuel} onChange={e => setFilter('fuel', e.target.value)}>
              <option value="">All Fuels</option>
              {FUEL_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <div style={{ flex: '1', minWidth: '140px' }}>
            <label>Max Price</label>
            <select value={filters.maxPrice} onChange={e => setFilter('maxPrice', e.target.value)}>
              <option value="">Any Price</option>
              {PRICE_OPTIONS.map(p => (
                <option key={p} value={p}>Up to £{p.toLocaleString()}</option>
              ))}
            </select>
          </div>
          <div style={{ flex: '2', minWidth: '180px' }}>
            <label>Search</label>
            <input
              type="text"
              placeholder="Make, model, colour..."
              value={filters.q}
              onChange={e => setFilter('q', e.target.value)}
            />
          </div>
          {hasFilters && (
            <button onClick={clearFilters} className="btn btn-dark" style={{ padding: '0.75rem 1.25rem', fontSize: '0.85rem', flexShrink: 0 }}>
              Clear
            </button>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid-3">
            {Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : cars.length > 0 ? (
          <>
            <p style={{ color: '#666', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
              {cars.length} vehicle{cars.length !== 1 ? 's' : ''} found
            </p>
            <div className="grid-3">
              {cars.map(car => <CarCard key={car.id} car={car} />)}
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '5rem', background: '#111', borderRadius: '8px', border: '1px solid #1e1e1e' }}>
            <p style={{ color: '#555', marginBottom: '1.25rem' }}>
              {hasFilters ? 'No vehicles match your filters.' : 'No stock available right now — please check back soon.'}
            </p>
            {hasFilters && (
              <button className="btn btn-outline" onClick={clearFilters}>Clear Filters</button>
            )}
          </div>
        )}
      </div>
    </>
  );
}
