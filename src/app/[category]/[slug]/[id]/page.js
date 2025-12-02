import { ViewPage } from "@components/ViewPage";
import { CONFIG } from "@util/config";
import generateMetadatas from "@util/metadata";

export async function generateMetadata({ params }) {
  const { category, slug, id } = await params;
  const postId = id.replace(".html", "");

  try {
    const apiUrl = `${CONFIG.API_URL}posts/${postId}?_embed`;
    const res = await fetch(apiUrl, { next: { revalidate: 30 } });

    if (!res.ok) {
      return generateMetadatas({
        title: `Article Not Found | MediaEye News`,
        desc: `The requested article could not be found.`,
        keywords: `news, media eye news`,
        url: `https://www.mediaeyenews.com/${category}/${slug}/${id}`,
        img: '',
      });
    }

    const post = await res.json();

    // Get featured image
    const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

    // Get clean title and excerpt
    const cleanTitle = post.title.rendered?.replace(/<[^>]*>/g, '') || 'Article';
    const cleanExcerpt = post.excerpt?.rendered?.replace(/<[^>]*>/g, '').substring(0, 160) || '';

    // Get category name
    const categoryName = post._embedded?.['wp:term']?.[0]?.[0]?.name || 'News';

    // Get author name
    const authorName = post._embedded?.author?.[0]?.name || 'MediaEye News';

    // Format date
    const publishedDate = post.date || new Date().toISOString();
    const modifiedDate = post.modified || publishedDate;

    return generateMetadatas({
      title: `${cleanTitle} | ${categoryName} | MediaEye News`,
      desc: cleanExcerpt || `Read the latest article on ${categoryName} at MediaEye News.`,
      keywords: `${categoryName}, ${cleanTitle}, news, breaking news, latest news`,
      url: `https://www.mediaeyenews.com/${category}/${slug}/${id}`,
      img: imageUrl,
      article: {
        publishedTime: publishedDate,
        modifiedTime: modifiedDate,
        author: authorName,
        section: categoryName,
      }
    });
  } catch (error) {
    console.error('Error generating metadata:', error);
    return generateMetadatas({
      title: `Article | MediaEye News`,
      desc: `Read the latest news and updates at MediaEye News.`,
      keywords: `news, media eye news`,
      url: `https://www.mediaeyenews.com/${category}/${slug}/${id}`,
      img: '',
    });
  }
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
 // console.log(postId);

  
  const apiUrl = `${CONFIG.API_URL}posts/${postId}?_embed`;
 /// console.log(apiUrl,postId);
  const res = await fetch(apiUrl, { next: { revalidate: 30 } });

  if (!res.ok) {
    return <h1>Post not found</h1>;
  }

  const post = await res.json();

  // Build the full URL for sharing
  const fullUrl = `https://www.mediaeyenews.com/${category}/${slug}/${id}`;

  // Fetch related posts based on the post's category
  let relatedPosts = [];
  if (post.categories && post.categories.length > 0) {
    try {
      const categoryId = post.categories[0];
      const relatedRes = await fetch(
        `${CONFIG.API_URL}posts?categories=${categoryId}&per_page=6&exclude=${postId}&orderby=date&order=desc&_embed`,
        { next: { revalidate: 30 } }
      );

      if (relatedRes.ok) {
        const contentType = relatedRes.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          relatedPosts = await relatedRes.json();
        }
      }
    } catch (error) {
      console.error('Error fetching related posts:', error);
      relatedPosts = [];
    }
  }

  // Fetch previous and next posts based on date (no category filter)
  let prevPost = null;
  let nextPost = null;

  try {
    // Fetch previous post (older post before current post's date)
    const prevRes = await fetch(
      `${CONFIG.API_URL}posts?per_page=1&before=${post.date}&orderby=date&order=desc&_embed`,
      { next: { revalidate: 30 } }
    );
    if (prevRes.ok) {
      const prevPosts = await prevRes.json();
      if (prevPosts.length > 0) {
        prevPost = prevPosts[0];
      }
    }

    // Fetch next post (newer post after current post's date)
    const nextRes = await fetch(
      `${CONFIG.API_URL}posts?per_page=1&after=${post.date}&orderby=date&order=asc&_embed`,
      { next: { revalidate: 30 } }
    );
    if (nextRes.ok) {
      const nextPosts = await nextRes.json();
      if (nextPosts.length > 0) {
        nextPost = nextPosts[0];
      }
    }
  } catch (error) {
    console.error('Error fetching prev/next posts:', error);
  }

  return (
      <>
      <ViewPage post={post} url={fullUrl} relatedPosts={relatedPosts} prevPost={prevPost} nextPost={nextPost}/>

{/* <div>
      <h1>{post.title.rendered}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </div> */}
      </>
    
  );
}
