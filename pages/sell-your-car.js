import { useState } from 'react';
import Link from 'next/link';
import Seo from '../components/Seo';
import { gtmEvent } from '../lib/gtm';

const REASONS = [
  { title: 'Fast Process', body: 'Get a valuation within 24 hours. We can complete quickly if the car is right.' },
  { title: 'Fair Prices', body: 'We buy at competitive prices — no lowball offers, no time-wasting.' },
  { title: 'No Hassle', body: 'No waiting for private buyers, no test drive strangers, no listing fees.' },
  { title: 'Part Exchange', body: 'Put the value towards one of our vehicles and simplify the whole process.' },
];

export default function SellYourCarPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', reg: '', mileage: '', notes: '' });
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: `SELL MY CAR REQUEST\nReg: ${form.reg}\nMileage: ${form.mileage}\nNotes: ${form.notes}`,
        }),
      });
      if (res.ok) {
        gtmEvent('generate_lead', { form_type: 'sell_your_car', reg: form.reg });
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <>
      <Seo
        title="Sell Your Car"
        description="Get a fast, fair valuation for your car from TG Performance Cars. We buy performance and prestige vehicles in Bedfordshire. Response within 24 hours."
      />

      <div className="page-hero">
        <div className="container">
          <h1>Sell <span>Your Car</span></h1>
          <p>Fast, fair valuations — no nonsense</p>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="two-col">

            <div>
              <h2 style={{ fontSize: '1.6rem', marginBottom: '1.25rem', lineHeight: 1.2 }}>
                We Buy Performance &amp; Prestige Vehicles
              </h2>
              <p style={{ color: '#888', lineHeight: 1.85, marginBottom: '2rem', fontSize: '0.95rem' }}>
                Looking to sell your car quickly and for a fair price? Fill in the form and we'll get back to you within 24 hours with a no-obligation valuation.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {REASONS.map(({ title, body }) => (
                  <div key={title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <span style={{ color: '#C9A84C', flexShrink: 0, marginTop: '0.1rem' }}>✓</span>
                    <div>
                      <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.2rem' }}>{title}</h3>
                      <p style={{ color: '#777', fontSize: '0.875rem', lineHeight: 1.6 }}>{body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '2.5rem', padding: '1.25rem 1.5rem', background: '#111', border: '1px solid #1e1e1e', borderRadius: '8px' }}>
                <p style={{ color: '#888', fontSize: '0.875rem', lineHeight: 1.7 }}>
                  Prefer to talk? Call us on{' '}
                  <a href="tel:+441234567890" style={{ color: '#C9A84C', fontWeight: 600 }}>01234 567 890</a>{' '}
                  or{' '}
                  <a href="https://wa.me/441234567890" style={{ color: '#C9A84C', fontWeight: 600 }}>WhatsApp us</a>
                  {' '}and we'll take your details over the phone.
                </p>
              </div>
            </div>

            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '8px', padding: '2rem' }}>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>Request a Valuation</h2>

              {status === 'sent' ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#C9A84C' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✓</div>
                  <p style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.4rem' }}>Request Received!</p>
                  <p style={{ color: '#777', fontSize: '0.875rem' }}>We'll be in touch within 24 hours with your valuation.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {status === 'error' && (
                    <p style={{ color: '#e05c5c', fontSize: '0.85rem', marginBottom: '1rem' }}>
                      Something went wrong. Please call us instead.
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
                    <label>Phone *</label>
                    <input required type="tel" value={form.phone} onChange={set('phone')} placeholder="07700 900000" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label>Registration *</label>
                      <input required value={form.reg} onChange={set('reg')} placeholder="AB12 CDE" style={{ textTransform: 'uppercase' }} />
                    </div>
                    <div className="form-group">
                      <label>Mileage</label>
                      <input type="number" value={form.mileage} onChange={set('mileage')} placeholder="45000" min="0" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Additional Notes</label>
                    <textarea rows={3} value={form.notes} onChange={set('notes')} placeholder="Service history, condition, modifications..." />
                  </div>
                  <button type="submit" className="btn btn-gold" style={{ width: '100%' }} disabled={status === 'sending'}>
                    {status === 'sending' ? 'Submitting...' : 'Get My Valuation'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
