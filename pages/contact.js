import { useState } from 'react';
import Head from 'next/head';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [status, setStatus] = useState('idle');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  }

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  return (
    <>
      <Head>
        <title>Contact – TG Performance Cars</title>
        <meta name="description" content="Get in touch with TG Performance Cars. Located in Flitwick, Bedfordshire. Call, email, or send us a message." />
      </Head>

      <div className="page-hero">
        <div className="container">
          <h1>Get in <span>Touch</span></h1>
          <p>We'd love to hear from you</p>
        </div>
      </div>

      <section>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>

            {/* Contact Info */}
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.75rem' }}>Contact Information</h2>

              {[
                { label: 'Address', value: 'Flitwick, Bedfordshire, England', icon: '📍' },
                { label: 'Phone', value: '01234 567 890', href: 'tel:+441234567890', icon: '📞' },
                { label: 'Email', value: 'info@tgperformancecars.co.uk', href: 'mailto:info@tgperformancecars.co.uk', icon: '✉️' },
              ].map(({ label, value, href, icon }) => (
                <div key={label} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '1.1rem', marginTop: '0.1rem' }}>{icon}</div>
                  <div>
                    <p style={{ color: '#666', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>{label}</p>
                    {href ? (
                      <a href={href} style={{ color: '#C9A84C', fontSize: '1rem', fontWeight: 500 }}>{value}</a>
                    ) : (
                      <p style={{ fontSize: '1rem' }}>{value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div style={{ marginTop: '2.5rem', padding: '1.5rem', background: '#111', border: '1px solid #1e1e1e', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '1rem' }}>Opening Hours</h3>
                {[
                  ['Monday – Friday', '9:00am – 6:00pm'],
                  ['Saturday', '9:00am – 5:00pm'],
                  ['Sunday', 'By appointment'],
                ].map(([day, hours]) => (
                  <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1a1a1a', fontSize: '0.875rem' }}>
                    <span style={{ color: '#888' }}>{day}</span>
                    <span>{hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enquiry Form */}
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '8px', padding: '2rem' }}>
              <h2 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Send an Enquiry</h2>

              {status === 'sent' ? (
                <div style={{ textAlign: 'center', padding: '2.5rem', color: '#C9A84C' }}>
                  <p style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Message Sent!</p>
                  <p style={{ color: '#777', fontSize: '0.9rem' }}>We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {status === 'error' && (
                    <p style={{ color: '#e05c5c', fontSize: '0.85rem', marginBottom: '1rem' }}>
                      Something went wrong. Please try calling us instead.
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
                    <label>Message *</label>
                    <textarea required rows={5} value={form.message} onChange={set('message')} placeholder="Tell us how we can help..." />
                  </div>
                  <button type="submit" className="btn btn-gold" style={{ width: '100%' }} disabled={status === 'sending'}>
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
