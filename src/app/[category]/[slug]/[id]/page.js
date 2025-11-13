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
/*   const {category, slug,page } = await params;
console.log("ddddddddddddd-----------1 ---ssss",slug,category)
console.log("ddddddddddddd-----------2",page)


  let currentPage = 1;
  if (page && page.length == 2 && page[0] === "page") {
    currentPage = parseInt(page[1] || "1");
  }

  // 1. Get category ID by slug
 const res = await fetch(
    `${CONFIG.API_URL}categories?slug=${category}`, { next: { revalidate: 60 } }
   );
  console.log("slugslugslug",category)
   const categories = await res.json();
   const perPage=10;
    if (!categories.length) return <h1>Category page main not found</h1>;
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

 */

    const { category, slug, id } = await params;

  // Remove .html if it exists
  const postId = id.replace(".html", "");
  console.log(postId);

  
  const apiUrl = `${CONFIG.API_URL}posts/${postId}`;
  console.log(apiUrl,postId);
  const res = await fetch(apiUrl, { next: { revalidate: 30 } });

  if (!res.ok) {
    return <h1>Post not found</h1>;
  }

  const post = await res.json();
  return (
      <>

<div>
      <h1>{post.title.rendered}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </div>
      </>
    
  );
}
