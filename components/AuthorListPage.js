"use client";
import "../style/home.css"
import React, { useEffect } from "react";
import Image from 'next/image';
import Link from "next/link";
import Pagination from './Pagination';
import { CategoryListPage } from './category-listPage';

export const AuthorListPage = ({ author = {}, posts = [], currentPage = 1, totalPage = 0, page_link_url, perPage }) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div class="main-wrapper">
        <div class="breadcrumb-wrapper">
          <div class="container-custom">
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb custom-breadcrumb">
                <li class="breadcrumb-item">
                  <a href="/">
                    <i class="bi bi-house-door"></i> Home
                  </a>
                </li>

                <li class="breadcrumb-item">
                  <a href="#">Author</a>
                </li>

                <li class="breadcrumb-item active" aria-current="page">
                  {author.name}
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div class="container-custom">
          <div class="row g-3">
            <div class="col-lg-9 col-md-8 col-12">
              <div class="section-box">

                {/* Author Info Section */}
                <div class="author-info-box" style={{ marginBottom: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <Image
                      src={author.avatar_urls?.['96'] || '/images/default-avatar.png'}
                      alt={author.name}
                      width={96}
                      height={96}
                      style={{ borderRadius: '50%' }}
                    />
                    <div>
                      <h2 style={{ textTransform: 'capitalize', marginBottom: '10px' }}>{author.name}</h2>
                      {author.description && (
                        <p style={{ margin: 0, color: '#666' }}>{author.description}</p>
                      )}
                    </div>
                  </div>
                </div>

                <div class="section-title">
                  <h2>Articles by {author.name}</h2>
                </div>

                <CategoryListPage posts={posts} />

              </div>
            </div>

            <div class="col-lg-3 col-md-4 col-12">
              <div class="section-box ad-box">
                <img src="/images/add2.png" class="img-fluid" />
              </div>
            </div>
          </div>
        </div>

        <Pagination currentPage={currentPage} totalPage={totalPage} perPage={perPage} page_link_url={page_link_url} />
      </div>
    </>
  )
}
