
import { CategoryList } from "@components/CategoryList";
import { CONFIG } from "@util/config";

export default  async function CategoryPage({ params }) {
  const { slug } = await params;
console.log("ddddddddddddd",slug)
    const res = await fetch(
      `${CONFIG.API_URL}categories?page=2&per_page=100&_embed`,
    { next: { revalidate: 60 } }
    );
   const posts = await res.json();

     const totalCategories = parseInt(res.headers.get("X-WP-Total") || "0", 10);
     console.log("totalCategories",totalCategories)
 // console.log("poststs",posts)
  return (
    <>
        <pre style={{display:"none"}}>
  {JSON.stringify(posts)}
</pre>

    <CategoryList categories={posts} totalCount={totalCategories}></CategoryList>
    </>
  );
}
