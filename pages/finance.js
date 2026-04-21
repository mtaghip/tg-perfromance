import Head from 'next/head';
import Link from 'next/link';

const FINANCE_TYPES = [
  {
    name: 'Hire Purchase (HP)',
    summary: 'Own the car outright at the end',
    how: 'Pay a deposit, then fixed monthly payments over an agreed term (typically 12–60 months). You own the car once the final payment is made.',
    good: ['Simple to understand', 'Own the car at the end', 'Fixed monthly payments', 'No mileage restrictions'],
  },
  {
    name: 'Personal Contract Purchase (PCP)',
    summary: 'Lower monthly payments, flexible ending',
    how: 'Pay a deposit and lower monthly payments over the term. At the end you choose: pay a final "balloon" payment to own the car, return it, or part-exchange into a new one.',
    good: ['Lower monthly costs', 'Flexible end-of-term options', 'Great if you change cars regularly'],
  },
];

const STEPS = [
  { n: '01', title: 'Choose Your Car', body: 'Browse our stock and find the vehicle you want.' },
  { n: '02', title: 'Get a Quote', body: "Tell us your deposit amount and preferred term. We'll find you the best deal." },
  { n: '03', title: 'Credit Check', body: "A quick soft search first — won't affect your credit score." },
  { n: '04', title: 'Drive Away', body: 'Sign the agreement and collect your car.' },
];

export default function FinancePage() {
  return (
    <>
      <Head>
        <title>Finance – TG Performance Cars</title>
        <meta name="description" content="Spread the cost of your next performance car with competitive HP or PCP finance from TG Performance Cars, Flitwick." />
      </Head>

      <div className="page-hero">
        <div className="container">
          <h1>Car <span>Finance</span></h1>
          <p>Spread the cost — competitive HP &amp; PCP packages available</p>
        </div>
      </div>

      {/* Intro */}
      <section>
        <div className="container" style={{ maxWidth: '700px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Drive the Car You Want, <span style={{ color: '#C9A84C' }}>Today</span></h2>
          <p style={{ color: '#888', lineHeight: 1.85, fontSize: '1.05rem' }}>
            We work with a panel of trusted lenders to offer competitive finance rates on our stock. Whether you're looking for the lowest monthly payment or want to own the car outright, we'll find a deal that works for you.
          </p>
          <p style={{ color: '#555', fontSize: '0.85rem', marginTop: '1rem' }}>
            Finance is subject to status. Written quotations are available on request. TG Performance Cars is authorised and regulated by the FCA for credit broking activities.
          </p>
        </div>
      </section>

      {/* Finance types */}
      <section style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className="container">
          <div className="section-header">
            <h2>Finance <span>Options</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {FINANCE_TYPES.map(({ name, summary, how, good }) => (
              <div key={name} style={{ background: '#141414', border: '1px solid #1e1e1e', borderRadius: '8px', padding: '2rem' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.25rem' }}>{name}</h3>
                <p style={{ color: '#C9A84C', fontSize: '0.875rem', marginBottom: '1.25rem' }}>{summary}</p>
                <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>{how}</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {good.map(g => (
                    <li key={g} style={{ fontSize: '0.875rem', color: '#bbb', display: 'flex', gap: '0.5rem' }}>
                      <span style={{ color: '#C9A84C', flexShrink: 0 }}>✓</span> {g}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section>
        <div className="container">
          <div className="section-header">
            <h2>How It <span>Works</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {STEPS.map(({ n, title, body }) => (
              <div key={n} style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'rgba(201,168,76,0.25)', marginBottom: '0.75rem' }}>{n}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ color: '#777', fontSize: '0.875rem', lineHeight: 1.7 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#0d0d0d', textAlign: 'center', borderTop: '1px solid #1a1a1a' }}>
        <div className="container" style={{ maxWidth: '540px' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Get a Finance Quote</h2>
          <p style={{ color: '#777', marginBottom: '2rem', lineHeight: 1.7 }}>
            Pick a car from our stock and we'll put together a personalised finance quote — no obligation, no hard credit search to start.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/stock" className="btn btn-gold">Browse Stock</Link>
            <Link href="/contact" className="btn btn-outline">Talk to Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
