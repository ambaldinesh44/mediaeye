"use client"

import Link from 'next/link';
import { SwiperCarousel } from './SwiperCarousel';

export const HomePage = ({term='',results=[],categoryNews=[]})=>{

  // Get featured posts for carousel (first category, first 5 posts)
  const featuredPosts = categoryNews?.[0]?.posts?.slice(0, 5) || [];

  // Get recent posts for right sidebar (collect first 2 from each category)
  const recentPosts = categoryNews?.flatMap(cat => cat.posts?.slice(0, 2) || []).slice(0, 8) || [];

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
    <div className="container-fluid py-2 py-md-3 py-lg-4 px-2 px-md-3">
      <div className="row g-3 g-md-4">
        {/* Left Side - Swiper Carousel */}
        <div className="col-12 col-lg-8">
          <SwiperCarousel posts={featuredPosts} />
        </div>

        {/* Right Side - Recent Posts List */}
        <div className="col-12 col-lg-4">
          <div className="recent-posts-sidebar">
            <h4 className="mb-3 h5 h4-md">Recent Stories</h4>
            <div className="list-group">
              {recentPosts.map((post) => (
                <Link
                  key={post.id}
                  href={getPostUrl(post)}
                  className="list-group-item list-group-item-action border-0 border-bottom p-2 p-md-3"
                >
                  <div className="d-flex gap-2 gap-md-3">
                    <img
                      src={getFeaturedImage(post)}
                      alt={post.title.rendered}
                      className="recent-post-img"
                    />
                    <div className="flex-grow-1">
                      <h6
                        className="mb-1 recent-post-title"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                      <small className="text-muted d-block">
                        <i className="bi bi-clock me-1"></i>
                        {getTimeAgo(post.date)}
                      </small>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Mobile First Styles */
        .recent-post-img {
          width: 60px;
          height: 60px;
          object-fit: cover;
          border-radius: 4px;
        }

        .recent-post-title {
          font-size: 0.875rem;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .list-group-item {
          transition: background-color 0.2s;
        }

        .list-group-item:hover {
          background-color: #f8f9fa;
        }

        .recent-posts-sidebar {
          position: relative;
        }

        /* Tablet (768px and up) */
        @media (min-width: 768px) {
          .recent-post-img {
            width: 70px;
            height: 70px;
          }

          .recent-post-title {
            font-size: 0.95rem;
          }
        }

        /* Desktop (992px and up) */
        @media (min-width: 992px) {
          .recent-post-img {
            width: 80px;
            height: 80px;
          }

          .recent-post-title {
            font-size: 1rem;
          }

          .recent-posts-sidebar {
            position: sticky;
            top: 20px;
          }
        }

        /* Large Desktop (1200px and up) */
        @media (min-width: 1200px) {
          .recent-posts-sidebar {
            max-height: calc(100vh - 100px);
            overflow-y: auto;
          }

          .recent-posts-sidebar::-webkit-scrollbar {
            width: 6px;
          }

          .recent-posts-sidebar::-webkit-scrollbar-track {
            background: #f1f1f1;
          }

          .recent-posts-sidebar::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 3px;
          }

          .recent-posts-sidebar::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        }
      `}</style>
    </div>
  );

/*     const newsItems = [
  "Breaking: Market hits new high",
  "Weather: Heavy rains expected tomorrow",
  "Sports: Local team wins championship",
  "Tech: New smartphone released",
];

        return(
            <>
          <section>
      <h1>Search Results for {term}</h1>
      {results.length ? (
        <ul>
          {results.map(post => (
            <li key={post.id}>
              <a href={post.link.replace("https://www.mediaeyenews.com", "")}>
                {post.title.rendered}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}

   {categoryNews?.length ? (
    <>
     {categoryNews?.map(cat => (
      <>
    <h2>{cat?.categoryName}</h2>
        <ul>
          {cat?.posts?.map(post => (
            <li key={post.id}>
              <a href={post.link.replace("https://www.mediaeyenews.com", "")}>
                {post.title.rendered}
              </a>
            </li>
          ))}
        </ul>
           </>
        ))}

        </>
      ) : (
        <p>No results found.</p>
      )}


    </section>
            </>
        ) */
}