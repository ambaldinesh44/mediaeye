'use client';

import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const SwiperCarousel = ({ posts }) => {
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

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{
          clickable: true,
          el: '.slider-dots',
          bulletClass: 'swiper-pagination-bullet custom-bullet',
          bulletActiveClass: 'swiper-pagination-bullet-active active'
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="featured-swiper"
      >
        {posts.map((post) => (
          <SwiperSlide key={post.id}>
            <Link href={getPostUrl(post)}>
             {/*  <div className="position-relative" style={{ height: '500px', cursor: 'pointer' }}>
              */}   <img
                  src={getFeaturedImage(post)}
                  className="d-block w-100"
                  alt={post.title.rendered}
                  style={{ height: '100%', objectFit: 'cover' }}
                />
                 <div className="overlay-content">
                  <h3 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  <p dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || '' }} />
                  <p className="mb-0">
                    <small>{post._embedded?.['wp:term']?.[0]?.[0]?.name || 'News'} • {getTimeAgo(post.date)}</small>
                  </p>
                </div>
            {/*   </div> */}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

          <div className="slider-dots">
        </div>


      <style jsx global>{`
        .featured-swiper {
          width: 100%;
          height: 500px;
        }
        .swiper-button-prev,
        .swiper-button-next {
          color: white !important;
        }

     
      `}</style>
    </>
  );
};
