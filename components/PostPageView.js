"use client";
import { useState, useEffect } from 'react';
import { CONFIG } from "@util/config";
export const PostPageView = ({post={},categories=[],tags=[]})=>{
   const [comments, setComments] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const perPage = 5;
        useEffect(() => {
     window.scrollTo(0, 0);
         fetchComments();
  }, []);


   async function fetchComments() {
      const res = await fetch(
        `${CONFIG.API_URL}comments?post=${post?.id}&per_page=${perPage}&page=${page}`
      );
      const data = await res.json();
      setComments((prev) => [...prev, ...data]); // append new comments

      const totalCount = res.headers.get('X-WP-Total');
      setTotal(Number(totalCount));
    }



    return(
        <>
         <article>
      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      
<p>
  Categories:{" "}
  {categories.map((c, index) => (
    <span key={c.id}>
      <a href={c.link} target="_blank" rel="noopener noreferrer">
        {c.name}
      </a>
      {index < categories.length - 1 ? ", " : ""}
    </span>
  ))}  
  <br />
  Tags:{" "}
  {tags.map((t, index) => (
    <span key={t.id}>
      <a href={t.link} target="_blank" rel="noopener noreferrer">
        {t.name}
      </a>
      {index < tags.length - 1 ? ", " : ""}
    </span>
  ))}
</p>

      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </article>;
        </>
    )
}