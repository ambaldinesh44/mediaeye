import { SearchListPage } from "@components/SearchListPage";
import { CONFIG } from "@util/config";

export default async function PaginatedPage({ params, searchParams }) {
  const { pageNum } = await params;
  const searchParamsResolved = await searchParams;
  const term = searchParamsResolved?.s || searchParamsResolved?.search || "";
  const page = parseInt(pageNum, 10);

  let results = [];
  let totalResults = 0;

  // If search term exists, fetch search results with pagination
  if (term) {
    try {
      const perPage = 10;
      const searchUrl = `${CONFIG.API_URL}posts?search=${encodeURIComponent(term)}&orderby=date&order=desc&per_page=${perPage}&page=${page}&_embed`;
      console.log(searchUrl);
      const res = await fetch(searchUrl);

      if (!res.ok) {
        console.error(`Search failed: ${res.status} ${res.statusText}`);
        results = [];
        totalResults = 0;
      } else {
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error(`Invalid content type for search: ${contentType}`);
          const text = await res.text();
          console.error('Response body:', text.substring(0, 200));
          results = [];
          totalResults = 0;
        } else {
          results = await res.json();
          // Get total count from WordPress API header
          const totalHeader = res.headers.get('X-WP-Total');
          totalResults = totalHeader ? parseInt(totalHeader, 10) : results.length;
        }
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      results = [];
      totalResults = 0;
    }
  }

  return (
    <SearchListPage
      posts={results}
      searchTerm={term}
      currentPage={page}
      totalResults={totalResults}
    />
  );
}
