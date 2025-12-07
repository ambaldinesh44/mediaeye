import '../style/static-page.css';

export default function TermsConditionsPage({ content, error }) {
  if (error) {
    return (
             <div className='main-wrapper'>

          <div className="static-page-container">
            <div className="error-message">
              <i className="bi bi-exclamation-triangle"></i>
              <h3>Error Loading Terms & Conditions</h3>
              <p>{error}</p>
            </div>
          </div>
        </div>
  
    );
  }

  if (!content) {
    return (
                <div className='main-wrapper'>

          <div className="static-page-container">
            <div className="error-message">
              <i className="bi bi-exclamation-triangle"></i>
              <h3>Content Not Found</h3>
              <p>The terms and conditions content could not be found.</p>
            </div>
          </div>
        </div>
  
    );
  }

  return (
             <div className='main-wrapper'>

        <div className="static-page-container">
          <div className="static-page-header">
            <h1 dangerouslySetInnerHTML={{ __html: content?.title?.rendered || 'Terms & Conditions' }} />
            {content?.date && (
              <p className="last-updated">
                Last Updated: {new Date(content.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            )}
          </div>

          <div
            className="static-page-content"
            dangerouslySetInnerHTML={{ __html: content?.content?.rendered }}
          />
        </div>
      </div>

  );
}
