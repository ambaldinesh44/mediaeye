import { CategoryPostList } from "@components/CategoryPostList";
import { CONFIG } from "@util/config";
import generateMetadatas from "@util/metadata";

export async function generateMetadata({ params }) {
  const { categorySlug, page } = await params;

  const imageUrl = "";

  return generateMetadatas({
    title: `${categorySlug} News – Latest Updates & Breaking Stories | MediaEye News`,
    desc: `Get the latest ${categorySlug} news from around the world. Stay informed with breaking stories, analysis, and insights at MediaEye News.`,
    keywords: `Get the latest ${categorySlug} news from around the world. Stay informed with breaking stories, analysis, and insights at MediaEye News.`,
    url: `https://www.mediaeyenews.com/category/video/${categorySlug}`,
    img: imageUrl,
  });
}

export default async function VideoCategoryPage({ params }) {
  const { categorySlug, page } = await params;

  console.log("Video Category Slug:", categorySlug);
  console.log("Page param:", page);

  let currentPage = 1;
  if (page && page.length == 2 && page[0] === "page") {
    currentPage = parseInt(page[1] || "1");
  }

  try {
    // Get category ID by categorySlug
    const res = await fetch(
      `${CONFIG.API_URL}categories?slug=${categorySlug}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      return <h1>Category not found</h1>;
    }

    console.log("Searching for category:", categorySlug);
    const categories = await res.json();
    const perPage = 10;

    if (!categories.length) return <h1>Category not found</h1>;

    const catId = categories[0].id;

    const res1 = await fetch(
      `${CONFIG.API_URL}posts?categories=${catId}&per_page=${perPage}&page=${currentPage}&_embed`,
      { next: { revalidate: 60 } }
    );

    if (!res1.ok) {
      return (
        <>
          <CategoryPostList
            categories={categories}
            posts={[]}
            page_link_url={`/category/video/${categorySlug}/`}
            perPage={perPage}
            totalPage={0}
            currentPage={currentPage}
          />
        </>
      );
    }

    const posts = await res1.json();
    const totalPage = res1.headers.get("X-WP-Total");

    console.log("Total posts:", totalPage, "Category ID:", catId);

    return (
      <>
        <CategoryPostList
          categories={categories}
          posts={posts}
          page_link_url={`/category/video/${categorySlug}/`}
          perPage={perPage}
          totalPage={totalPage}
          currentPage={currentPage}
        />
      </>
    );
  } catch (error) {
    console.error("Error fetching category:", error);
    return <h1>Error loading category</h1>;
  }
}
