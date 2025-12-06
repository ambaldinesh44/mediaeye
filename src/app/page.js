
import { HomePage } from "@components/HomePage";
import { SearchListPage } from "@components/SearchListPage";
import { CONFIG } from "@util/config";

export default async function WelcomePage({ searchParams }) {
  /* 
      const resSettings = await fetch(`${CONFIG.API_URL}settings`, { cache: "no-store" });
    const settings = await resSettings.json();
  console.log("settingssettings",settings) 
  
  const res = await fetch(`${CONFIG.API_URL}widget-areas`);
  const widgetAreas = await res.json();
  console.log("widget",widgetAreas); */

  const params = await searchParams;
  const term = params?.s || params?.search || ""; // e.g. ?s=finesh or ?search=finesh

  let results = [];
  let topCategoeyNews = [];
  let top_news = [];
  let mostViewed = [];
  let trendingTopics = [];

  // If search term exists, fetch search results
  if (term) {
    try {
      console.log(`${CONFIG.API_URL}posts?search=${encodeURIComponent(term)}&orderby=date&order=desc&per_page=10&_embed`);
      const res = await fetch(
        `${CONFIG.API_URL}posts?search=${encodeURIComponent(term)}&orderby=date&order=desc&per_page=10&_embed`
      );

      if (!res.ok) {
        console.error(`Search failed: ${res.status} ${res.statusText}`);
        results = [];
      } else {
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error(`Invalid content type for search: ${contentType}`);
          const text = await res.text();
          console.error('Response body:', text.substring(0, 200));
          results = [];
        } else {
          results = await res.json();
        }
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      results = [];
    }
  } else {
    // Fetch category 72 top 10 latest posts
    try {
      const cat72Res = await fetch(
        `${CONFIG.API_URL}posts?categories=72&orderby=date&order=desc&per_page=10&_embed`,
        { cache: "no-store" }
      );

      if (!cat72Res.ok) {
        console.error(`Failed to fetch category 72: ${cat72Res.status} ${cat72Res.statusText}`);
        top_news = [];
      } else {
        const contentType = cat72Res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error(`Invalid content type for category 72: ${contentType}`);
          top_news = [];
        } else {
          top_news = await cat72Res.json();
        }
      }
    } catch (error) {
      console.error('Error fetching category 72 posts:', error);
      top_news = [];
    }

    // Fetch most viewed posts from today to 7 days ago (5 posts)
    try {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const afterDate = sevenDaysAgo.toISOString();
      console.log(`${CONFIG.MEDIAEYE_V1_URl}most-viewed-week`)
      const mostViewedRes = await fetch(
        `${CONFIG.MEDIAEYE_V1_URl}most-viewed-week`,
        { cache: "no-store" }
      );

      if (!mostViewedRes.ok) {
        console.error(`Failed to fetch most viewed posts: ${mostViewedRes.status} ${mostViewedRes.statusText}`);
        mostViewed = [];
      } else {
        const contentType = mostViewedRes.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error(`Invalid content type for most viewed posts: ${contentType}`);
          mostViewed = [];
        } else {
          mostViewed = await mostViewedRes.json();
        }
      }
    } catch (error) {
      console.error('Error fetching most viewed posts:', error);
      mostViewed = [];
    }

    // Otherwise, fetch category news
    //special News - 72(1043)
    const cat = {
      10797: "hot-news",
      6: "national",
      8: "international",
      40: "blog",
      1: "top-news",
      30: "video",
      72: "special-news",
      13: "education",
      5: "city",
      20: "science",
      56: "technology",
      13924: "editorial",
      12: "business",
      17: "cinema",
      94: "esg",
       11: "sports-news",
         10: "politics",
          16: "personality",
      //   
      /*  12: "business",
       1043:"special-news",
       6: "national",
       47: "crime",
       8: "international",
       16: "personality",
       10: "politics",
       10797: "hot-news",
       2377: "cricket" */
    };
    const categories = [
      10797,
      6, 8, 40, 1, 30,
      72,
      13,
      5,
      20,
      56,
      13924,
      12,
      17,
      94,
      11,
      10,
      16
      /*   12,
        1043,
        6,
        47,
        8,
        16,
        10,
        10797,
        2377, */
    ];

    /* const ress = await fetch(
      `${CONFIG.API_URL}posts?categories=${categories.join(',')}&orderby=date&order=desc&per_page=10&_embed`
    );

    // Convert to plain JSON before passing to Client Component
    const allPosts = await ress.json();

    // ✅ Group posts per category
    const topCategoeyNews = categories.map((catId, index) => {
      const categoryName = categories_name[index]; // link name ↔️ id

      const filteredPosts = allPosts.filter((post) =>
        post.categories.includes(catId)
      );

      return {
        categoryId: catId,
        categoryName: categoryName,
        posts: filteredPosts.slice(0, 10), // top 10 per category
      };
    }); */

    topCategoeyNews = await Promise.all(
      categories.map(async (catId) => {
        try {
          const res = await fetch(
            `${CONFIG.API_URL}posts?categories=${catId}&orderby=date&order=desc&per_page=10&_embed`,
            { cache: "no-store" }
          );

          // Check if response is ok
          if (!res.ok) {
            console.error(`Failed to fetch category ${catId}: ${res.status} ${res.statusText}`);
            return {
              categoryId: catId,
              categoryName: cat[catId],
              posts: [],
            };
          }

          // Check content type before parsing JSON
          const contentType = res.headers.get('content-type');
          if (!contentType || !contentType.includes('application/json')) {
            console.error(`Invalid content type for category ${catId}: ${contentType}`);
            const text = await res.text();
            console.error('Response body:', text.substring(0, 200));
            return {
              categoryId: catId,
              categoryName: cat[catId],
              posts: [],
            };
          }

          const posts = await res.json();

          return {
            categoryId: catId,
            categoryName: cat[catId],
            posts,
          };
        } catch (error) {
          console.error(`Error fetching category ${catId}:`, error);
          return {
            categoryId: catId,
            categoryName: cat[catId],
            posts: [],
          };
        }
      })
    );

    // Fetch latest 10 posts from all categories
    try {
      const latestRes = await fetch(
        `${CONFIG.API_URL}posts?orderby=date&order=desc&per_page=10&_embed`,
        { cache: "no-store" }
      );

      if (!latestRes.ok) {
        console.error(`Failed to fetch latest posts: ${latestRes.status} ${latestRes.statusText}`);
        results = [];
      } else {
        const contentType = latestRes.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error(`Invalid content type for latest posts: ${contentType}`);
          const text = await latestRes.text();
          console.error('Response body:', text.substring(0, 200));
          results = [];
        } else {
          results = await latestRes.json();
        }
      }
    } catch (error) {
      console.error('Error fetching latest posts:', error);
      results = [];
    }

    // Fetch trending topics (tags with most posts)
    try {
      const trendingRes = await fetch(
        `${CONFIG.API_URL}tags?orderby=count&order=desc&per_page=5&_embed`,
        { cache: "no-store" }
      );

      if (!trendingRes.ok) {
        console.error(`Failed to fetch trending topics: ${trendingRes.status} ${trendingRes.statusText}`);
        trendingTopics = [];
      } else {
        const contentType = trendingRes.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error(`Invalid content type for trending topics: ${contentType}`);
          trendingTopics = [];
        } else {
          const tags = await trendingRes.json();
          // Format the response to match the trending structure
          trendingTopics = tags.map(tag => ({
            name: tag.name,
            count: tag.count,
            slug: tag.slug,
            link: `/tag/${tag.slug}`
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching trending topics:', error);
      trendingTopics = [];
    }
  }

  //
  //console.log(topCategoeyNews);


  // Build the API URL
  //const apiUrl = `${CONFIG.API_URL}posts?search=${encodeURIComponent(term)}&${categoryQuery}&orderby=date&order=desc&per_page=10&_embed`;

  //console.log(apiUrl);

  // Fetch results
  //const topCategoeyNews = await fetch(apiUrl);
  //console.log("top_news",top_news)

  return (
    <>
      <pre style={{ display: "none" }}>
        {JSON.stringify(mostViewed)}
      </pre>

      {term ? (
        <SearchListPage posts={results} searchTerm={term} />
      ) : (
        <HomePage term={term} results={results} categoryNews={topCategoeyNews} top_news={top_news} mostViewed={mostViewed} trendingTopics={trendingTopics} />
      )}
    </>
  )
}
