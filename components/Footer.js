import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#080808', borderTop: '1px solid #1e1e1e', padding: '3rem 0 1.5rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>

          <div>
            <h3 style={{ color: '#C9A84C', marginBottom: '1rem', fontSize: '1.15rem', fontWeight: 800 }}>TG Performance</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 1.9 }}>
              Quality performance and prestige cars.<br />
              Based in Flitwick, Bedfordshire.<br />
              All vehicles HPI checked &amp; prepared.
            </p>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem', fontSize: '0.8rem', color: '#777', textTransform: 'uppercase', letterSpacing: '1px' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {[
                ['/', 'Home'],
                ['/stock', 'Our Stock'],
                ['/finance', 'Finance'],
                ['/sell-your-car', 'Sell Your Car'],
                ['/about', 'About Us'],
                ['/contact', 'Contact'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} style={{ color: '#666', fontSize: '0.9rem', transition: 'color 0.15s' }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem', fontSize: '0.8rem', color: '#777', textTransform: 'uppercase', letterSpacing: '1px' }}>Contact Us</h4>
            <address style={{ fontStyle: 'normal', color: '#666', fontSize: '0.9rem', lineHeight: 2 }}>
              Flitwick, Bedfordshire<br />
              <a href="tel:+441234567890" style={{ color: '#C9A84C' }}>01234 567 890</a><br />
              <a href="mailto:info@tgperformancecars.co.uk" style={{ color: '#C9A84C' }}>info@tgperformancecars.co.uk</a>
            </address>
          </div>

          <div>
            <h4 style={{ marginBottom: '1rem', fontSize: '0.8rem', color: '#777', textTransform: 'uppercase', letterSpacing: '1px' }}>Opening Hours</h4>
            <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: 2 }}>
              Mon – Fri: 9am – 6pm<br />
              Saturday: 9am – 5pm<br />
              Sunday: By appointment
            </p>
          </div>

        </div>

        <div style={{ borderTop: '1px solid #1a1a1a', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <p style={{ color: '#444', fontSize: '0.82rem' }}>
            © {new Date().getFullYear()} TG Performance Cars. All rights reserved. Registered in England &amp; Wales.
          </p>
          <p style={{ color: '#444', fontSize: '0.82rem' }}>
            Authorised &amp; regulated by the FCA for credit broking activities.
          </p>
        </div>
      </div>
    </footer>
  );
}
