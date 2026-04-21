import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/stock', label: 'Our Stock' },
  { href: '/finance', label: 'Finance' },
  { href: '/sell-your-car', label: 'Sell Your Car' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const { pathname } = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav style={{
        background: '#080808',
        borderBottom: '1px solid #1e1e1e',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <Link href="/" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#C9A84C', letterSpacing: '-0.5px', flexShrink: 0 }}>
            TG Performance
          </Link>

          <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0 }} className="nav-desktop">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: pathname === href ? '#C9A84C' : '#bbb',
                  transition: 'color 0.15s',
                  padding: '0.25rem 0',
                  borderBottom: pathname === href ? '2px solid #C9A84C' : '2px solid transparent',
                }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a href="tel:+441234567890" className="btn btn-gold" style={{ fontSize: '0.85rem', padding: '0.5rem 1.1rem' }} aria-label="Call us">
              01234 567 890
            </a>
            <button
              onClick={() => setOpen(v => !v)}
              className="nav-hamburger"
              style={{ display: 'none', background: 'none', border: 'none', color: '#ccc', fontSize: '1.4rem', cursor: 'pointer', padding: '0.25rem', lineHeight: 1 }}
              aria-label={open ? 'Close menu' : 'Open menu'}
            >
              {open ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div style={{ background: '#0e0e0e', borderBottom: '1px solid #1e1e1e', padding: '0.5rem 1.5rem 1rem' }}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              style={{
                display: 'block',
                padding: '0.75rem 0',
                borderBottom: '1px solid #1a1a1a',
                color: pathname === href ? '#C9A84C' : '#bbb',
                fontSize: '0.95rem',
                fontWeight: 500,
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 820px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </>
  );
}
