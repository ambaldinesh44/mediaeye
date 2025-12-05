"use client";
import { useState } from 'react';
import Image from 'next/image';
import '../style/home.css';
import { CONFIG } from "@util/config";
export const CategoryList = ({categories = [], totalCount = 0}) => {
  const [displayedCategories, setDisplayedCategories] = useState(categories);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const perPage = 100;
  const hasMore = displayedCategories.length < totalCount;

  const loadMoreCategories = async () => {
    setLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await fetch(
        `${CONFIG.API_URL}categories?page=${nextPage}&per_page=${perPage}&_embed`
      );

      if (response.ok) {
        const newCategories = await response.json();
        setDisplayedCategories([...displayedCategories, ...newCategories]);
        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error('Error loading more categories:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className='main-wrapper'>
 <aside className="category-sidebar">
        <h3>Categories</h3>
        <p className="category-count">
          Showing {displayedCategories.length} of {totalCount} categories
        </p>
        <ul className="category-list">
          {displayedCategories?.map((cat) => (
            <li key={cat.id} className="category-item">
              <a href={`/category/${cat.slug}`}>{cat.name} - {cat.id}</a>
              <span className="post-count">({cat.count})</span>
            </li>
          ))}
        </ul>

        {hasMore && (
          <div className="load-more-container" style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
              onClick={loadMoreCategories}
              disabled={loading}
              className="load-more-btn btn btn-primary"
             
            >
              {loading ? 'Loading...' : 'Load More Categories'}
            </button>
          </div>
        )}
      </aside>
    </div>
     
    </>
  );
}