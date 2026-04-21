import Head from 'next/head';
import Link from 'next/link';
import CarCard from '../components/CarCard';
import { fetchStock } from '../lib/autotrader';

const SERVICES = [
  { title: 'HPI Checked', body: 'Every vehicle carries a full HPI certificate — no hidden history.' },
  { title: 'Finance Available', body: 'Competitive HP and PCP packages to suit your budget.' },
  { title: 'Part Exchange', body: 'We accept part exchanges — get a valuation when you enquire.' },
  { title: 'Fully Prepared', body: 'Each car is serviced and inspected before it goes on sale.' },
  { title: 'Warranty Options', body: 'Extended warranty packages available on selected vehicles.' },
  { title: 'Test Drives', body: 'Book a test drive by appointment — call or drop us a message.' },
];

export default function HomePage({ featuredCars }) {
  return (
    <>
      <Head>
        <title>TG Performance Cars – Quality Performance &amp; Prestige Vehicles</title>
        <meta name="description" content="Browse quality performance and prestige cars in Flitwick, Bedfordshire. Live stock, finance available, part exchange welcome." />
      </Head>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(145deg, #080808 0%, #120e00 60%, #0a0a0a 100%)',
        padding: '6rem 0 5rem',
        textAlign: 'center',
        borderBottom: '1px solid #1e1e1e',
      }}>
        <div className="container">
          <p style={{ color: '#C9A84C', fontWeight: 700, marginBottom: '1.25rem', letterSpacing: '3px', textTransform: 'uppercase', fontSize: '0.8rem' }}>
            Performance &amp; Prestige Car Specialists
          </p>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.75rem)', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.05, letterSpacing: '-1px' }}>
            Find Your Perfect<br />
            <span style={{ color: '#C9A84C' }}>Performance Car</span>
          </h1>
          <p style={{ color: '#999', fontSize: 'clamp(1rem, 2vw, 1.2rem)', maxWidth: '520px', margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
            Hand-picked vehicles, all HPI checked and fully prepared. Based in Flitwick, Bedfordshire — serving buyers nationwide.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/stock" className="btn btn-gold" style={{ fontSize: '1rem', padding: '0.9rem 2.25rem' }}>
              Browse Stock
            </Link>
            <Link href="/contact" className="btn btn-outline" style={{ fontSize: '1rem', padding: '0.9rem 2.25rem' }}>
              Get in Touch
            </Link>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginTop: '3rem', flexWrap: 'wrap' }}>
            {['HPI Checked', 'Finance Available', 'Part Exchange', 'Nationwide Delivery'].map(b => (
              <div key={b} style={{ fontSize: '0.8rem', color: '#666', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ color: '#C9A84C', fontSize: '0.9rem' }}>✓</span> {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stock */}
      <section>
        <div className="container">
          <div className="section-header">
            <h2>Latest <span>Stock</span></h2>
            <p>Live inventory — updated directly from our AutoTrader listing</p>
          </div>

          {featuredCars.length > 0 ? (
            <>
              <div className="grid-3">
                {featuredCars.map(car => <CarCard key={car.id} car={car} />)}
              </div>
              <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
                <Link href="/stock" className="btn btn-outline">View All Stock →</Link>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem', background: '#111', borderRadius: '8px', border: '1px solid #1e1e1e' }}>
              <p style={{ color: '#555', fontSize: '1.1rem', marginBottom: '1rem' }}>New stock arriving soon.</p>
              <Link href="/contact" className="btn btn-gold">Contact Us to Enquire</Link>
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className="container">
          <div className="section-header">
            <h2>Why Choose <span>TG Performance</span></h2>
            <p>We do things properly — here's why buyers come back</p>
          </div>
          <div className="grid-3">
            {SERVICES.map(({ title, body }) => (
              <div key={title} style={{ background: '#141414', border: '1px solid #1e1e1e', borderRadius: '8px', padding: '1.75rem' }}>
                <div style={{ color: '#C9A84C', fontSize: '1.3rem', marginBottom: '0.75rem' }}>✦</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.6rem' }}>{title}</h3>
                <p style={{ color: '#777', fontSize: '0.9rem', lineHeight: 1.7 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Finance Banner */}
      <section>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #14100a 0%, #1a1400 100%)',
            border: '1px solid rgba(201,168,76,0.2)',
            borderRadius: '12px',
            padding: '3rem 2rem',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            alignItems: 'center',
            gap: '2rem',
          }}>
            <div>
              <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', marginBottom: '0.75rem' }}>
                Finance Your Next Car
              </h2>
              <p style={{ color: '#888', maxWidth: '480px', lineHeight: 1.7 }}>
                Spread the cost with competitive HP or PCP finance. Subject to status. Written quotations available on request.
              </p>
            </div>
            <Link href="/finance" className="btn btn-gold" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>
              Explore Finance
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#0d0d0d', textAlign: 'center', borderTop: '1px solid #1a1a1a' }}>
        <div className="container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', marginBottom: '1rem' }}>
            Ready to Drive Your Dream Car?
          </h2>
          <p style={{ color: '#777', marginBottom: '2rem', lineHeight: 1.7 }}>
            Call us, drop us a message, or come and see us in Flitwick. We're here to help you find the right car at the right price.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+441234567890" className="btn btn-gold">Call 01234 567 890</a>
            <Link href="/contact" className="btn btn-outline">Send an Enquiry</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  let featuredCars = [];
  try {
    if (process.env.AUTOTRADER_API_KEY) {
      const all = await fetchStock();
      featuredCars = all.slice(0, 6);
    }
  } catch (e) {
    console.error('Homepage stock fetch failed:', e.message);
  }
  return { props: { featuredCars }, revalidate: 300 };
}
