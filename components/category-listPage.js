'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getTimeAgo } from '../utils/timeUtils';

export const CategoryListPage = ({ posts = [] }) => {
  // Helper function to get post URL
  const getPostUrl = (post) => {
    const categorySlug = post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'news';
    return `/${categorySlug}/${post.slug}/${post.id}.html`;
  };

  // Helper function to get featured image
  const getFeaturedImage = (post) => {
    return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder-image.jpg';
  };

  return (
    <>
      {posts.map((post) => (
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
      ))}
    </>
  );
};
