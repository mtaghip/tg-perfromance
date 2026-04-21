import Link from 'next/link';
import Image from 'next/image';

export default function CarCard({ car }) {
  const { id, make, model, year, price, mileage, fuel, transmission, images } = car;
  const thumb = images?.[0];

  return (
    <Link
      href={`/stock/${id}`}
      style={{
        display: 'block',
        background: '#111',
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid #222',
        transition: 'border-color 0.2s, transform 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = '#C9A84C'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = '#222'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div style={{ position: 'relative', height: '210px', background: '#1a1a1a' }}>
        {thumb ? (
          <Image
            src={thumb}
            alt={`${year} ${make} ${model}`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '2rem' }}>
            🚗
          </div>
        )}
      </div>

      <div style={{ padding: '1.25rem' }}>
        <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '0.2rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{year}</p>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.85rem', color: '#f0f0f0' }}>
          {make} {model}
        </h3>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          {fuel && <span className="badge badge-grey">{fuel}</span>}
          {transmission && <span className="badge badge-grey">{transmission}</span>}
          {mileage != null && <span className="badge badge-grey">{Number(mileage).toLocaleString()} mi</span>}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#C9A84C' }}>
            {price != null ? `£${Number(price).toLocaleString()}` : 'POA'}
          </span>
          <span style={{ fontSize: '0.82rem', color: '#C9A84C', fontWeight: 600 }}>View →</span>
        </div>
      </div>
    </Link>
  );
}
