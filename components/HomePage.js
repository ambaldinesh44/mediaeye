"use client"
import  "../style/home.css"
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

    // Get top slider posts (first 5 posts from results)
  const topSlider = results?.slice(0, 5) || [];

  
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
      <>
     <div class="main-wrapper">

       
      <div class="container-custom">
  <div class="row g-3">


    <div class="col-lg-9 col-md-8 col-12">
      <div class="section-box">

        <div class="section-title">
          <h2>Trending Stories</h2>
          <a href="#">View All →</a>
        </div>

        {topSlider.length > 0 ? (
          <SwiperCarousel posts={topSlider} />
        ) : (
            <>
            </>
        )}

      </div>
    </div>

    
    <div class="col-lg-3 col-md-4 col-12">
       <div class="section-box right">

        <div class="section-title">
          <h3><img src="images/trending-now-icon.png" class="img-fluid me-1" width="16px"/> Trending Now</h3>
        </div>

        <div class="side-list">

          <div class="list-item">
             <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" alt="" />
            <div class="list-item-content">
              <h4>Economic Recovery Shows Strong Signs</h4>
              <span><i class="bi bi-clock clock-icon"></i> 4 hours ago</span>
            </div>
          </div>

          <div class="list-item">
             <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" alt=""/>
           <div class="list-item-content">
              <h4>Climate Summit Reaches Historic Agreement</h4>
              <span><i class="bi bi-clock clock-icon"></i> 6 hours ago</span>
            </div>
          </div>

          <div class="list-item">
           <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" alt=""/>
           <div class="list-item-content">
              <h4>Global Markets Show Mixed Reactions</h4>
              <span><i class="bi bi-clock clock-icon"></i> 7 hours ago</span>
            </div>
          </div>

        </div>

      </div> 
    </div>

  </div>
</div>


     </div>
     </>
   /*  <div className="container-fluid py-2 py-md-3 py-lg-4 px-2 px-md-3">
      <div className="row g-3 g-md-4">

        <div className="col-12 col-lg-8">
          <SwiperCarousel posts={featuredPosts} />
        </div>


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

  
    </div> */
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