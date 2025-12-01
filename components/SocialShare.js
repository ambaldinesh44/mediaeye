'use client';

import { useState } from 'react';

export const SocialShare = ({ url, title, description }) => {
  const [copied, setCopied] = useState(false);

  // Encode the URL and title for sharing
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  // Social share URLs
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
    reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedTitle}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  return (
    <div className="d-flex align-items-center gap-2">
      {/* Facebook */}
      <i
        className="bi bi-facebook"
        onClick={() => handleShare('facebook')}
        style={{ cursor: 'pointer', fontSize: '18px', color: '#1877f2' }}
        aria-label="Share on Facebook"
      />

      {/* Twitter */}
      <i
        className="bi bi-twitter"
        onClick={() => handleShare('twitter')}
        style={{ cursor: 'pointer', fontSize: '18px', color: '#1da1f2' }}
        aria-label="Share on Twitter"
      />

      {/* LinkedIn */}
      <i
        className="bi bi-linkedin"
        onClick={() => handleShare('linkedin')}
        style={{ cursor: 'pointer', fontSize: '18px', color: '#0077b5' }}
        aria-label="Share on LinkedIn"
      />

      {/* Pinterest */}
      <i
        className="bi bi-pinterest"
        onClick={() => handleShare('pinterest')}
        style={{ cursor: 'pointer', fontSize: '18px', color: '#bd081c' }}
        aria-label="Share on Pinterest"
      />

      {/* WhatsApp */}
      <i
        className="bi bi-whatsapp"
        onClick={() => handleShare('whatsapp')}
        style={{ cursor: 'pointer', fontSize: '18px', color: '#25d366' }}
        aria-label="Share on WhatsApp"
      />
    </div>
  );
};
