/* 
import { CategoryList } from "@components/CategoryList";
import { CONFIG } from "@util/config";

export default  async function CategoryPage({ params }) {
  const { slug } = await params;
console.log("ddddddddddddd",slug)
    const res = await fetch(
      `${CONFIG.API_URL}categories?per_page=100&_embed`,
    { next: { revalidate: 60 } }
    );
   const posts = await res.json(); 

     const totalCategories = res.headers.get("X-WP-Total");
     console.log("totalCategories",totalCategories)
  //console.log("poststs",posts)
  return (
    <>
    <CategoryList categories={posts}></CategoryList> 
    </>
  );
}
 */
/* 
import { CategoryPostList } from "@components/CategoryPostList";
import { CONFIG } from "@util/config";
import generateMetadatas from "@util/metadata";
export async function generateMetadata({ params }) {
   const { category,slug,page } = await params;


  const imageUrl =  "";

  console.log("metattata",{
    title: `${slug} News – Latest Updates & Breaking Stories | MediaEye News`,
    desc:`Get the latest {{slug} news from around the world. Stay informed with breaking stories, analysis, and insights at MediaEye News.`,
    keywords: `Get the latest {{slug} news from around the world. Stay informed with breaking stories, analysis, and insights at MediaEye News.`,
    url:`https://www.mediaeyenews.com/${slug}`,
    img: imageUrl,
  })
  return generateMetadatas({
   title: `${slug} News – Latest Updates & Breaking Stories | MediaEye News`,
    desc:`Get the latest {{slug} news from around the world. Stay informed with breaking stories, analysis, and insights at MediaEye News.`,
    keywords: `Get the latest {{slug} news from around the world. Stay informed with breaking stories, analysis, and insights at MediaEye News.`,
    url:`https://www.mediaeyenews.com/${slug}`,
    img: imageUrl,
  });
}
export default  async function CategoryPage({ params }) {
  const { category,slug,page } = await params;
console.log("ddddddddddddd-----------11",slug)
console.log("ddddddddddddd-----------22",page)


  let currentPage = 1;
  if (page && page.length == 2 && page[0] === "page") {
    currentPage = parseInt(page[1] || "1");
  }

  // 1. Get category ID by slug
 const res = await fetch(
    `${CONFIG.API_URL}categories?slug=${category}`, { next: { revalidate: 60 } }
   );
  console.log("slugslugslug",slug)
   const categories = await res.json();
   const perPage=10;
    if (!categories.length) return <h1>Category not found</h1>;
  const catId = categories[0].id;

   //console.log("categoriescategoriescategories",categories) 

    const res1 = await fetch(
      `${CONFIG.API_URL}posts?categories=${catId}&per_page=${perPage}&page=${currentPage}&_embed`,
    { next: { revalidate: 60 } }
    );
   const posts = await res1.json(); 
   console.log("ffff",res1.headers.get("X-WP-Total"))
    const totalPages = res.headers.get("X-WP-TotalPages");
     const totalPage = res1.headers.get("X-WP-Total");
    console.log("totalPages",totalPage,`${CONFIG.API_URL}posts?categories=${catId}&per_page=${perPage}&page=${currentPage}&_embed`)
const post = posts[0];
    //    console.log("res1",posts)


  return (
    <CategoryPostList categories={categories} posts={posts} page_link_url={`/category/${slug}/`} perPage={perPage} totalPage ={totalPage} currentPage={currentPage}></CategoryPostList>
  
  );
}
 */


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
console.log("hhhhhhhhhhhhhhhhhhhhhhPPPPPPPPPpppppp",CONFIG.API_URL)
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
          console.log(`${CONFIG.API_URL}posts?categories=${catId}&orderby=date&order=desc&per_page=10&_embed`);

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
  
  {JSON.stringify(topCategoeyNews)}
</pre>

   <HomePage term={term} results={results} categoryNews={topCategoeyNews}></HomePage>
    </>
  )   
}
