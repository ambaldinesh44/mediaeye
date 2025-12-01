"use client"
import "style/home.css";
import Link from 'next/link';
import dynamic from 'next/dynamic';

const SwiperCarousel = dynamic(() => import('./SwiperCarousel').then(mod => mod.SwiperCarousel), {
  ssr: false,
});

export const HomePage = ({term='',results=[],categoryNews=[]})=>{

  // Get featured posts for carousel (first category, first 5 posts)
  const featuredPosts = categoryNews?.[0]?.posts?.slice(0, 5) || [];

  // Get recent posts for right sidebar (collect first 2 from each category)
  const recentPosts = categoryNews?.flatMap(cat => cat.posts?.slice(0, 2) || []).slice(0, 8) || [];

  // Get latest news posts (all posts from all categories, limited to 10)
  const latestNewsPosts = categoryNews?.flatMap(cat => cat.posts || []).slice(0, 10) || [];

  // Get more news items for sidebar (different from latest news, limited to 4)
  const moreNewsPosts = categoryNews?.flatMap(cat => cat.posts || []).slice(10, 14) || [];

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

      {/* Latest News Section */}
      <div className="row mt-4 mt-md-5">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-3 mb-md-4">
            <h2 className="h4 h3-md mb-0">Latest News</h2>
            <Link href="/news" className="text-danger text-decoration-none fw-semibold">
              View All →
            </Link>
          </div>
        </div>

        <div className="col-12 col-lg-8">
          <div className="latest-news-list">
            {latestNewsPosts.map((post, index) => (
              <div key={post.id}>
                {index === 0 ? (
                  // First item - Large featured card
                  <Link href={getPostUrl(post)} className="text-decoration-none">
                    <div className="featured-news-card mb-3 mb-md-4">
                      <div className="position-relative">
                        <img
                          src={getFeaturedImage(post)}
                          alt={post.title.rendered}
                          className="featured-news-img"
                        />
                        <div className="featured-overlay">
                          <h3
                            className="text-white mb-2 featured-title"
                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                          />
                          <div
                            className="text-white-50 featured-excerpt"
                            dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || '' }}
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                ) : (
                  // Regular news items
                  <Link href={getPostUrl(post)} className="text-decoration-none">
                    <div className="news-item border-bottom py-3 py-md-4">
                      <div className="row g-3">
                        <div className="col-4 col-md-3">
                          <img
                            src={getFeaturedImage(post)}
                            alt={post.title.rendered}
                            className="news-item-img"
                          />
                        </div>
                        <div className="col-8 col-md-9">
                          <span className="badge bg-danger mb-2">
                            {getTimeAgo(post.date)}
                          </span>
                          <h5
                            className="news-item-title mb-2"
                            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                          />
                          <div
                            className="news-item-excerpt text-muted"
                            dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || '' }}
                          />
                          <small className="text-muted d-block mt-2">
                            <i className="bi bi-geo-alt me-1"></i>
                            {post._embedded?.['wp:term']?.[0]?.[0]?.name || 'News'}
                          </small>
                        </div>
                      </div>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right sidebar - More News */}
        <div className="col-12 col-lg-4">
          <div className="more-news-sidebar">
            <div className="d-flex align-items-center mb-3 mb-md-4">
              <span className="text-danger me-2">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                </svg>
              </span>
              <h4 className="mb-0 h5 h4-md fw-bold">More</h4>
            </div>

            <div className="more-news-list">
              {moreNewsPosts.map((post) => (
                <Link
                  key={post.id}
                  href={getPostUrl(post)}
                  className="text-decoration-none"
                >
                  <div className="more-news-item d-flex gap-3 mb-3 pb-3 border-bottom">
                    <img
                      src={getFeaturedImage(post)}
                      alt={post.title.rendered}
                      className="more-news-img"
                    />
                    <div className="flex-grow-1">
                      <h6
                        className="more-news-title mb-2"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                      <small className="text-muted d-flex align-items-center">
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

        /* Latest News Styles */
        .featured-news-img {
          width: 100%;
          height: 300px;
          object-fit: cover;
          border-radius: 8px;
        }

        .featured-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
          padding: 1.5rem;
          border-radius: 0 0 8px 8px;
        }

        .featured-title {
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1.4;
        }

        .featured-excerpt {
          font-size: 0.875rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .news-item {
          transition: background-color 0.2s;
        }

        .news-item:hover {
          background-color: #f8f9fa;
        }

        .news-item-img {
          width: 100%;
          height: 80px;
          object-fit: cover;
          border-radius: 6px;
        }

        .news-item-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #333;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .news-item-excerpt {
          font-size: 0.85rem;
          line-height: 1.5;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* More News Sidebar Styles */
        .more-news-sidebar {
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;
        }

        .more-news-img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 6px;
          flex-shrink: 0;
        }

        .more-news-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #333;
          line-height: 1.4;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .more-news-item {
          transition: background-color 0.2s;
          border-radius: 6px;
          padding: 0.5rem;
          margin: -0.5rem;
          margin-bottom: 0.75rem !important;
        }

        .more-news-item:hover {
          background-color: #ffffff;
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

          .featured-news-img {
            height: 400px;
          }

          .featured-title {
            font-size: 1.75rem;
          }

          .featured-excerpt {
            font-size: 1rem;
          }

          .news-item-img {
            height: 100px;
          }

          .news-item-title {
            font-size: 1.1rem;
          }

          .news-item-excerpt {
            font-size: 0.95rem;
          }

          .more-news-sidebar {
            padding: 1.75rem;
          }

          .more-news-img {
            width: 85px;
            height: 85px;
          }

          .more-news-title {
            font-size: 1rem;
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

          .featured-news-img {
            height: 450px;
          }

          .featured-title {
            font-size: 2rem;
          }

          .news-item-img {
            height: 120px;
          }

          .more-news-sidebar {
            padding: 2rem;
          }

          .more-news-img {
            width: 90px;
            height: 90px;
          }

          .more-news-title {
            font-size: 1.05rem;
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