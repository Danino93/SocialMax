import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  canonicalPath?: string;
}

const SITE_NAME = 'SocialSniper';
const SITE_URL = 'https://socialsniper.co.il';
const DEFAULT_DESCRIPTION =
  'SocialSniper - הפלטפורמה הישראלית #1 לשיווק ברשתות חברתיות. קנה עוקבים, לייקים, צפיות לאינסטגרם, פייסבוק, טיקטוק, יוטיוב ועוד. מחירים נמוכים, מסירה מהירה, תמיכה בעברית.';
const DEFAULT_KEYWORDS =
  'SMM ישראל, עוקבים אינסטגרם, לייקים פייסבוק, צפיות טיקטוק, יוטיוב מנויים, שיווק רשתות חברתיות, קנה עוקבים, טלגרם מנויים';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SocialSniper',
  url: SITE_URL,
  logo: `${SITE_URL}/logo192.png`,
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: 'Hebrew',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '1247',
    bestRating: '5',
    worstRating: '1',
  },
};

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  canonicalPath = '',
}) => {
  const fullTitle = title
    ? title.includes('| SocialSniper') ? title : `${title} | ${SITE_NAME}`
    : `${SITE_NAME} - שירותי SMM לשוק הישראלי`;
  const canonical = `${SITE_URL}${canonicalPath}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#7c3aed" />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="he_IL" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {/* Hebrew RTL */}
      <html lang="he" dir="rtl" />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </Helmet>
  );
};

export default SEOHead;
