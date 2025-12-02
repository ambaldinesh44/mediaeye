'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Comments } from './Comments';
import { SocialShare } from './SocialShare';
import { RelatedPosts } from './RelatedPosts';
import '../style/home.css';

export const ViewPage = ({ post, url, relatedPosts }) => {

  // Helper function to get featured image
  const getFeaturedImage = (post) => {
    return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder-image.jpg';
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Helper function to get post URL
  const getPostUrl = (post) => {
    const categorySlug = post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'news';
    return `/${categorySlug}/${post.slug}/${post.id}.html`;
  };

  // Get category name
  const categoryName = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'News';
  const categorySlug = post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'news';

  // Get tags
  const tags = post._embedded?.['wp:term']?.[1] || [];

  // Get author information
  const authorName = post._embedded?.author?.[0]?.name || 'MediaEye News';
  const authorUrl = post._embedded?.author?.[0]?.link || 'https://www.mediaeyenews.com';

  // Clean title and excerpt for structured data
  const cleanTitle = post.title.rendered?.replace(/<[^>]*>/g, '') || '';
  const cleanExcerpt = post.excerpt?.rendered?.replace(/<[^>]*>/g, '') || '';

  // Clean content by removing empty paragraph tags
  const cleanContent = (content) => {
    if (!content) return '';
    return content
      .replace(/<p>&nbsp;<\/p>/gi, '') // Remove <p>&nbsp;</p>
      .replace(/<p>\s*<\/p>/gi, '') // Remove empty <p></p>
      .replace(/(<p>&nbsp;<\/p>\s*){2,}/gi, '') // Remove multiple consecutive empty paragraphs
      .trim();
  };

  const cleanedPostContent = cleanContent(post.content.rendered);

  // JSON-LD structured data for article
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": cleanTitle,
    "description": cleanExcerpt,
    "image": getFeaturedImage(post),
    "datePublished": post.date,
    "dateModified": post.modified || post.date,
    "author": {
      "@type": "Person",
      "name": authorName,
      "url": authorUrl
    },
    "publisher": {
      "@type": "Organization",
      "name": "MediaEye News",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.mediaeyenews.com/images/logo-black.svg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "articleSection": categoryName,
    "keywords": tags.map(tag => tag.name).join(', '),
    "url": url
  };

  // Breadcrumb structured data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.mediaeyenews.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": categoryName,
        "item": `https://www.mediaeyenews.com/category/${categorySlug}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": cleanTitle
      }
    ]
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
      />

      <div className="main-wrapper">
        <div className="breadcrumb-wrapper">
          <div className="container-custom">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb custom-breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">
                    <i className="bi bi-house-door"></i> Home
                  </Link>
                </li>

                <li className="breadcrumb-item">
                  <Link href={`/category/${categorySlug}`}>{categoryName}</Link>
                </li>

                <li className="breadcrumb-item active" aria-current="page">
                  <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container-custom">
          <div className="row g-3">

            {/* LEFT */}
            <div className="col-lg-9 col-md-8 col-12">
              <div className="section-box">

                <div className="article-detailed">

                  <div className="article-detailed-content">
                    <h5 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                    <div className="news-meta">
                      <Image
                        src={post._embedded?.author?.[0]?.avatar_urls?.['48'] || '/images/default-avatar.png'}
                        alt={post._embedded?.author?.[0]?.name || 'Admin'}
                        width={24}
                        height={24}
                        className="author-avatar"
                        style={{ borderRadius: '50%', marginRight: '8px' }}
                      />
                      <i className="bi bi-clock clock-icon"></i> {formatDate(post.date)}  by  <Link href={`/author/${post._embedded?.author?.[0]?.id || '1'}`}>{post._embedded?.author?.[0]?.name || 'Admin'}</Link> 
                    </div>
                  </div>

                  <div className="article-detailed-img">
                    <Image
                      src={getFeaturedImage(post)}
                      alt={post.title.rendered?.replace(/<[^>]*>/g, '') || 'article'}
                      width={1200}
                      height={675}
                      priority
                      className="img-fluid"
                      style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '20px' }}
                    />
                  </div>

                  <div dangerouslySetInnerHTML={{ __html: cleanedPostContent }} />

                  <div className="py-4">

                    {/* TAGS + SHARE */}
                    <div className="row tag-box align-items-center">
                      <div className="col-md-8 col-12 mb-2 mb-md-0">
                        <strong>Tags :</strong>
                        {tags.map((tag) => (
                          <Link key={tag.id} href={`/tag/${tag.slug}`}>
                            <span className="tag">{tag.name}</span>
                          </Link>
                        ))}
                      </div>

                      <div className="col-md-4 col-12 d-flex justify-content-md-end justify-content-start share-icons">
                        <strong className="me-2">Share:</strong>
                        <SocialShare
                          url={url}
                          title={post.title.rendered}
                          description={post.excerpt?.rendered?.replace(/<[^>]*>/g, '') || ''}
                        />
                      </div>
                    </div>

                    {/* PREVIOUS / NEXT */}
                    <div className="nav-box">
                      <span><i className="bi bi-arrow-left"></i> Previous Post</span>
                      <span>Next Post <i className="bi bi-arrow-right"></i></span>
                    </div>

                    {/* RELATED POST */}
                    <h5 className="related-title">RELATED POST</h5>

                    {relatedPosts?.map((relatedPost) => (
                      <Link key={relatedPost.id} href={getPostUrl(relatedPost)}>
                        <div className="row related-card">

                          {/* IMAGE COL (col-4) */}
                          <div className="col-12 col-md-4">
                            <Image
                              src={getFeaturedImage(relatedPost)}
                              alt={relatedPost.title.rendered?.replace(/<[^>]*>/g, '') || 'related post'}
                              width={400}
                              height={250}
                              loading="lazy"
                              className="related-img"
                              style={{ width: '100%', height: 'auto' }}
                            />
                          </div>

                          {/* CONTENT COL (col-8) */}
                          <div className="col-12 col-md-8">
                            <div className="related-title-text" dangerouslySetInnerHTML={{ __html: relatedPost.title.rendered }} />

                            <div className="related-meta-line">
                              <div className="related-meta-left">
                                Mediaeye News - {formatDate(relatedPost.date)}
                              </div>
                              <div className="related-meta-right">
                                <i className="bi bi-chat"></i> 0
                              </div>
                            </div>

                            <div className="related-desc" dangerouslySetInnerHTML={{ __html: relatedPost.excerpt?.rendered || '' }} />
                          </div>

                        </div>
                      </Link>
                    ))}

                    <hr className="mt-4" />

                    {/* COMMENT SECTION */}
                    <h3 className="comment-title mt-4">Leave a comment</h3>
                    <p className="comment-note">Your email address will not be published. Required fields are marked *</p>

                    <Comments postId={post.id} />

                  </div>

                </div>

              </div>
            </div>

            {/* RIGHT */}
            <div className="col-lg-3 col-md-4 col-12">

              <div className="section-box ad-box">
                <Image
                  src="/images/add2.png"
                  alt="Advertisement"
                  width={300}
                  height={600}
                  loading="lazy"
                  className="img-fluid"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>

            </div>

          </div>
        </div>

      </div>
    </>
  )
}
