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
    url: `https://www.mediaeyenews.com/category/announcement/${categorySlug}`,
    img: imageUrl,
  });
}

export default async function AnnouncementCategoryPage({ params }) {
  const { categorySlug, page } = await params;

  console.log("Announcement Category Slug:", categorySlug);
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
            page_link_url={`/category/announcement/${categorySlug}/`}
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
          page_link_url={`/category/announcement/${categorySlug}/`}
          perPage={perPage}
          totalPage={totalPage}
          currentPage={currentPage}
          topCategoeyNews={topCategoeyNews}
        />
      </>
    );
  } catch (error) {
    console.error("Error fetching category:", error);
    return <h1>Error loading category</h1>;
  }
}
