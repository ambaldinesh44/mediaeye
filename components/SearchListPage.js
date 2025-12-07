'use client';
import "../style/home.css"
import Link from 'next/link';
import Image from 'next/image';
import { getTimeAgo } from '../utils/timeUtils';
import { useState, useMemo } from 'react';

export const SearchListPage = ({ posts = [], searchTerm = '' }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate pagination
  const totalPages = Math.ceil(posts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = useMemo(() => posts.slice(startIndex, endIndex), [posts, startIndex, endIndex]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) pages.push(i);
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
    }
    return pages;
  };
  // Helper function to get post URL
  const getPostUrl = (post) => {
    const categorySlug = post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'news';
    return `/${categorySlug}/${post.slug}/${post.id}.html`;
  };

  // Helper function to get featured image
  const getFeaturedImage = (post) => {
    return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder-image.jpg';
  };

  return (
    <>
      <div class="main-wrapper">
      <div className="container-custom">
        <div className="row g-3">
          <div className="col-12">
            <div className="section-box">
              <div className="section-title">
                <h2>Search Results for "{searchTerm}"</h2>
                <span>{posts.length} result{posts.length !== 1 ? 's' : ''} found</span>
              </div>

              {posts.length > 0 ? (
                <>
                  {currentPosts.map((post) => (
                    <Link key={post.id} href={getPostUrl(post)}>
                      <div className="news-row article-big">
                        <div className="news-thumb">
                          <Image
                            src={getFeaturedImage(post)}
                            alt={post.title.rendered?.replace(/<[^>]*>/g, '') || 'search result'}
                            width={400}
                            height={250}
                            loading="lazy"
                            className="img-fluid"
                            style={{ width: '100%', height: 'auto' }}
                          />
                        </div>
                        <div className="news-content">
                          <h5 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                          <p dangerouslySetInnerHTML={{ __html: post.excerpt?.rendered || '' }} />
                          <div className="news-meta">
                            <i className="bi bi-clock clock-icon"></i> {getTimeAgo(post.date)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <nav style={{ marginTop: '30px' }}>
                      <ul className="pagination justify-content-center">
                        {/* Previous */}
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                            disabled={currentPage === 1}
                          >
                            Previous
                          </button>
                        </li>

                        {/* Page Numbers */}
                        {getPageNumbers().map((p) => (
                          <li key={p} className={`page-item ${currentPage === p ? "active" : ""}`}>
                            <button
                              className="page-link"
                              onClick={() => handlePageChange(p)}
                            >
                              {p}
                            </button>
                          </li>
                        ))}

                        {/* Next */}
                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                          <button
                            className="page-link"
                            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                            disabled={currentPage === totalPages}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  )}
                </>
              ) : (
                <div className="alert alert-info">
                  <p>No results found for "{searchTerm}". Try different keywords.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
