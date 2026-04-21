import Head from 'next/head';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <>
      <Head>
        <title>Page Not Found – TG Performance Cars</title>
      </Head>
      <div style={{ textAlign: 'center', padding: '8rem 1.5rem', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '5rem', fontWeight: 900, color: 'rgba(201,168,76,0.15)', letterSpacing: '-4px', lineHeight: 1, marginBottom: '1.5rem' }}>404</div>
        <h1 style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>Page Not Found</h1>
        <p style={{ color: '#777', marginBottom: '2.5rem', maxWidth: '380px', lineHeight: 1.7 }}>
          The page you're looking for doesn't exist. It may have been moved or the link might be wrong.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/" className="btn btn-gold">Go Home</Link>
          <Link href="/stock" className="btn btn-outline">Browse Stock</Link>
        </div>
      </div>
    </>
  );
}
