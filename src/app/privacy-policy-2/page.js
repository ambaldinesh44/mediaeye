import PrivacyPolicyPage from '../../../components/PrivacyPolicyPage';

export const metadata = {
  title: 'Privacy Policy | Media Eye News',
  description: 'Read our privacy policy to understand how Media Eye News collects, uses, and protects your personal information.',
  keywords: 'privacy policy, data protection, privacy, media eye news',
};

async function fetchPrivacyPolicyData() {
  try {
    const response = await fetch('https://www.mediaeyenews.com/wp-json/wp/v2/pages?slug=privacy-policy-2', {
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error('Failed to fetch privacy policy content');
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
      return { content: null, error: 'Privacy policy content not found' };
    }
  } catch (error) {
    console.error('Error fetching privacy policy:', error);
    return { content: null, error: error.message };
  }
}

export default async function PrivacyPolicy() {
  const { content, error } = await fetchPrivacyPolicyData();

  return <PrivacyPolicyPage content={content} error={error} />;
}
