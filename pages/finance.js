import { useState, useMemo } from 'react';
import Link from 'next/link';
import Seo from '../components/Seo';

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
    how: "Pay a deposit and lower monthly payments over the term. At the end you choose: pay a final 'balloon' payment to own the car, return it, or part-exchange into a new one.",
    good: ['Lower monthly costs', 'Flexible end-of-term options', 'Great if you change cars regularly'],
  },
];

const STEPS = [
  { n: '01', title: 'Choose Your Car', body: 'Browse our stock and find the vehicle you want.' },
  { n: '02', title: 'Get a Quote', body: "Tell us your deposit and preferred term. We'll find you the best deal." },
  { n: '03', title: 'Credit Check', body: "A quick soft search first — won't affect your credit score." },
  { n: '04', title: 'Drive Away', body: 'Sign the agreement and collect your car.' },
];

const REPRESENTATIVE_APR = 13.4;

function calcMonthly(price, deposit, termMonths, apr) {
  const principal = Math.max(0, price - deposit);
  if (principal === 0) return 0;
  const r = apr / 100 / 12;
  if (r === 0) return principal / termMonths;
  return principal * (r * Math.pow(1 + r, termMonths)) / (Math.pow(1 + r, termMonths) - 1);
}

function FinanceCalc() {
  const [price, setPrice] = useState(25000);
  const [deposit, setDeposit] = useState(2500);
  const [term, setTerm] = useState(48);

  const safeDeposit = Math.min(deposit, price * 0.5);
  const monthly = useMemo(() => calcMonthly(price, safeDeposit, term, REPRESENTATIVE_APR), [price, safeDeposit, term]);
  const totalCredit = price - safeDeposit;
  const totalRepayable = monthly * term + safeDeposit;
  const totalInterest = totalRepayable - price;

  const fmt = (n) => `£${Math.round(n).toLocaleString()}`;
  const fmtM = (n) => `£${n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;

  return (
    <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '8px', padding: '2rem', maxWidth: '640px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>Finance Calculator</h2>
      <p style={{ color: '#666', fontSize: '0.82rem', marginBottom: '2rem' }}>
        Representative example at {REPRESENTATIVE_APR}% APR. Subject to status.
      </p>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {/* Vehicle price */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label style={{ textTransform: 'none', fontSize: '0.875rem', color: '#aaa' }}>Vehicle Price</label>
            <span style={{ color: '#C9A84C', fontWeight: 700, fontSize: '0.95rem' }}>{fmt(price)}</span>
          </div>
          <input type="range" min="3000" max="150000" step="500" value={price}
            onChange={e => { setPrice(Number(e.target.value)); if (deposit > Number(e.target.value) * 0.5) setDeposit(Math.floor(Number(e.target.value) * 0.5)); }}
            style={{ width: '100%' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem', fontSize: '0.75rem', color: '#444' }}>
            <span>£3,000</span><span>£150,000</span>
          </div>
        </div>

        {/* Deposit */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label style={{ textTransform: 'none', fontSize: '0.875rem', color: '#aaa' }}>Deposit</label>
            <span style={{ color: '#C9A84C', fontWeight: 700, fontSize: '0.95rem' }}>{fmt(safeDeposit)}</span>
          </div>
          <input type="range" min="0" max={Math.floor(price * 0.5)} step="250" value={safeDeposit}
            onChange={e => setDeposit(Number(e.target.value))}
            style={{ width: '100%' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem', fontSize: '0.75rem', color: '#444' }}>
            <span>£0</span><span>{fmt(price * 0.5)}</span>
          </div>
        </div>

        {/* Term */}
        <div>
          <label style={{ textTransform: 'none', fontSize: '0.875rem', color: '#aaa', marginBottom: '0.5rem', display: 'block' }}>Finance Term</label>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {[12, 24, 36, 48, 60].map(t => (
              <button key={t} onClick={() => setTerm(t)} style={{
                padding: '0.5rem 1rem', borderRadius: '4px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer',
                background: term === t ? '#C9A84C' : '#1e1e1e',
                color: term === t ? '#000' : '#777',
                border: `1px solid ${term === t ? '#C9A84C' : '#2a2a2a'}`,
                transition: 'all 0.15s',
              }}>
                {t}m
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Result */}
      <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '8px' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
          <p style={{ color: '#888', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.3rem' }}>Monthly Payment</p>
          <p style={{ fontSize: '2.5rem', fontWeight: 900, color: '#C9A84C', letterSpacing: '-1px' }}>{fmtM(monthly)}</p>
          <p style={{ color: '#555', fontSize: '0.78rem' }}>per month for {term} months</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', fontSize: '0.82rem', textAlign: 'center', borderTop: '1px solid rgba(201,168,76,0.1)', paddingTop: '1rem' }}>
          {[
            ['Amount of Credit', fmt(totalCredit)],
            ['Total Interest', fmt(totalInterest)],
            ['Total Repayable', fmt(totalRepayable)],
          ].map(([label, val]) => (
            <div key={label}>
              <p style={{ color: '#555', marginBottom: '0.2rem' }}>{label}</p>
              <p style={{ fontWeight: 700, color: '#ccc' }}>{val}</p>
            </div>
          ))}
        </div>
      </div>

      <p style={{ color: '#444', fontSize: '0.75rem', marginTop: '1rem', lineHeight: 1.6 }}>
        This is an illustration only. Actual rates depend on your credit score and vehicle. Written quotations available on request. TG Performance Cars is authorised and regulated by the FCA for credit broking activities.
      </p>
    </div>
  );
}

export default function FinancePage() {
  return (
    <>
      <Seo
        title="Car Finance"
        description="Spread the cost of your next performance car with competitive HP or PCP finance from TG Performance Cars, Flitwick, Bedfordshire."
      />

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
          <p style={{ color: '#888', lineHeight: 1.85, fontSize: '1rem' }}>
            We work with a panel of trusted lenders to offer competitive finance rates on our stock. Whether you want the lowest monthly payment or to own the car outright, we'll find a deal that works for you.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className="container">
          <div className="section-header">
            <h2>Finance <span>Calculator</span></h2>
            <p>Estimate your monthly payments instantly</p>
          </div>
          <FinanceCalc />
        </div>
      </section>

      {/* Finance types */}
      <section>
        <div className="container">
          <div className="section-header">
            <h2>Finance <span>Options</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {FINANCE_TYPES.map(({ name, summary, how, good }) => (
              <div key={name} style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '8px', padding: '2rem' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: '0.2rem' }}>{name}</h3>
                <p style={{ color: '#C9A84C', fontSize: '0.85rem', marginBottom: '1.25rem' }}>{summary}</p>
                <p style={{ color: '#888', fontSize: '0.875rem', lineHeight: 1.75, marginBottom: '1.25rem' }}>{how}</p>
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
      <section style={{ background: '#0d0d0d', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
        <div className="container">
          <div className="section-header">
            <h2>How It <span>Works</span></h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {STEPS.map(({ n, title, body }) => (
              <div key={n} style={{ textAlign: 'center', padding: '1.5rem' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'rgba(201,168,76,0.2)', marginBottom: '0.75rem' }}>{n}</div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem' }}>{title}</h3>
                <p style={{ color: '#777', fontSize: '0.875rem', lineHeight: 1.7 }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '540px' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Get a Finance Quote</h2>
          <p style={{ color: '#777', marginBottom: '2rem', lineHeight: 1.7 }}>
            Pick a car from our stock and we'll put together a personalised quote — no obligation, no hard credit search to start.
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
