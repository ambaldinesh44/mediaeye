import { CategoryPostList } from "@components/CategoryPostList";
import { CONFIG } from "@util/config";
import generateMetadatas from "@util/metadata";

export async function generateMetadata({ params }) {
   const { slug,page } = await params;


  const imageUrl =  "";

  console.log("metattata",{
    title: `${slug} News – Latest Updates & Breaking Stories | MediaEye News`,
    desc:`Get the latest {{slug} news from around the world. Stay informed with breaking stories, analysis, and insights at MediaEye News.`,
    keywords: `Get the latest {{slug} news from around the world. Stay informed with breaking stories, analysis, and insights at MediaEye News.`,
    url:`https://www.mediaeyenews.com/category/${slug}`,
    img: imageUrl,
  })
  return generateMetadatas({
   title: `${slug} News – Latest Updates & Breaking Stories | MediaEye News`,
    desc:`Get the latest {{slug} news from around the world. Stay informed with breaking stories, analysis, and insights at MediaEye News.`,
    keywords: `Get the latest {{slug} news from around the world. Stay informed with breaking stories, analysis, and insights at MediaEye News.`,
    url:`https://www.mediaeyenews.com/category/${slug}`,
    img: imageUrl,
  });
}
export default  async function CategoryPage({ params }) {
  const { slug,page } = await params;
console.log("ddddddddddddd-----------1",slug)
console.log("ddddddddddddd-----------2",page)


  let currentPage = 1;
  if (page && page.length == 2 && page[0] === "page") {
    currentPage = parseInt(page[1] || "1");
  }

  // 1. Get category ID by slug
 const res = await fetch(
    `${CONFIG.API_URL}categories?slug=${slug}`, { next: { revalidate: 60 } }
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
/*         const sizes = post._embedded["wp:featuredmedia"][0].media_details.sizes;
console.log("Thumbnail:", sizes.thumbnail.source_url);
console.log("Medium:", sizes.medium.source_url);
console.log("Full:", sizes.full.source_url); */

  // Fetch sidebar categories: top-news and special-news
  const sidebarCategories = {
    1: "top-news",
    72: "special-news",
  };

  const topCategoeyNews = await Promise.all(
    Object.keys(sidebarCategories).map(async (catId) => {
      try {
        const res = await fetch(
          `${CONFIG.API_URL}posts?categories=${catId}&orderby=date&order=desc&per_page=10&_embed`,
          { next: { revalidate: 60 } }
        );

        if (!res.ok) {
          console.error(`Failed to fetch category ${catId}: ${res.status} ${res.statusText}`);
          return {
            categoryId: catId,
            categoryName: sidebarCategories[catId],
            posts: [],
          };
        }

        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          console.error(`Invalid content type for category ${catId}: ${contentType}`);
          const text = await res.text();
          console.error('Response body:', text.substring(0, 200));
          return {
            categoryId: catId,
            categoryName: sidebarCategories[catId],
            posts: [],
          };
        }

        const posts = await res.json();

        return {
          categoryId: catId,
          categoryName: sidebarCategories[catId],
          posts,
        };
      } catch (error) {
        console.error(`Error fetching category ${catId}:`, error);
        return {
          categoryId: catId,
          categoryName: sidebarCategories[catId],
          posts: [],
        };
      }
    })
  );

  return (
    <>


    <CategoryPostList
      categories={categories}
      posts={posts}
      page_link_url={`/category/${slug}/`}
      perPage={perPage}
      totalPage={totalPage}
      currentPage={currentPage}
      topCategoeyNews={topCategoeyNews}
    ></CategoryPostList>
   </>
  );
}
