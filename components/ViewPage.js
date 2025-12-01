'use client';

import Link from 'next/link';
import { Comments } from './Comments';
import { SocialShare } from './SocialShare';
import { RelatedPosts } from './RelatedPosts';

export const ViewPage = ({ post, url, relatedPosts }) => {

  // Helper function to get featured image
  const getFeaturedImage = (post) => {
    return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder-image.jpg';
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Helper function to get post URL
  const getPostUrl = (post) => {
    const categorySlug = post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'news';
    return `/${categorySlug}/${post.slug}/${post.id}.html`;
  };

  // Get category name
  const categoryName = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'News';
  const categorySlug = post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'news';

  // Get tags
  const tags = post._embedded?.['wp:term']?.[1] || [];

  return (
    <>
      <div className="main-wrapper">
        <div className="breadcrumb-wrapper">
          <div className="container-custom">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb custom-breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">
                    <i className="bi bi-house-door"></i> Home
                  </Link>
                </li>

                <li className="breadcrumb-item">
                  <Link href={`/category/${categorySlug}`}>{categoryName}</Link>
                </li>

                <li className="breadcrumb-item active" aria-current="page">
                  <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container-custom">
          <div className="row g-3">

            {/* LEFT */}
            <div className="col-lg-9 col-md-8 col-12">
              <div className="section-box">

                <div className="article-detailed">

                  <div className="article-detailed-content">
                    <h5 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                    <div className="news-meta">
                      <i className="bi bi-clock clock-icon"></i> {formatDate(post.date)}
                    </div>
                  </div>

                  <div className="article-detailed-img">
                    <img src={getFeaturedImage(post)} alt="article" className="img-fluid" />
                  </div>

                  <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />

                  <div className="py-4">

                    {/* TAGS + SHARE */}
                    <div className="row tag-box align-items-center">
                      <div className="col-md-8 col-12 mb-2 mb-md-0">
                        <strong>Tags :</strong>
                        {tags.map((tag) => (
                          <span key={tag.id} className="tag">{tag.name}</span>
                        ))}
                      </div>

                      <div className="col-md-4 col-12 d-flex justify-content-md-end justify-content-start share-icons">
                        <strong className="me-2">Share:</strong>
                        <SocialShare
                          url={url}
                          title={post.title.rendered}
                          description={post.excerpt?.rendered?.replace(/<[^>]*>/g, '') || ''}
                        />
                      </div>
                    </div>

                    {/* PREVIOUS / NEXT */}
                    <div className="nav-box">
                      <span><i className="bi bi-arrow-left"></i> Previous Post</span>
                      <span>Next Post <i className="bi bi-arrow-right"></i></span>
                    </div>

                    {/* RELATED POST */}
                    <h5 className="related-title">RELATED POST</h5>

                    {relatedPosts?.map((relatedPost) => (
                      <Link key={relatedPost.id} href={getPostUrl(relatedPost)}>
                        <div className="row related-card">

                          {/* IMAGE COL (col-4) */}
                          <div className="col-12 col-md-4">
                            <img src={getFeaturedImage(relatedPost)} className="related-img" alt="" />
                          </div>

                          {/* CONTENT COL (col-8) */}
                          <div className="col-12 col-md-8">
                            <div className="related-title-text" dangerouslySetInnerHTML={{ __html: relatedPost.title.rendered }} />

                            <div className="related-meta-line">
                              <div className="related-meta-left">
                                Mediaeye News - {formatDate(relatedPost.date)}
                              </div>
                              <div className="related-meta-right">
                                <i className="bi bi-chat"></i> 0
                              </div>
                            </div>

                            <div className="related-desc" dangerouslySetInnerHTML={{ __html: relatedPost.excerpt?.rendered || '' }} />
                          </div>

                        </div>
                      </Link>
                    ))}

                    <hr className="mt-4" />

                    {/* COMMENT SECTION */}
                    <h3 className="comment-title mt-4">Leave a comment</h3>
                    <p className="comment-note">Your email address will not be published. Required fields are marked *</p>

                    <Comments postId={post.id} />

                  </div>

                </div>

              </div>
            </div>

            {/* RIGHT */}
            <div className="col-lg-3 col-md-4 col-12">

              <div className="section-box ad-box">
                <img src="/images/add2.png" className="img-fluid" />
              </div>

            </div>

          </div>
        </div>

      </div>
    </>
  )
}
