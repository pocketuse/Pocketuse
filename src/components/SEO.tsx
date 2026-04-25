import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  name?: string;
  type?: string;
  url?: string;
  image?: string;
  schemaData?: any;
}

export function SEO({ 
  title, 
  description, 
  name = "Pocketuse", 
  type = "website", 
  url = "https://pocketuse.com", 
  image = "https://pocketuse.com/og-image.jpg",
  schemaData
}: SEOProps) {
  const fullTitle = `${title} | Pocketuse - Mobile App Development Agency`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={name} />
      
      {/* Twitter tags */}
      <meta name="twitter:creator" content="@pocketuse" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (JSON-LD) */}
      {schemaData ? (
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      ) : (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Pocketuse",
            "url": "https://pocketuse.com",
            "logo": "https://pocketuse.com/icon.png",
            "description": "Premium Mobile App Development Agency specializing in Flutter, iOS, and Android.",
            "founder": {
              "@type": "Person",
              "name": "Pocketuse Founder"
            },
            "sameAs": [
              "https://twitter.com/pocketuse"
            ]
          })}
        </script>
      )}

      {/* Breadcrumb List Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": "https://pocketuse.com"
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": title,
              "item": url
            }
          ]
        })}
      </script>
    </Helmet>
  );
}
