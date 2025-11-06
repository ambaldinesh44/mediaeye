
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
