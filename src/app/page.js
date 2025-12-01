
import { HomePage } from "@components/HomePage";
import { CONFIG } from "@util/config";

export default async function WelcomePage({searchParams }) {
/* 
    const resSettings = await fetch(`${CONFIG.API_URL}settings`, { cache: "no-store" });
  const settings = await resSettings.json();
console.log("settingssettings",settings) 

const res = await fetch(`${CONFIG.API_URL}widget-areas`);
const widgetAreas = await res.json();
console.log("widget",widgetAreas); */

  const params = await searchParams;
  const term = params?.s || ""; // e.g. ?s=finesh

  let results = [];
  let topCategoeyNews = [];

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
    // Otherwise, fetch category news
    const categories_name = [
      'business',
      'national',
      'crime',
      'international',
      'personality',
      'politics',
      'hot-news',
      'cricket',
    ];
    const cat = {
      12: "business",
      6: "national",
      47: "crime",
      8: "international",
      16: "personality",
      10: "politics",
      10797: "hot-news",
      2377: "cricket"
    };
    const categories = [
      12,
      6,
      47,
      8,
      16,
      10,
      10797,
      2377,
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
        `${CONFIG.API_URL}posts?categories=${categories.join(',')}&orderby=date&order=desc&per_page=10&_embed`,
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
  }

//
//console.log(topCategoeyNews);


// Build the API URL
//const apiUrl = `${CONFIG.API_URL}posts?search=${encodeURIComponent(term)}&${categoryQuery}&orderby=date&order=desc&per_page=10&_embed`;

//console.log(apiUrl);

// Fetch results
//const topCategoeyNews = await fetch(apiUrl);


  return (
    <>
  <pre style={{display:"none"}}>
  
  {JSON.stringify(results)}
</pre>

   <HomePage term={term} results={results} categoryNews={topCategoeyNews}></HomePage>
    </>
  )   
}
