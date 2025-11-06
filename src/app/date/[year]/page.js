import { CONFIG } from "@util/config";
import { DateWisePostPage } from "@components/DateWisePostPage";
import { redirect } from "next/navigation";
export async function generateMetadata({ params }) {
 
  const { year } = params;
  return {
    title: `News Archive for ${year} | MediaEye News`,
    description: `Browse all news published in ${year} on MediaEye News.`,
  };
}

export default async function YearArchivePage({ params }) {
   const currentYear = new Date().getFullYear();
  const { year } = params;
   const isValidYear = /^\d{4}$/.test(year);

  if (!isValidYear) {
    // Redirect invalid input to current year
    redirect(`/date/${currentYear}`);
  }
      const perPage=10;
  const startDate = `${year}-01-01T00:00:00`;
  const endDate = `${year}-12-31T23:59:59`;
const currentPage=1;
  const res = await fetch(
    `${CONFIG.API_URL}posts?after=${startDate}&before=${endDate}&per_page=${perPage}&page=${currentPage}&_embed`,
    { cache: "no-store" }
  );

  if (!res.ok) return <h1>Archive not found</h1>;
  const posts = await res.json();
  const totalPage = res.headers.get("X-WP-Total");
  return (
    <DateWisePostPage posts={posts}  perPage={perPage} totalPage ={totalPage} page_link_url={`/date/${year}/`}  currentPage={currentPage} year={year}></DateWisePostPage>
     
  );
}
