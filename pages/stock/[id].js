import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { fetchVehicle, fetchStock } from '../../lib/autotrader';

const SPEC_LABELS = [
  ['make', 'Make'],
  ['model', 'Model'],
  ['year', 'Year'],
  ['colour', 'Colour'],
  ['fuel', 'Fuel Type'],
  ['transmission', 'Transmission'],
  ['spec.bodyType', 'Body Type'],
  ['spec.engine', 'Engine'],
  ['spec.doors', 'Doors'],
  ['spec.drivetrain', 'Drivetrain'],
  ['spec.reg', 'Registration'],
  ['spec.owners', 'Previous Owners'],
  ['spec.serviceHistory', 'Service History'],
  ['spec.co2', 'CO₂ (g/km)'],
  ['spec.mpg', 'MPG (combined)'],
];

function getVal(car, path) {
  return path.split('.').reduce((o, k) => (o != null ? o[k] : undefined), car);
}

function EnquiryForm({ car }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          vehicleId: car.id,
          vehicleName: `${car.year} ${car.make} ${car.model}`,
        }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', color: '#C9A84C' }}>
        <p style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Thank you!</p>
        <p style={{ color: '#777', fontSize: '0.9rem' }}>We'll be in touch shortly.</p>
      </div>
    );
  }

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <form onSubmit={handleSubmit}>
      {status === 'error' && (
        <p style={{ color: '#e05c5c', fontSize: '0.85rem', marginBottom: '1rem' }}>
          Something went wrong. Please call us directly.
        </p>
      )}
      <div className="form-group">
        <label>Your Name *</label>
        <input required value={form.name} onChange={set('name')} placeholder="John Smith" />
      </div>
      <div className="form-group">
        <label>Email *</label>
        <input required type="email" value={form.email} onChange={set('email')} placeholder="john@example.com" />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input type="tel" value={form.phone} onChange={set('phone')} placeholder="07700 900000" />
      </div>
      <div className="form-group">
        <label>Message</label>
        <textarea rows={3} value={form.message} onChange={set('message')} placeholder="I'm interested in this vehicle..." />
      </div>
      <button type="submit" className="btn btn-gold" style={{ width: '100%' }} disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send Enquiry'}
      </button>
    </form>
  );
}

export default function VehiclePage({ car }) {
  const [imgIdx, setImgIdx] = useState(0);

  if (!car) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 1.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Vehicle not found</h2>
        <Link href="/stock" className="btn btn-gold">Browse All Stock</Link>
      </div>
    );
  }

  const title = `${car.year} ${car.make} ${car.model}`;
  const img = car.images?.[imgIdx];
  const priceStr = car.price != null ? `£${Number(car.price).toLocaleString()}` : 'POA';

  return (
    <>
      <Head>
        <title>{title} – TG Performance Cars</title>
        <meta
          name="description"
          content={`${title} for sale at TG Performance Cars. ${priceStr}. ${car.description?.slice(0, 120) || ''}`.trim()}
        />
      </Head>

      <div className="container" style={{ padding: '1.75rem 1.5rem 3rem' }}>
        <Link href="/stock" style={{ color: '#C9A84C', fontSize: '0.875rem', display: 'inline-block', marginBottom: '1.5rem' }}>
          ← Back to Stock
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem', alignItems: 'start' }}>

          {/* Left column: images + spec */}
          <div>
            {/* Main image */}
            <div style={{ position: 'relative', height: '420px', background: '#111', borderRadius: '8px', overflow: 'hidden', marginBottom: '0.75rem', border: '1px solid #1e1e1e' }}>
              {img ? (
                <Image src={img} alt={title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 1200px) 60vw, 720px" priority />
              ) : (
                <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#333', fontSize: '3rem' }}>🚗</div>
              )}
            </div>

            {car.images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {car.images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    style={{
                      flex: '0 0 80px',
                      height: '58px',
                      background: '#111',
                      border: `2px solid ${i === imgIdx ? '#C9A84C' : 'transparent'}`,
                      borderRadius: '4px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      padding: 0,
                      position: 'relative',
                    }}
                  >
                    <Image src={src} alt="" fill style={{ objectFit: 'cover' }} sizes="80px" />
                  </button>
                ))}
              </div>
            )}

            {/* Spec table */}
            <div style={{ marginTop: '2rem', background: '#111', border: '1px solid #1e1e1e', borderRadius: '8px', overflow: 'hidden' }}>
              <h2 style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #1a1a1a', fontSize: '1rem', fontWeight: 700 }}>
                Vehicle Specification
              </h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {SPEC_LABELS.map(([path, label]) => {
                    let val = getVal(car, path);
                    if (path === 'mileage') val = car.mileage != null ? `${Number(car.mileage).toLocaleString()} miles` : null;
                    if (val === '' || val == null) return null;
                    return (
                      <tr key={path} style={{ borderBottom: '1px solid #161616' }}>
                        <td style={{ padding: '0.7rem 1.5rem', color: '#666', width: '45%', fontSize: '0.875rem' }}>{label}</td>
                        <td style={{ padding: '0.7rem 1.5rem', fontSize: '0.875rem', fontWeight: 500 }}>{String(val)}</td>
                      </tr>
                    );
                  })}
                  {car.mileage != null && (
                    <tr style={{ borderBottom: '1px solid #161616' }}>
                      <td style={{ padding: '0.7rem 1.5rem', color: '#666', width: '45%', fontSize: '0.875rem' }}>Mileage</td>
                      <td style={{ padding: '0.7rem 1.5rem', fontSize: '0.875rem', fontWeight: 500 }}>{Number(car.mileage).toLocaleString()} miles</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {car.description && (
              <div style={{ marginTop: '1.75rem' }}>
                <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Description</h2>
                <p style={{ color: '#888', lineHeight: 1.85, whiteSpace: 'pre-wrap', fontSize: '0.925rem' }}>{car.description}</p>
              </div>
            )}
          </div>

          {/* Right column: price + enquiry */}
          <div style={{ position: 'sticky', top: '80px' }}>
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '8px', padding: '1.75rem', marginBottom: '1rem' }}>
              <p style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>{car.year}</p>
              <h1 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.75rem' }}>{car.make} {car.model}</h1>
              <div style={{ fontSize: '2.25rem', fontWeight: 900, color: '#C9A84C', marginBottom: '0.5rem', letterSpacing: '-1px' }}>
                {priceStr}
              </div>
              {car.mileage != null && (
                <p style={{ color: '#777', fontSize: '0.875rem', marginBottom: '0.25rem' }}>
                  {Number(car.mileage).toLocaleString()} miles
                </p>
              )}
              {car.fuel && <p style={{ color: '#777', fontSize: '0.875rem' }}>{car.fuel} · {car.transmission}</p>}

              <a href="tel:+441234567890" className="btn btn-gold" style={{ display: 'block', textAlign: 'center', marginTop: '1.5rem', width: '100%' }}>
                Call 01234 567 890
              </a>
              <Link href="/finance" className="btn btn-outline" style={{ display: 'block', textAlign: 'center', marginTop: '0.6rem', width: '100%' }}>
                Explore Finance
              </Link>
            </div>

            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '8px', padding: '1.75rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem' }}>Enquire About This Car</h2>
              <EnquiryForm car={car} />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 900px) {
          div[style*="grid-template-columns: 1fr 380px"] {
            grid-template-columns: 1fr !important;
          }
          div[style*="position: sticky"] {
            position: static !important;
          }
        }
      `}</style>
    </>
  );
}

export async function getStaticPaths() {
  if (!process.env.AUTOTRADER_API_KEY) {
    return { paths: [], fallback: 'blocking' };
  }
  try {
    const cars = await fetchStock();
    return {
      paths: cars.map(c => ({ params: { id: String(c.id) } })),
      fallback: 'blocking',
    };
  } catch {
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  if (!process.env.AUTOTRADER_API_KEY) {
    return { notFound: true };
  }
  try {
    const car = await fetchVehicle(params.id);
    return { props: { car }, revalidate: 300 };
  } catch {
    return { notFound: true };
  }
}
