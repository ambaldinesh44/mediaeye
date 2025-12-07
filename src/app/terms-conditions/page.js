import TermsConditionsPage from '../../../components/TermsConditionsPage';

export const metadata = {
  title: 'Terms & Conditions | Media Eye News',
  description: 'Read our terms and conditions for using Media Eye News website and services.',
  keywords: 'terms and conditions, terms of use, legal, media eye news',
};

async function fetchTermsConditionsData() {
  try {
    const response = await fetch('https://www.mediaeyenews.com/wp-json/wp/v2/pages?slug=terms-conditions', {
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch terms and conditions content');
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
      return { content: null, error: 'Terms and conditions content not found' };
    }
  } catch (error) {
    console.error('Error fetching terms and conditions:', error);
    return { content: null, error: error.message };
  }
}

export default async function TermsConditions() {
  const { content, error } = await fetchTermsConditionsData();

  return <TermsConditionsPage content={content} error={error} />;
}