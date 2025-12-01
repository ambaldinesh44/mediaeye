import { CONFIG } from "@util/config";

export default async function sitemap() {
  const baseUrl = 'https://www.mediaeyenews.com';

  try {
    // Fetch all posts
    const postsRes = await fetch(`${CONFIG.API_URL}posts?per_page=100&_embed`, {
      next: { revalidate: 3600 }
    });
    const posts = await postsRes.json();

    // Fetch all categories
    const categoriesRes = await fetch(`${CONFIG.API_URL}categories?per_page=100`, {
      next: { revalidate: 3600 }
    });
    const categories = await categoriesRes.json();

    // Generate post URLs
    const postUrls = posts.map((post) => {
      const categorySlug = post._embedded?.['wp:term']?.[0]?.[0]?.slug || 'news';
      return {
        url: `${baseUrl}/${categorySlug}/${post.slug}/${post.id}.html`,
        lastModified: post.modified || post.date,
        changeFrequency: 'daily',
        priority: 0.8,
      };
    });

    // Generate category URLs
    const categoryUrls = categories.map((category) => ({
      url: `${baseUrl}/category/${category.slug}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 0.7,
    }));

    // Static pages
    const staticPages = [
      {
        url: baseUrl,
        lastModified: new Date().toISOString(),
        changeFrequency: 'hourly',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/about-us`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.5,
      },
      {
        url: `${baseUrl}/privacy-policy`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.3,
      },
      {
        url: `${baseUrl}/terms-conditions`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'monthly',
        priority: 0.3,
      },
    ];

    return [...staticPages, ...categoryUrls, ...postUrls];
  } catch (error) {
    console.error('Error generating sitemap:', error);

    // Return minimal sitemap on error
    return [
      {
        url: baseUrl,
        lastModified: new Date().toISOString(),
        changeFrequency: 'hourly',
        priority: 1.0,
      },
    ];
  }
}
