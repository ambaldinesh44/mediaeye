"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import Link from "next/link"; 
import Pagination from './Pagination';

export const CategoryPostList = ({categories={},posts=[],currentPage=1,totalPage=0,page_link_url,perPage})=>{

    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
    return(
        <>
       <section>
  <h1>{categories[0].name} News</h1>
  <ul className="category-list">
    {posts.map((post) => {
      const image =
        post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.thumbnail?.source_url ||
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        '';

      return (
        <li key={post.id} className="category-item">
          {image && (
             <Image
    src={image}
    alt={post?.title?.rendered || "Post Image"}
    className="category-thumb"
    width={600}
    height={400}
    loading="lazy"
  />
         /*    <img
              src={image}
              alt={post.title.rendered}
               className="category-thumb"
  loading="lazy" 
            /> */
          )}
          <Link href={post.link.replace("https://www.mediaeyenews.com", "")}>
            {post.title.rendered}
          </Link>
        </li>
      );
    })}
  </ul>
 
      <Pagination currentPage={currentPage} totalPage={totalPage} perPage={perPage} page_link_url={page_link_url}/>
</section>

        </>
    )
}