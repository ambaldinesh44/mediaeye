'use client';

import { useState, useEffect } from 'react';

export const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Form fields
  const [formData, setFormData] = useState({
    author_name: '',
    author_email: '',
    content: '',
  });

  // Load comments when component mounts
  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log("------------------comment", postId)

      // Use Next.js API route instead of calling WordPress directly
      const response = await fetch(
        `/api/comments?postId=${postId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        }
      );

      if (!response.ok) {
        // If it's a 404 or similar, just show no comments
        if (response.status === 404) {
          setComments([]);
          setLoading(false);
          return;
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to load comments: ${response.status}`);
      }

      const data = await response.json();
      console.log("Comments loaded:", data.length);
      setComments(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error loading comments:', err);
      // Don't show error to user if it's just a network issue, show empty state instead
      if (err.message.includes('NetworkError') || err.message.includes('fetch')) {
        console.warn('Network error loading comments - showing empty state');
        setComments([]);
        setError(null);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Use Next.js API route instead of calling WordPress directly
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          post: postId,
          author_name: formData.author_name,
          author_email: formData.author_email,
          content: formData.content,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to post comment');
      }

      const newComment = await response.json();

      // Add new comment to the list (if not pending moderation)
      if (newComment.status === 'approved') {
        setComments(prev => [...prev, newComment]);
      }

      // Reset form
      setFormData({
        author_name: '',
        author_email: '',
        content: '',
      });

      setSuccess(true);

      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Error posting comment:', err);
      setError(err.message || 'Failed to post comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="comments-section mt-5">
      <h3 className="mb-4">Comments ({comments.length})</h3>

      {/* Comments List */}
      <div className="comments-list mb-5">
        {loading ? (
          <p>Loading comments...</p>
        ) : error && comments.length === 0 ? (
          <p className="text-muted">Unable to load comments.</p>
        ) : comments.length === 0 ? (
          <p className="text-muted">No comments yet. Be the first to comment!</p>
        ) : (
          <div>
            {comments.map((comment) => (
              <div key={comment.id} className="comment mb-4 p-3 border rounded">
                <div className="comment-header mb-2">
                  <strong dangerouslySetInnerHTML={{ __html: comment.author_name }} />
                  <small className="text-muted ms-2">
                    {formatDate(comment.date)}
                  </small>
                </div>
                <div
                  className="comment-content"
                  dangerouslySetInnerHTML={{ __html: comment.content.rendered }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Comment Form */}
      <div className="comment-form">
        <h4 className="mb-3">Leave a Comment</h4>

        {success && (
          <div className="alert alert-success" role="alert">
            Comment submitted successfully! It may be pending moderation.
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="author_name" className="form-label">
              Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="author_name"
              name="author_name"
              value={formData.author_name}
              onChange={handleInputChange}
              required
              disabled={submitting}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="author_email" className="form-label">
              Email <span className="text-danger">*</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="author_email"
              name="author_email"
              value={formData.author_email}
              onChange={handleInputChange}
              required
              disabled={submitting}
            />
            <small className="form-text text-muted">
              Your email will not be published.
            </small>
          </div>

          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Comment <span className="text-danger">*</span>
            </label>
            <textarea
              className="form-control"
              id="content"
              name="content"
              rows="5"
              value={formData.content}
              onChange={handleInputChange}
              required
              disabled={submitting}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? 'Submitting...' : 'Post Comment'}
          </button>
        </form>
      </div>
    </div>
  );
};
