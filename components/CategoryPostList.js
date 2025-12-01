"use client";
import "../style/home.css"
import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import Link from "next/link";
import Pagination from './Pagination';
import { CategoryListPage } from './category-listPage';

export const CategoryPostList = ({ categories = {}, posts = [], currentPage = 1, totalPage = 0, page_link_url, perPage }) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
          <div class="section-box">
            <div class="section-title">
              <h2>Government Policies</h2>
              <a href="#">View All →</a>
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