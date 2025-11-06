import { DateWisePostPage } from "@components/DateWisePostPage";
import { CONFIG } from "@util/config";
import { redirect } from "next/navigation";
export async function generateMetadata({ params }) {
const currentYear = new Date().getFullYear();
  return {
    title: `News Archive for ${currentYear} | MediaEye News`,
    description: `Browse all news published in ${currentYear} on MediaEye News.`,
  };
}

export default async function YearArchivePage({ params }) {
    const { slug,page } = await params;
     const perPage=10;
     
  let currentPage = 1;
  if (page && page.length == 2 && page[0] === "page") {
    currentPage = parseInt(page[1] || "1");
  }

const currentYear = new Date().getFullYear();
  const startDate = `${currentYear}-01-01T00:00:00`;
  const endDate = `${currentYear}-12-31T23:59:59`;

  const res = await fetch(
   `${CONFIG.API_URL}posts?after=${startDate}&before=${endDate}&per_page=${perPage}&page=${currentPage}&_embed`,
    { cache: "no-store" }
  );

  if (!res.ok) return <h1>Archive not found</h1>;
  const posts = await res.json();
    const totalPages = res.headers.get("X-WP-TotalPages");
     const totalPage = res.headers.get("X-WP-Total");
     console.log("totalPage",totalPage)
  return (
    <DateWisePostPage posts={posts}  perPage={perPage} totalPage ={totalPage} page_link_url={`/date/${currentYear}/`}  currentPage={currentPage} year={currentYear}></DateWisePostPage>
   
  );
}
