"use client"
import "../style/home.css"
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import dayjs from 'dayjs';
import Marquee from 'react-fast-marquee';
import { getTimeAgo } from '../utils/timeUtils';
import { useState, useEffect } from 'react';

const SwiperCarousel = dynamic(() => import('./SwiperCarousel').then(mod => mod.SwiperCarousel), {
  ssr: false,
});

export const HomePage = ({ mostViewed = [], results = [], categoryNews = [], top_news = [], trendingTopics = [] }) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [activeCategory, setActiveCategory] = useState('Trending');

  // Function to scroll to section
  const scrollToSection = (sectionId, categoryName) => {
    setActiveCategory(categoryName);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
                {/*     {newsRotatorItems.map((post) => (
                  <>
                    {stripHtml(post.title.rendered)}
                  </>
                ))} */}
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
          <div class="row">
            <div class="col-md-10 col-12 mx-auto">
              <Image
                src="/images/top-banner.jpeg"
                alt="Top Banner"
                width={1200}
                height={200}
                className="img-fluid"
                style={{ width: '100%', height: 100 }}
                priority
              />
            </div>
          </div>
          <div class="row">
            <div class="category-scroll">

              <div
                className={`category-item ${activeCategory === 'Trending' ? 'active' : ''}`}
                onClick={() => scrollToSection('trending-section', 'Trending')}
              >
                Trending
              </div>
              <div
                className={`category-item ${activeCategory === 'Latest' ? 'active' : ''}`}
                onClick={() => scrollToSection('latest-section', 'Latest')}
              >
                Latest
              </div>
              <div
                className={`category-item ${activeCategory === 'Top' ? 'active' : ''}`}
                onClick={() => scrollToSection('top-news-section', 'Top')}
              >
                Top
              </div>
              <div
                className={`category-item ${activeCategory === 'National' ? 'active' : ''}`}
                onClick={() => scrollToSection('national-section', 'National')}
              >
                National
              </div>
              <div
                className={`category-item ${activeCategory === 'International' ? 'active' : ''}`}
                onClick={() => scrollToSection('international-section', 'International')}
              >
                International
              </div>
              <div
                className={`category-item ${activeCategory === 'Blog' ? 'active' : ''}`}
                onClick={() => scrollToSection('blog-section', 'Blog')}
              >
                Blog
              </div>
              <div
                className={`category-item ${activeCategory === 'Gender' ? 'active' : ''}`}
                onClick={() => scrollToSection('gender-section', 'Gender')}
              >
                Gender
              </div>
              <div
                className={`category-item ${activeCategory === 'Articles' ? 'active' : ''}`}
                onClick={() => scrollToSection('articles-section', 'Articles')}
              >
                Articles
              </div>
              <div
                className={`category-item ${activeCategory === 'Videos' ? 'active' : ''}`}
                onClick={() => scrollToSection('videos-section', 'Videos')}
              >
                Videos
              </div>
              <div
                className={`category-item ${activeCategory === 'Social Media' ? 'active' : ''}`}
                onClick={() => scrollToSection('social-media-section', 'Social Media')}
              >
                Social Media
              </div>
              <div
                className={`category-item ${activeCategory === 'Web Stories' ? 'active' : ''}`}
                onClick={() => scrollToSection('web-stories-section', 'Web Stories')}
              >
                Web Stories
              </div>
              <div
                className={`category-item ${activeCategory === 'Photos' ? 'active' : ''}`}
                onClick={() => scrollToSection('photos-section', 'Photos')}
              >
                Photos
              </div>
              <div
                className={`category-item ${activeCategory === 'Campaigns' ? 'active' : ''}`}
                onClick={() => scrollToSection('campaigns-section', 'Campaigns')}
              >
                Campaigns
              </div>

            </div>
          </div>
        </div>
        <div class="container-custom">
          <div class="row g-3">


            <div class="col-lg-9 col-md-8 col-12">
              <div class="section-box" id="trending-section">

                <div class="section-title">
                  <h2>Trending Stories</h2>
                  <Link href="/category/trending">View All →</Link>
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
                  <h3><img src="/images/trending-now-icon.png" class="img-fluid me-1" width="16px" /> Trending Now</h3>
                </div>

                <div class="side-list">

                  {mostViewed
                    ?.sort((a, b) => new Date(b.date) - new Date(a.date))
                    ?.slice(0, 5)
                    ?.map((post) => (
                      <Link key={post.id} href={post.link}>
                        <div class="list-item">
                          <Image
                            src={post.image || '/placeholder-image.jpg'}
                            alt={post.title || 'trending'}
                            width={100}
                            height={100}
                            loading="lazy"
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                          />
                          <div class="list-item-content">
                            <h4>{post.title}</h4>
                            <span><i class="bi bi-clock clock-icon"></i> {getTimeAgo(post.date)}</span>
                          </div>
                        </div>
                      </Link>
                    ))}

                </div>

              </div>
            </div>

          </div>
        </div>


        <div class="container-custom">
          <div class="row g-3">


            <div class="col-lg-9 col-md-8 col-12">
              <div class="section-box" id="latest-section">

                <div class="section-title">
                  <h2>Latest News</h2>
                  <Link href="/category/latest">View All →</Link>
                </div>

                <div class="row g-3">

                  {/* MAIN NEWS - Seventh Item from results */}
                  {results[6] && (
                    <div class="col-lg-8 col-md-12 col-12">
                      <Link href={getPostUrl(results[6])}>
                        <div class="news-image">
                          <Image
                            src={getFeaturedImage(results[6])}
                            alt={results[6].title.rendered?.replace(/<[^>]*>/g, '') || 'news'}
                            width={800}
                            height={500}
                            priority
                            className="img-fluid"
                            style={{ width: '100%', height: 500 }}
                          />
                        </div>

                        <h3 class="news-title" dangerouslySetInnerHTML={{ __html: results[6].title.rendered }} />

                        <div class="news-meta">
                          {results[6]._embedded?.['wp:term']?.[0]?.[0]?.name || 'News'} • {getTimeAgo(results[6].date)}
                        </div>

                        <p class="news-desc" dangerouslySetInnerHTML={{ __html: results[6].excerpt?.rendered || '' }} />
                      </Link>
                    </div>
                  )}

                  {/* RIGHT SIDE NEWS LIST - Items 7-10 from results */}
                  <div class="col-lg-4 col-md-12 col-12">
                    {results.slice(7, 10).map((post) => (
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
                {/* Advertisement Banner 1 */}
                <div style={{ marginBottom: '20px' }}>
                  <a href="https://www.theleela.com/" target="_blank" rel="noopener noreferrer">
                    <Image
                      src="https://www.mediaeyenews.com/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-18-at-192.34.33.jpeg"
                      alt="Advertisement"
                      width={300}
                      height={208}
                      loading="lazy"
                      className="img-fluid"
                      style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                  </a>
                </div>

                {/* Advertisement Banner 2 */}
                <div>
                  <a href="https://www.theleela.com/" target="_blank" rel="noopener noreferrer">
                    <Image
                      src="https://www.mediaeyenews.com/wp-content/uploads/2024/04/IMG-20240416-WA0028.jpg"
                      alt="Advertisement"
                      width={300}
                      height={300}
                      loading="lazy"
                      className="img-fluid"
                      style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>



        <div class="container-custom">
          <div class="row g-3">


            <div class="col-lg-9 col-md-8 col-12">
              <div class="section-box" id="national-section">
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
                  {trendingTopics.length > 0 ? (
                    trendingTopics.map((topic, index) => (
                      <li key={index} class="list-group-item">
                        <Link href={topic.link}>
                          <span class="title">{topic.name}</span>
                          <small class="float-end">{topic.count}</small>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <>

                    </>
                  )}
                </ul>
              </div>

              {/*  <div class="stay-informed-box">
                <h5>Stay Informed</h5>
                <p>Get our daily newsletter with the stories that matter most.</p>

                <div class="subscribe-input">
                  <input type="email" placeholder="your@email.com" />
                  <button type="button">Subscribe</button>
                </div>

                <small>Free. No spam. Unsubscribe anytime.</small>
              </div> */}

            </div>

          </div>
        </div>


        <div class="container-custom">
          <div class="row g-3">


            <div class="col-lg-9 col-md-8 col-12">
              <div class="section-box" id="international-section">
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
                {/* Advertisement Banner 1 */}
                <div style={{ marginBottom: '20px' }}>
                  <a href="https://www.theleela.com/" target="_blank" rel="noopener noreferrer">
                    <Image
                      src="https://www.mediaeyenews.com/wp-content/uploads/2024/04/WhatsApp-Image-2024-04-07-at-7.16.53-PM-e1712638885981.jpeg"
                      alt="Advertisement"
                      width={300}
                      height={300}
                      loading="lazy"
                      className="img-fluid"
                      style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                  </a>
                </div>

                {/* Advertisement Banner 2 */}
                <div style={{ marginBottom: '20px' }}>
                  <a href="https://www.theleela.com/" target="_blank" rel="noopener noreferrer">
                    <Image
                      src="https://www.mediaeyenews.com/wp-content/uploads/2024/04/Seafood-Promotion-The-Great-Wall.jpg"
                      alt="Advertisement"
                      width={300}
                      height={300}
                      loading="lazy"
                      className="img-fluid"
                      style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                  </a>
                </div>

                {/* Advertisement Banner 3 */}
                <div>
                  <a href="https://www.theleela.com/" target="_blank" rel="noopener noreferrer">
                    <Image
                      src="https://www.mediaeyenews.com/wp-content/uploads/2024/04/IMG-20240416-WA0028.jpg"
                      alt="Advertisement"
                      width={300}
                      height={300}
                      loading="lazy"
                      className="img-fluid"
                      style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>



        <div class="container-custom ">
          <div class="row g-3">


            <div class="col-lg-9 col-md-12 col-12">
              <div class="section-box" id="top-news-section">
                <div class="section-title">
                  <h2>Top News</h2>
                  <Link href="/category/top-news">View All →</Link>
                </div>


                <div class="news-card-grid">

                  {categoryNews.find(cat => cat.categoryName === 'top-news')?.posts?.slice(0, 3).map((post) => (
                    <Link key={post.id} href={getPostUrl(post)}>
                      <div class="news-card">
                        <Image
                          src={getFeaturedImage(post)}
                          alt={post.title.rendered?.replace(/<[^>]*>/g, '') || 'top news'}
                          width={400}
                          height={250}
                          loading="lazy"
                          className="img-fluid"
                          style={{ width: '100%', height: 'auto' }}
                        />
                        <div class="news-card-content">
                          <h6 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                          <p dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || '' }} />
                          <div class="news-meta">
                            <span>
                              <i class="bi bi-person user-icon"></i> {post._embedded?.author?.[0]?.name || 'Admin'}
                            </span>
                            <span><i class="bi bi-clock clock-icon"></i> {getTimeAgo(post.date)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}

                </div>


                <div class="match-list">

                  {categoryNews.find(cat => cat.categoryName === 'top-news')?.posts?.slice(3, 6).map((post, index) => (
                    <Link key={post.id} href={getPostUrl(post)}>
                      <div class="match-item">
                        <div class="match-left">
                          <Image
                            src={getFeaturedImage(post)}
                            alt={post.title.rendered?.replace(/<[^>]*>/g, '') || 'news'}
                            width={80}
                            height={80}
                            loading="lazy"
                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                          />
                          <div class="match-text">
                            <div class="match-meta">
                              <small>{getTimeAgo(post.date)}</small>
                            </div>
                            <h6 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                            <small>{post._embedded?.author?.[0]?.name || 'Admin'}</small>
                          </div>
                        </div>
                        <div class="match-score">{post._embedded?.['wp:term']?.[0]?.[0]?.name || 'News'}</div>
                      </div>
                    </Link>
                  ))}

                </div>
              </div>
            </div>


            <div class="col-lg-3 col-md-4 col-12 d-none d-lg-block ">
              <div class="sponsored-wrapper">

                {categoryNews?.find(cat => cat.categoryName === 'education')?.posts?.length > 0 && (
                  <div className="section-box right" >
                    <div className="section-title">
                      <h3>Education News</h3>
                    </div>
                    <div className="side-list">
                      {categoryNews.find(cat => cat.categoryName === 'education')?.posts?.slice(0, 7).map((post) => (
                        <Link key={post.id} href={getPostUrl(post)}>
                          <div className="list-item">
                            <Image
                              src={getFeaturedImage(post)}
                              alt={post.title.rendered?.replace(/<[^>]*>/g, '') || 'education news'}
                              width={100}
                              height={100}
                              loading="lazy"
                              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                            />
                            <div className="list-item-content">
                              <h4 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                              <span><i className="bi bi-clock clock-icon"></i> {getTimeAgo(post.date)}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/*   <div class="sponsored-wrapper">
                  <div class="sponsored-title">SPONSORED</div>

                  <img src="images/sponsered2.png" class=" img-fluid sponsored-img"/>

                    <div class="sponsored-content">
                      <h6>Smart Investment Made Simple</h6>
                      <p>Start building wealth with AI-powered portfolio management.</p>
                      <span>by WealthTech</span>

                      <button class="sponsored-btn">Learn More</button>
                    </div>
                </div> */}

              </div>


            </div>
          </div>
        </div>

           <div class="container-custom ">
          <div class="row g-3">


            <div class="col-lg-9 col-md-12 col-12">
              <div class="section-box" id="top-news-section">
                <div class="section-title">
                  <h2>Hot News</h2>
                  <Link href="/category/hot-news">View All →</Link>
                </div>


                <div class="news-card-grid">

                  {categoryNews.find(cat => cat.categoryName === 'hot-news')?.posts?.slice(0, 3).map((post) => (
                    <Link key={post.id} href={getPostUrl(post)}>
                      <div class="news-card">
                        <Image
                          src={getFeaturedImage(post)}
                          alt={post.title.rendered?.replace(/<[^>]*>/g, '') || 'hot news'}
                          width={400}
                          height={250}
                          loading="lazy"
                          className="img-fluid"
                          style={{ width: '100%', height: 250 }}
                        />
                        <div class="news-card-content">
                          <h6 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                          <p dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || '' }} />
                          <div class="news-meta">
                            <span>
                              <i class="bi bi-person user-icon"></i> {post._embedded?.author?.[0]?.name || 'Admin'}
                            </span>
                            <span><i class="bi bi-clock clock-icon"></i> {getTimeAgo(post.date)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}

                </div>


                <div class="match-list">

                  {categoryNews.find(cat => cat.categoryName === 'hot-news')?.posts?.slice(3, 6).map((post, index) => (
                    <Link key={post.id} href={getPostUrl(post)}>
                      <div class="match-item">
                        <div class="match-left">
                          <Image
                            src={getFeaturedImage(post)}
                            alt={post.title.rendered?.replace(/<[^>]*>/g, '') || 'news'}
                            width={80}
                            height={80}
                            loading="lazy"
                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                          />
                          <div class="match-text">
                            <div class="match-meta">
                              <small>{getTimeAgo(post.date)}</small>
                            </div>
                            <h6 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                            <small>{post._embedded?.author?.[0]?.name || 'Admin'}</small>
                          </div>
                        </div>
                        <div class="match-score">{post._embedded?.['wp:term']?.[0]?.[0]?.name || 'News'}</div>
                      </div>
                    </Link>
                  ))}

                </div>
              </div>
            </div>


            <div class="col-lg-3 col-md-4 col-12 d-none d-lg-block ">
              <div class="sponsored-wrapper">

        

              </div>


            </div>
          </div>
        </div>


        <div class="container-custom ">
          <div class="row g-3">


            <div class="col-lg-9 col-md-12 col-12">
              <div class="section-box" id="top-news-section">
                <div class="section-title">
                  <h2>Special News</h2>
                  <Link href="/category/special-news">View All →</Link>
                </div>


                <div class="news-card-grid">

                  {categoryNews.find(cat => cat.categoryName === 'special-news')?.posts?.slice(0, 3).map((post) => (
                    <Link key={post.id} href={getPostUrl(post)}>
                      <div class="news-card">
                        <Image
                          src={getFeaturedImage(post)}
                          alt={post.title.rendered?.replace(/<[^>]*>/g, '') || 'special news'}
                          width={400}
                          height={250}
                          loading="lazy"
                          className="img-fluid"
                          style={{ width: '100%', height: 250 }}
                        />
                        <div class="news-card-content">
                          <h6 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                          <p dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || '' }} />
                          <div class="news-meta">
                            <span>
                              <i class="bi bi-person user-icon"></i> {post._embedded?.author?.[0]?.name || 'Admin'}
                            </span>
                            <span><i class="bi bi-clock clock-icon"></i> {getTimeAgo(post.date)}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}

                </div>


                <div class="match-list">

                  {categoryNews.find(cat => cat.categoryName === 'special-news')?.posts?.slice(3, 6).map((post, index) => (
                    <Link key={post.id} href={getPostUrl(post)}>
                      <div class="match-item">
                        <div class="match-left">
                          <Image
                            src={getFeaturedImage(post)}
                            alt={post.title.rendered?.replace(/<[^>]*>/g, '') || 'news'}
                            width={80}
                            height={80}
                            loading="lazy"
                            style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                          />
                          <div class="match-text">
                            <div class="match-meta">
                              <small>{getTimeAgo(post.date)}</small>
                            </div>
                            <h6 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                            <small>{post._embedded?.author?.[0]?.name || 'Admin'}</small>
                          </div>
                        </div>
                        <div class="match-score">{post._embedded?.['wp:term']?.[0]?.[0]?.name || 'News'}</div>
                      </div>
                    </Link>
                  ))}

                </div>
              </div>
            </div>


            <div class="col-lg-3 col-md-4 col-12 d-none d-lg-block ">
              <div class="sponsored-wrapper">

        {categoryNews?.find(cat => cat.categoryName === 'city')?.posts?.length > 0 && (
                  <div className="section-box right" >
                    <div className="section-title">
                      <h3>City News</h3>
                    </div>
                    <div className="side-list">
                      {categoryNews.find(cat => cat.categoryName === 'city')?.posts?.slice(0, 7).map((post) => (
                        <Link key={post.id} href={getPostUrl(post)}>
                          <div className="list-item">
                            <Image
                              src={getFeaturedImage(post)}
                              alt={post.title.rendered?.replace(/<[^>]*>/g, '') || 'city news'}
                              width={100}
                              height={100}
                              loading="lazy"
                              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                            />
                            <div className="list-item-content">
                              <h4 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                              <span><i className="bi bi-clock clock-icon"></i> {getTimeAgo(post.date)}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              </div>


            </div>
          </div>
        </div>


        <div class="container-custom">
          <div class="row g-3">

            <div class="col-lg-9 col-md-8 col-12">
              <div class="section-box" id="blog-section">

                <div class="section-title">
                  <h2>Blog</h2>
                  <Link href="/category/blog">View All →</Link>
                </div>

                <div class="row g-3">

                  {/* MAIN BLOG - First Item from blog category */}
                  {categoryNews.find(cat => cat.categoryName === 'blog')?.posts?.[0] && (
                    <div class="col-lg-8 col-md-12 col-12">
                      <Link href={getPostUrl(categoryNews.find(cat => cat.categoryName === 'blog').posts[0])}>
                        <div class="news-image">
                          <Image
                            src={getFeaturedImage(categoryNews.find(cat => cat.categoryName === 'blog').posts[0])}
                            alt={categoryNews.find(cat => cat.categoryName === 'blog').posts[0].title.rendered?.replace(/<[^>]*>/g, '') || 'blog'}
                            width={800}
                            height={500}
                            loading="lazy"
                            className="img-fluid"
                            style={{ width: '100%', height: 'auto' }}
                          />
                        </div>

                        <h3 class="news-title" dangerouslySetInnerHTML={{ __html: categoryNews.find(cat => cat.categoryName === 'blog').posts[0].title.rendered }} />

                        <div class="news-meta">
                          By {categoryNews.find(cat => cat.categoryName === 'blog').posts[0]._embedded?.author?.[0]?.name || 'Admin'} • {getTimeAgo(categoryNews.find(cat => cat.categoryName === 'blog').posts[0].date)}
                        </div>

                        <p class="news-desc" dangerouslySetInnerHTML={{ __html: categoryNews.find(cat => cat.categoryName === 'blog').posts[0].excerpt?.rendered || '' }} />
                      </Link>
                    </div>
                  )}


                  <div class="col-lg-4 col-md-12 col-12">

                    <div class="section-box right">

                      <div class="section-title">
                        <h3><img src="/images/trending-icon.svg" class="img-fluid me-1" width="16px" />More</h3>
                      </div>

                      <div class="side-list">

                        {categoryNews.find(cat => cat.categoryName === 'blog')?.posts?.slice(1, 4).map((post) => (
                          <Link key={post.id} href={getPostUrl(post)}>
                            <div class="list-item">
                              <Image
                                src={getFeaturedImage(post)}
                                alt={post.title.rendered?.replace(/<[^>]*>/g, '') || 'blog'}
                                width={100}
                                height={100}
                                loading="lazy"
                                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                              />
                              <div class="list-item-content">
                                <h4 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                                <span><i class="bi bi-clock clock-icon"></i> {getTimeAgo(post.date)}</span>
                              </div>
                            </div>
                          </Link>
                        ))}

                      </div>

                    </div>

                  </div>

                </div>
              </div>
            </div>

            <div class="col-lg-3 col-md-4 col-12">
              <div>

                    {categoryNews?.find(cat => cat.categoryName === 'science')?.posts?.length > 0 && (
                  <div className="section-box right" >
                    <div className="section-title">
                      <h3>Science News</h3>
                    </div>
                    <div className="side-list">
                      {categoryNews.find(cat => cat.categoryName === 'science')?.posts?.slice(0, 7).map((post) => (
                        <Link key={post.id} href={getPostUrl(post)}>
                          <div className="list-item">
                            <Image
                              src={getFeaturedImage(post)}
                              alt={post.title.rendered?.replace(/<[^>]*>/g, '') || 'science news'}
                              width={100}
                              height={100}
                              loading="lazy"
                              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                            />
                            <div className="list-item-content">
                              <h4 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                              <span><i className="bi bi-clock clock-icon"></i> {getTimeAgo(post.date)}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>

        <div class="container-custom ">
          <div class="row g-3">


            <div class="col-lg-9 col-md-12 col-12">
              <div class="section-box" id="videos-section">
                <div class="section-title">
                  <h2>Videos</h2>
                  <Link href="/category/video">View All →</Link>
                </div>


                <div class="video-grid">

                  {categoryNews.find(cat => cat.categoryName === 'video')?.posts?.slice(0, 9).map((post, index) => {
                    const cardClass = index === 1 || index === 2 || index === 5 ? 'large' : 'small';
                    // Extract YouTube video ID from the post content or custom field
                    const videoUrl = post.content?.rendered || post.acf?.video_url || '';
                    const youtubeMatch = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
                    const videoId = youtubeMatch ? youtubeMatch[1] : null;

                    return (
                      <div key={post.id} class={`video-card ${cardClass}`}>
                        {videoId ? (
                          <iframe
                            width="100%"
                            height="100%"
                            src={`https://www.youtube.com/embed/${videoId}`}
                            title={post.title.rendered?.replace(/<[^>]*>/g, '') || 'video'}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ aspectRatio: '16/9' }}
                          ></iframe>
                        ) : (
                          <Image
                            src={getFeaturedImage(post)}
                            alt={post.title.rendered?.replace(/<[^>]*>/g, '') || 'video'}
                            width={400}
                            height={300}
                            loading="lazy"
                            className="img-fluid"
                            style={{ width: '100%', height: 'auto' }}
                          />
                        )}
                        <div class="video-title" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                      </div>
                    );
                  })}

                </div>
              </div>
            </div>


            <div class="col-lg-3 col-md-4 col-12">

              <div class="sponsored-wrapper">
               
                    {categoryNews?.find(cat => cat.categoryName === 'technology')?.posts?.length > 0 && (
                  <div className="section-box right" >
                    <div className="section-title">
                      <h3>Technology News</h3>
                    </div>
                    <div className="side-list">
                      {categoryNews.find(cat => cat.categoryName === 'technology')?.posts?.slice(0,5).map((post) => (
                        <Link key={post.id} href={getPostUrl(post)}>
                          <div className="list-item">
                            <Image
                              src={getFeaturedImage(post)}
                              alt={post.title.rendered?.replace(/<[^>]*>/g, '') || 'science news'}
                              width={100}
                              height={100}
                              loading="lazy"
                              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                            />
                            <div className="list-item-content">
                              <h4 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                              <span><i className="bi bi-clock clock-icon"></i> {getTimeAgo(post.date)}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/*    <div class="upcoming-box">
          <div class="up-heading"><img src="images/calendar-icon.svg" class="img-fluid me-2" width="16px"/> Upcoming</div>

          <div class="up-item">
            <div class="up-date">15<span>OCT</span></div>
            <div class="up-info">
              <h6>Economic Summit 2025</h6>
              <p>10:00 AM</p>
            </div>
          </div>

          <div class="up-item">
            <div class="up-date">22<span>OCT</span></div>
            <div class="up-info">
              <h6>Tech Innovation Conference</h6>
              <p>2:00 PM</p>
            </div>
          </div>

          <div class="up-item">
            <div class="up-date">28<span>OCT</span></div>
            <div class="up-info">
              <h6>Climate Action Meeting</h6>
              <p>11:00 AM</p>
            </div>
          </div>

          <button class="view-btn">View All</button>
        </div> */}

            </div>


          </div>
        </div>





        <div class="container-custom">
          <div class="row g-3">

   <div class=" col-12">
              <div class="section-box" id="international-section">
                <div class="section-title">
                  <h2>Sports News</h2>
                  <Link href="/category/international">View All →</Link>
                </div>

              <div class="row">
                    <div class="col-12 col-md-6">
              <div class="section-box" id="international-section">
              
                {categoryNews.find(cat => cat.categoryName === 'sports-news')?.posts?.slice(0, 5).map((post) => (
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


         <div class="col-12 col-md-6">
                   <div class="section-box" >
                {categoryNews.find(cat => cat.categoryName === 'sports-news')?.posts?.slice(5, 10).map((post) => (
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