"use client";
import "../style/home.css"
import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import Link from "next/link";
import Pagination from './Pagination';
import { CategoryListPage } from './category-listPage';

export const CategoryPostList = ({ categories = {}, posts = [], currentPage = 1, totalPage = 0, page_link_url, perPage, topCategoeyNews = [] }) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Helper function to get featured image
  const getFeaturedImage = (post) => {
    return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder-image.jpg';
  };

  // Helper function to get post URL
  const getPostUrl = (post) => {
    const categorySlug = post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'news';
    return `/${categorySlug}/${post.slug}/${post.id}.html`;
  };

  // Helper function to get time ago
  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);

    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
    const years = Math.floor(months / 12);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  };
  return (
    <>
      {/*  <section>
  <h1>{categories[0].name} News</h1>
  <ul className="category-list"> */}


      <div class="main-wrapper">
        <div class="breadcrumb-wrapper">
          <div class="container-custom">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb custom-breadcrumb">
                <li class="breadcrumb-item">
                  <a href="#">
                    <i class="bi bi-house-door"></i> Home
                  </a>
                </li>

                <li class="breadcrumb-item">
                  <a href="#">Category</a>
                </li>

                <li class="breadcrumb-item active" aria-current="page">
                {categories[0].name} News
                </li>
              </ol>
            </nav>
          </div>
        </div>
          <div class="container-custom">
    <div class="row g-3">
        <div class="col-lg-9 col-md-8 col-12">
          <div class="section-box mb-5">
            <div class="section-title">
              <h2 style={{ textTransform: 'capitalize' }}>{categories[0]?.name}</h2>
            {/*   <a href="#">View All →</a> */}
            </div>

            <CategoryListPage posts={posts} />


          </div>
             <Pagination currentPage={currentPage} totalPage={totalPage} perPage={perPage} page_link_url={page_link_url} />
    
        </div>

        <div class="col-lg-3 col-md-4 col-12">

          <div style={{ marginBottom: '20px' }}>
            <a href="https://www.theleela.com/" target="_blank" rel="noopener noreferrer">
              <Image
                src="https://www.mediaeyenews.com/wp-content/uploads/2024/07/WhatsApp-Image-2024-07-18-at-192.34.33-300x208.jpeg"
                alt="Advertisement"
                width={300}
                height={208}
                loading="lazy"
                className="img-fluid"
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </a>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <a href="https://www.theleela.com/" target="_blank" rel="noopener noreferrer">
              <Image
                src="https://www.mediaeyenews.com/wp-content/uploads/2024/04/WhatsApp-Image-2024-04-11-at-3.20.58-PM-300x300.jpeg"
                alt="Advertisement"
                width={300}
                height={300}
                loading="lazy"
                className="img-fluid"
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </a>
          </div>

          {/* SPECIAL NEWS SECTION */}
          {topCategoeyNews?.find(cat => cat.categoryName === 'special-news')?.posts?.length > 0 && (
            <div className="section-box right" style={{ marginTop: '20px' }}>
              <div className="section-title">
                <h3>Special News</h3>
              </div>
              <div className="side-list">
                {topCategoeyNews.find(cat => cat.categoryName === 'special-news')?.posts?.slice(0, 10).map((post) => (
                  <Link key={post.id} href={getPostUrl(post)}>
                    <div className="list-item">
                      <Image
                        src={getFeaturedImage(post)}
                        alt={post.title.rendered?.replace(/<[^>]*>/g, '') || 'special news'}
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

          {/* TOP NEWS SECTION */}
          {topCategoeyNews?.find(cat => cat.categoryName === 'top-news')?.posts?.length > 0 && (
            <div className="section-box right" style={{ marginTop: '20px' }}>
              <div className="section-title">
                <h3>Top News</h3>
              </div>
              <div className="side-list">
                {topCategoeyNews.find(cat => cat.categoryName === 'top-news')?.posts?.slice(0, 10).map((post) => (
                  <Link key={post.id} href={getPostUrl(post)}>
                    <div className="list-item">
                      <Image
                        src={getFeaturedImage(post)}
                        alt={post.title.rendered?.replace(/<[^>]*>/g, '') || 'top news'}
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

    </>
  )
}