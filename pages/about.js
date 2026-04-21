import Head from 'next/head';
import Link from 'next/link';

const TEAM_VALUES = [
  { title: 'Honest & Transparent', body: 'We tell you everything we know about a car — good and bad. No hidden history, no surprises.' },
  { title: 'Quality Over Quantity', body: 'We run a focused stock of hand-picked vehicles. Every car on our forecourt has been inspected and prepared.' },
  { title: 'Long-term Relationships', body: 'Most of our business comes from repeat customers and referrals. We aim to earn your trust for life.' },
];

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Us – TG Performance Cars</title>
        <meta name="description" content="Learn about TG Performance Cars — quality performance and prestige vehicles in Flitwick, Bedfordshire." />
      </Head>

      <div className="page-hero">
        <div className="container">
          <h1>About <span>TG Performance</span></h1>
          <p>Quality performance cars in Flitwick, Bedfordshire</p>
        </div>
      </div>

      <section>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', marginBottom: '1.25rem', lineHeight: 1.2 }}>
                A Dealership Built on <span style={{ color: '#C9A84C' }}>Trust</span>
              </h2>
              <p style={{ color: '#888', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                TG Performance Cars was founded with a simple goal: to make buying a quality used car a straightforward, honest experience. We specialise in performance and prestige vehicles, sourcing stock that we'd be proud to own ourselves.
              </p>
              <p style={{ color: '#888', lineHeight: 1.85, marginBottom: '1.25rem' }}>
                Based in Flitwick, Bedfordshire, we serve buyers from across the UK. Every car we sell is HPI checked, professionally prepared, and sold with full transparency — no hidden fees, no pressure.
              </p>
              <p style={{ color: '#888', lineHeight: 1.85 }}>
                We're passionate about cars, and it shows in the quality of our stock and the service we deliver.
              </p>
            </div>
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '12px', padding: '2.5rem', textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#C9A84C', lineHeight: 1 }}>100%</div>
              <div style={{ color: '#777', marginTop: '0.5rem', fontSize: '0.9rem' }}>HPI Checked Stock</div>
              <div style={{ height: '1px', background: '#1e1e1e', margin: '1.5rem 0' }} />
              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#C9A84C', lineHeight: 1 }}>★★★★★</div>
              <div style={{ color: '#777', marginTop: '0.5rem', fontSize: '0.9rem' }}>Customer Satisfaction</div>
              <div style={{ height: '1px', background: '#1e1e1e', margin: '1.5rem 0' }} />
              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#C9A84C', lineHeight: 1 }}>FCA</div>
              <div style={{ color: '#777', marginTop: '0.5rem', fontSize: '0.9rem' }}>Authorised Credit Broker</div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className="container">
          <div className="section-header">
            <h2>Our <span>Values</span></h2>
          </div>
          <div className="grid-3">
            {TEAM_VALUES.map(({ title, body }) => (
              <div key={title} style={{ background: '#141414', border: '1px solid #1e1e1e', borderRadius: '8px', padding: '1.75rem' }}>
                <div style={{ color: '#C9A84C', fontSize: '1.3rem', marginBottom: '0.75rem' }}>✦</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.6rem' }}>{title}</h3>
                <p style={{ color: '#777', fontSize: '0.9rem', lineHeight: 1.7 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '560px' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Come and See Us</h2>
          <p style={{ color: '#777', marginBottom: '2rem', lineHeight: 1.7 }}>
            We'd love to show you our current stock in person. Call ahead to book a test drive or just pop in during opening hours.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/stock" className="btn btn-gold">Browse Our Stock</Link>
            <Link href="/contact" className="btn btn-outline">Get in Touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}
