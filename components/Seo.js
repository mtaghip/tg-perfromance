import Head from 'next/head';
import { useRouter } from 'next/router';

const SITE = 'https://www.tgperformancecars.co.uk';
const SITE_NAME = 'TG Performance Cars';
const DEFAULT_DESC = 'Quality performance and prestige cars in Flitwick, Bedfordshire. All HPI checked. Finance available. Part exchange welcome.';

export default function Seo({ title, description = DEFAULT_DESC, ogImage, ogType = 'website', noIndex = false, jsonLd }) {
  const { asPath } = useRouter();
  const canonical = `${SITE}${(asPath || '/').split('?')[0]}`;
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} – Performance & Prestige Car Specialists, Bedfordshire`;
  const image = ogImage || `${SITE}/og-image.jpg`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={ogType} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD structured data */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
}
