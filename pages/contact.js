import { useState } from 'react';
import Seo from '../components/Seo';
import { gtmEvent } from '../lib/gtm';

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
      if (res.ok) {
        gtmEvent('generate_lead', { form_type: 'contact' });
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
        title="Contact Us"
        description="Get in touch with TG Performance Cars in Flitwick, Bedfordshire. Call, WhatsApp, email, or send us a message online."
      />

      <div className="page-hero">
        <div className="container">
          <h1>Get in <span>Touch</span></h1>
          <p>We'd love to hear from you</p>
        </div>
      </div>

      <section>
        <div className="container">
          <div className="two-col">

            {/* Info column */}
            <div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.75rem' }}>Contact Information</h2>

              {[
                { label: 'Address', value: 'Flitwick, Bedfordshire, England', href: null },
                { label: 'Phone', value: '01234 567 890', href: 'tel:+441234567890' },
                { label: 'WhatsApp', value: 'Message us on WhatsApp', href: 'https://wa.me/441234567890' },
                { label: 'Email', value: 'info@tgperformancecars.co.uk', href: 'mailto:info@tgperformancecars.co.uk' },
              ].map(({ label, value, href }) => (
                <div key={label} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem', flexShrink: 0 }}>
                    {label === 'Address' && '📍'}
                    {label === 'Phone' && '📞'}
                    {label === 'WhatsApp' && '💬'}
                    {label === 'Email' && '✉️'}
                  </div>
                  <div>
                    <p style={{ color: '#555', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.2rem' }}>{label}</p>
                    {href ? (
                      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                        style={{ color: '#C9A84C', fontSize: '0.95rem', fontWeight: 500 }}>
                        {value}
                      </a>
                    ) : (
                      <p style={{ fontSize: '0.95rem' }}>{value}</p>
                    )}
                  </div>
                </div>
              ))}

              <div style={{ marginTop: '0.5rem', padding: '1.5rem', background: '#111', border: '1px solid #1e1e1e', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '0.82rem', fontWeight: 700, marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Opening Hours</h3>
                {[
                  ['Monday – Friday', '9:00am – 6:00pm'],
                  ['Saturday', '9:00am – 5:00pm'],
                  ['Sunday', 'By appointment'],
                ].map(([day, hours]) => (
                  <div key={day} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #1a1a1a', fontSize: '0.875rem' }}>
                    <span style={{ color: '#777' }}>{day}</span>
                    <span style={{ color: '#ccc' }}>{hours}</span>
                  </div>
                ))}
              </div>

              {/* Map */}
              <div style={{ marginTop: '1.5rem', borderRadius: '8px', overflow: 'hidden', border: '1px solid #1e1e1e' }}>
                <iframe
                  title="TG Performance Cars location — Flitwick, Bedfordshire"
                  src="https://maps.google.com/maps?q=MK45+5DJ&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="220"
                  style={{ border: 0, display: 'block', filter: 'grayscale(0.3) invert(0.85) hue-rotate(180deg)' }}
                  loading="lazy"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Form column */}
            <div style={{ background: '#111', border: '1px solid #1e1e1e', borderRadius: '8px', padding: '2rem' }}>
              <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Send an Enquiry</h2>

              {status === 'sent' ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#C9A84C' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✓</div>
                  <p style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem' }}>Message Sent!</p>
                  <p style={{ color: '#777', fontSize: '0.875rem' }}>We'll get back to you as soon as possible.</p>
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
                  <p style={{ color: '#444', fontSize: '0.75rem', marginTop: '0.75rem', textAlign: 'center' }}>
                    Or WhatsApp us at <a href="https://wa.me/441234567890" style={{ color: '#C9A84C' }}>+44 1234 567 890</a>
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
