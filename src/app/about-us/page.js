import AboutUsPage from '../../../components/AboutUsPage';

export const metadata = {
  title: 'About Us | Media Eye News',
  description: 'Learn more about Media Eye News - your trusted source for breaking news, in-depth analysis, and comprehensive coverage.',
  keywords: 'about us, media eye news, news organization, about',
};

async function fetchAboutUsData() {
  try {
    const response = await fetch('https://www.mediaeyenews.com/wp-json/wp/v2/pages?slug=about-us', {
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch about us content');
    }

    const data = await response.json();

    if (data && data.length > 0) {
      const cleanedContent = {
        ...data[0],
        content: {
          ...data[0].content,
          rendered: data[0].content.rendered
            .replace(/\[vc_row\]/g, '')
            .replace(/\[\/vc_row\]/g, '')
            .replace(/\[vc_column\]/g, '')
            .replace(/\[\/vc_column\]/g, '')
            .replace(/\[vc_column_text\]/g, '')
            .replace(/\[\/vc_column_text\]/g, '')
        }
      };
      return { content: cleanedContent, error: null };
    } else {
      return { content: null, error: 'About us content not found' };
    }
  } catch (error) {
    console.error('Error fetching about us:', error);
    return { content: null, error: error.message };
  }
}

export default async function AboutUs() {
  const { content, error } = await fetchAboutUsData();

  return <AboutUsPage content={content} error={error} />;
}