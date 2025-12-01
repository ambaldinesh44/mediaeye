"use client";
import Image from 'next/image';
import '../style/home.css';
export const CategoryList = ({categories={},posts=[]})=>{

    return(
        <>
    <aside className="category-sidebar">
      <h3>Categories</h3>
      <ul className="category-list">
        {categories?.map((cat) => (
          <li key={cat.id} className="category-item">
            <a href={`/category/${cat.slug}`}>{cat.name} -{cat.id}</a>
            <span className="post-count">({cat.count})</span>
          </li>
        ))}
      </ul>
    </aside>

        </>
    )
}