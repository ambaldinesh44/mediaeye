'use client';
import "../style/home.css"
import Link from 'next/link';
import Image from 'next/image';
import { getTimeAgo } from '../utils/timeUtils';
import { useSearchParams } from 'next/navigation';

export const SearchListPage = ({ posts = [], searchTerm = '', currentPage = 1, totalResults = 0 }) => {
  const searchParams = useSearchParams();
  const itemsPerPage = 10;

  // Custom function to build page URL in format: page/2?s=cricket
  const getCustomPageUrl = (pageNum) => {
    const params = new URLSearchParams(searchParams);
    const term = params.get('s') || params.get('search');

    if (pageNum === 1) {
      // Page 1: /?s=cricket
      return term ? `/?s=${encodeURIComponent(term)}` : '/';
    } else {
      // Page 2+: /page/2?s=cricket
      return term ? `/page/${pageNum}?s=${encodeURIComponent(term)}` : `/page/${pageNum}`;
    }
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
      <div className="main-wrapper">
        <div className="container-custom">
          <div className="row g-3">
            <div className="col-12">
              <div className="section-box">
                <div className="section-title">
                  <h2>Search Results for "{searchTerm}"</h2>
                  <span>{totalResults} result{totalResults !== 1 ? 's' : ''} found</span>
                </div>

                {posts.length > 0 ? (
                  <>
                    {posts.map((post) => (
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

                    {/* Server-side Pagination */}
                    {totalResults > itemsPerPage && (() => {
                      const totalPages = Math.ceil(totalResults / itemsPerPage);
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

                      return (
                        <nav style={{ marginTop: '30px' }}>
                          <ul className="pagination justify-content-center">
                            {/* Previous */}
                            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                              <Link
                                href={getCustomPageUrl(Math.max(1, currentPage - 1))}
                                className="page-link"
                              >
                                Previous
                              </Link>
                            </li>

                            {/* Page Numbers */}
                            {getPageNumbers().map((p) => (
                              <li key={p} className={`page-item ${currentPage === p ? "active" : ""}`}>
                                <Link href={getCustomPageUrl(p)} className="page-link">
                                  {p}
                                </Link>
                              </li>
                            ))}

                            {/* Next */}
                            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                              <Link
                                href={getCustomPageUrl(Math.min(totalPages, currentPage + 1))}
                                className="page-link"
                              >
                                Next
                              </Link>
                            </li>
                          </ul>
                        </nav>
                      );
                    })()}
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
