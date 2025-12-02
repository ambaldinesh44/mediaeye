"use client"
import "../style/home.css"
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';
import Marquee from 'react-fast-marquee';
import { getTimeAgo } from '../utils/timeUtils';

const SwiperCarousel = dynamic(() => import('./SwiperCarousel').then(mod => mod.SwiperCarousel), {
  ssr: false,
});

export const HomePage = ({ term = '', results = [], categoryNews = [], top_news = [] }) => {

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

  // Get news rotator items (use top_news for marquee)
  const newsRotatorItems = top_news || [];

  // Helper function to get post URL
  const getPostUrl = (post) => {
    const categorySlug = post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'news';
    return `/${categorySlug}/${post.slug}/${post.id}.html`;
  };

  // Helper function to strip HTML tags
  const stripHtml = (html) => {
    return html?.replace(/<[^>]*>/g, '') || '';
  };

  // Helper function to format time for news rotator
  const formatTime = (dateString) => {
    const date = dayjs(dateString);
    return date.format('h:mm a');
  };

  // Helper function to get featured image
  const getFeaturedImage = (post) => {
    return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder-image.jpg';
  };

  return (
    <>
    
          <div className="news-rotator-wrapper">
            <div className="news-rotator">
              <div className="container">
                <div className="news-rotator-container">
                  <div className="news-icon">
                    <img src="/images/newsicon.svg" className="img-fluid" />
                  </div>
                  <div className="news-box">
                     {newsRotatorItems.map((post) => (
                      <>
                       {stripHtml(post.title.rendered)}
                      </>
 ))}        
                    <Marquee speed={50} gradient={false} pauseOnHover={true}>
                      {newsRotatorItems.map((post) => (
                        <Link key={`news-${post.id}`} href={getPostUrl(post)} className="news-item">
                          {formatTime(post.date)} - {stripHtml(post.title.rendered)}
                        </Link>
                      ))}
                    </Marquee>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                  <h3><img src="images/trending-now-icon.png" class="img-fluid me-1" width="16px" /> Trending Now</h3>
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
                    <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" alt="" />
                    <div class="list-item-content">
                      <h4>Climate Summit Reaches Historic Agreement</h4>
                      <span><i class="bi bi-clock clock-icon"></i> 6 hours ago</span>
                    </div>
                  </div>

                  <div class="list-item">
                    <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" alt="" />
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


        <div class="container-custom">
          <div class="row g-3">


            <div class="col-lg-9 col-md-8 col-12">
              <div class="section-box">

                <div class="section-title">
                  <h2>Latest News</h2>
                  <a href="#">View All →</a>
                </div>

                <div class="row g-3">

                  {/* MAIN NEWS - First Item from results */}
                  {results[0] && (
                    <div class="col-lg-8 col-md-12 col-12">
                      <Link href={getPostUrl(results[0])}>
                        <div class="news-image">
                          <Image
                            src={getFeaturedImage(results[0])}
                            alt={results[0].title.rendered?.replace(/<[^>]*>/g, '') || 'news'}
                            width={800}
                            height={500}
                            priority
                            className="img-fluid"
                            style={{ width: '100%',height:500 }}
                          />
                        </div>

                        <h3 class="news-title" dangerouslySetInnerHTML={{ __html: results[0].title.rendered }} />

                        <div class="news-meta">
                          {results[0]._embedded?.['wp:term']?.[0]?.[0]?.name || 'News'} • {getTimeAgo(results[0].date)}
                        </div>

                        <p class="news-desc" dangerouslySetInnerHTML={{ __html: results[0].excerpt?.rendered || '' }} />
                      </Link>
                    </div>
                  )}

                  {/* RIGHT SIDE NEWS LIST - Items 2-5 from results */}
                  <div class="col-lg-4 col-md-12 col-12">
                    {results.slice(1, 5).map((post) => (
                      <Link key={post.id} href={getPostUrl(post)}>
                        <div class="right-news-item">
                          <div class="dot"></div>
                          <div>
                            <small>{getTimeAgo(post.date)}</small>
                            <h6 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                            <p dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || '' }} />
                            <div class="news-location">
                              <i class="bi bi-geo-alt location-icon"></i> {post._embedded?.['wp:term']?.[0]?.[0]?.name || 'News'}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                </div>
              </div>
            </div>


            <div class="col-lg-3 col-md-4 col-12">
              <div class="section-box ad-box">
                <Image
                  src="/images/add.png"
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



        <div class="container-custom">
          <div class="row g-3">


            <div class="col-lg-9 col-md-8 col-12">
              <div class="section-box">
                <div class="section-title">
                  <h2>National</h2>
                  <Link href="/category/national">View All →</Link>
                </div>

                {categoryNews.find(cat => cat.categoryName === 'national')?.posts?.slice(0, 4).map((post) => (
                  <Link key={post.id} href={getPostUrl(post)}>
                    <div class="news-row">
                      <div class="news-thumb">
                        <Image
                          src={getFeaturedImage(post)}
                          alt={post.title.rendered?.replace(/<[^>]*>/g, '') || 'national news'}
                          width={400}
                          height={250}
                          loading="lazy"
                          className="img-fluid"
                          style={{ width: '100%', height: 'auto' }}
                        />
                      </div>
                      <div class="news-content">
                        <h5 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                        <p dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || '' }} />
                        <div class="news-meta">
                          <i class="bi bi-clock clock-icon"></i> {getTimeAgo(post.date)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}

              </div>
            </div>


            <div class="col-lg-3 col-md-4 col-12">

              <div class="section-box trending-section">
                <div class="section-title">
                  <h5><img src="images/trending-icon.svg" class="img-fluid me-1" width="16px" />Trending</h5>
                </div>

                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    <span class="title">Asia Cup Cricket</span>
                    <small class="float-end">2.4k</small>
                  </li>
                  <li class="list-group-item">
                    <span class="title">Stock Market</span>
                    <small class="float-end">1.8k</small>
                  </li>
                  <li class="list-group-item">
                    <span class="title">Climate Change</span>
                    <small class="float-end">1.5k</small>
                  </li>
                  <li class="list-group-item">
                    <span class="title">Technology Innovation</span>
                    <small class="float-end">1.2k</small>
                  </li>
                  <li class="list-group-item">
                    <span class="title">Healthcare Reform</span>
                    <small class="float-end">950</small>
                  </li>
                </ul>
              </div>

              <div class="stay-informed-box">
                <h5>Stay Informed</h5>
                <p>Get our daily newsletter with the stories that matter most.</p>

                <div class="subscribe-input">
                  <input type="email" placeholder="your@email.com" />
                  <button type="button">Subscribe</button>
                </div>

                <small>Free. No spam. Unsubscribe anytime.</small>
              </div>

            </div>

          </div>
        </div>


   <div class="container-custom">
    <div class="row g-3">

 
      <div class="col-lg-9 col-md-8 col-12">
        <div class="section-box">
          <div class="section-title">
            <h2>International</h2>
            <Link href="/category/international">View All →</Link>
          </div>

          {categoryNews.find(cat => cat.categoryName === 'international')?.posts?.slice(0, 4).map((post) => (
            <Link key={post.id} href={getPostUrl(post)}>
              <div class="news-row">
                <div class="news-thumb">
                  <Image
                    src={getFeaturedImage(post)}
                    alt={post.title.rendered?.replace(/<[^>]*>/g, '') || 'international news'}
                    width={400}
                    height={250}
                    loading="lazy"
                    className="img-fluid"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
                <div class="news-content">
                  <h5 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  <p dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || '' }} />
                  <div class="news-meta">
                    <i class="bi bi-clock clock-icon"></i> {getTimeAgo(post.date)}
                  </div>
                </div>
              </div>
            </Link>
          ))}

        </div>
      </div>


      <div class="col-lg-3 col-md-4 col-12">
       <div class="section-box ad-box">
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