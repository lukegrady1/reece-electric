import { useParams, Link, Navigate } from 'react-router-dom'
import { SEOHead } from '../components/ui/SEOHead'
import { AnnotationLabel } from '../components/ui/AnnotationLabel'
import { CTABanner } from '../components/sections/CTABanner'
import { posts } from '../data/posts'

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = posts.find(p => p.slug === slug)

  if (!post) return <Navigate to="/blog" replace />

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.dateISO,
    author: {
      '@type': 'Organization',
      name: 'Reece Group LLC',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Reece Group LLC',
      url: 'https://reecegroupllc.com',
    },
  }

  return (
    <>
      <SEOHead
        title={post.seoTitle}
        description={post.seoDescription}
        canonical={`/blog/${post.slug}`}
        schema={articleSchema}
      />

      {/* Breadcrumb */}
      <div style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', padding: '14px 24px', marginTop: '68px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '12px', color: 'var(--color-ink-faint)' }}>
          <Link to="/" style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }}>·</span>
          <Link to="/blog" style={{ color: 'var(--color-gold)', textDecoration: 'none' }}>Blog</Link>
          <span style={{ margin: '0 8px' }}>·</span>
          <span>{post.title}</span>
        </div>
      </div>

      {/* Post header */}
      <section style={{ background: 'var(--color-primary)', padding: 'clamp(48px, 7vw, 80px) 24px' }}>
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <AnnotationLabel text={post.category} inverted />
          <h1 style={{
            fontFamily: '"Fraunces", serif',
            fontWeight: 700,
            fontSize: 'clamp(32px, 5vw, 52px)',
            color: '#F5F4F2',
            letterSpacing: '-0.02em',
            lineHeight: 1.1,
            margin: '0 0 24px',
          }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <span style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '12px', color: 'rgba(245,244,242,0.5)', letterSpacing: '0.08em' }}>
              {post.date}
            </span>
            <span style={{ width: '1px', height: '12px', background: 'rgba(245,244,242,0.2)' }} />
            <span style={{ fontFamily: '"DM Sans", system-ui, sans-serif', fontSize: '12px', color: 'rgba(245,244,242,0.5)', letterSpacing: '0.08em' }}>
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Article body */}
      <section style={{ background: 'var(--color-bg)', padding: 'clamp(48px, 7vw, 80px) 24px' }}>
        <div
          style={{ maxWidth: '760px', margin: '0 auto' }}
          className="post-body"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </section>

      <CTABanner />

      <style>{`
        .post-body h2 {
          font-family: "Fraunces", serif;
          font-weight: 700;
          font-size: clamp(22px, 3vw, 28px);
          color: var(--color-ink);
          letter-spacing: -0.02em;
          margin: 48px 0 16px;
          line-height: 1.2;
        }
        .post-body p {
          font-family: "DM Sans", system-ui, sans-serif;
          font-size: 17px;
          line-height: 1.85;
          color: var(--color-ink-mid);
          margin: 0 0 20px;
        }
        .post-body ul {
          margin: 0 0 20px;
          padding-left: 0;
          list-style: none;
        }
        .post-body ul li {
          font-family: "DM Sans", system-ui, sans-serif;
          font-size: 17px;
          line-height: 1.75;
          color: var(--color-ink-mid);
          padding: 8px 0 8px 24px;
          border-bottom: 1px solid var(--color-border);
          position: relative;
        }
        .post-body ul li::before {
          content: '▸';
          position: absolute;
          left: 0;
          color: var(--color-gold);
          font-size: 12px;
          top: 10px;
        }
        .post-body strong {
          font-weight: 600;
          color: var(--color-ink);
        }
      `}</style>
    </>
  )
}
