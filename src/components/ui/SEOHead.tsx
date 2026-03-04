import { Helmet } from 'react-helmet-async'

interface SEOHeadProps {
  title: string
  description: string
  canonical: string
  schema?: object
}

export function SEOHead({ title, description, canonical, schema }: SEOHeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`https://reecegroupllc.com${canonical}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://reecegroupllc.com${canonical}`} />
      <meta name="twitter:card" content="summary_large_image" />
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  )
}
