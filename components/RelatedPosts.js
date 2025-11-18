import Link from 'next/link';

export const RelatedPosts = ({ posts }) => {
  // Extract featured image
  const getFeaturedImage = (post) => {
    return post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/placeholder-image.jpg';
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get post URL
  const getPostUrl = (post) => {
    // Extract category slug from the post
    const categorySlug = post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'news';
    return `/${categorySlug}/${post.slug}/${post.id}.html`;
  };

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div className="related-posts my-5">
      <h3 className="mb-4">Related Articles</h3>
      <div className="row g-4">
        {posts.map((post) => (
          <div key={post.id} className="col-md-4 col-sm-6">
            <div className="card h-100 border-0 shadow-sm">
              {/* Featured Image */}
              <Link href={getPostUrl(post)}>
                <img
                  src={getFeaturedImage(post)}
                  className="card-img-top"
                  alt={post.title.rendered}
                  style={{
                    height: '200px',
                    objectFit: 'cover',
                    cursor: 'pointer'
                  }}
                />
              </Link>

              <div className="card-body">
                {/* Title */}
                <h5 className="card-title">
                  <Link
                    href={getPostUrl(post)}
                    className="text-decoration-none text-dark"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                </h5>

                {/* Excerpt */}
                {post.excerpt?.rendered && (
                  <p
                    className="card-text text-muted small"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                    dangerouslySetInnerHTML={{
                      __html: post.excerpt.rendered
                    }}
                  />
                )}

                {/* Date */}
                <p className="card-text">
                  <small className="text-muted">
                    {formatDate(post.date)}
                  </small>
                </p>
              </div>

              <div className="card-footer bg-transparent border-0">
                <Link
                  href={getPostUrl(post)}
                  className="btn btn-sm btn-outline-primary"
                >
                  Read More →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .related-posts .card {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .related-posts .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </div>
  );
};
