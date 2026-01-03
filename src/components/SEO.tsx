// src/components/SEO.tsx
import { Helmet } from "react-helmet-async";

type SEOProps = {
  title: string;
  description: string;
  path?: string; // "/services"
  image?: string; // "/og/ikigai-og.jpg"
  noindex?: boolean;
};

const SITE_NAME = "The Ikigai Project";
const SITE_URL = "https://www.theikigaiproject.com";

export default function SEO({
  title,
  description,
  path = "",
  image = "/og/og-default.jpg",
  noindex = false,
}: SEOProps) {
  const url = `${SITE_URL}${path}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="canonical" href={url} />

      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${SITE_URL}${image}`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}${image}`} />
    </Helmet>
  );
}
