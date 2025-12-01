'use client';

import Link from 'next/link';
import Image from 'next/image';

export const TagListPage = ({ posts = [], tagName = '' }) => {
  // Helper function to get post URL
  const getPostUrl = (post) => {
    const categorySlug = post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'news';
    return `/${categorySlug}/${post.slug}/${post.id}.html`;
  };

  // Helper function to get featured image
  const getFeaturedImage = (post) => {
    return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder-image.jpg';
  };

  // Helper function to format time ago
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const hours = Math.floor((now - date) / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => (
          <Link key={post.id} href={getPostUrl(post)}>
            <div className="news-row article-big">
              <div className="news-thumb">
                <Image
                  src={getFeaturedImage(post)}
                  alt={post.title.rendered?.replace(/<[^>]*>/g, '') || 'news article'}
                  width={400}
                  height={250}
                  loading="lazy"
                  className="img-fluid"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
              <div className="news-content">
                <h5 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <p dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || '' }} />
                <div className="news-meta">
                  <i className="bi bi-clock clock-icon"></i> {getTimeAgo(post.date)}
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <div className="alert alert-info">
          <p>No posts found for tag "{tagName}".</p>
        </div>
      )}
    </>
  );
};
