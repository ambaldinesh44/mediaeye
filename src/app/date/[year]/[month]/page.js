
import { CONFIG } from "@util/config";
import { redirect } from "next/navigation";
export async function generateMetadata({ params }) {
  const { year, month } = params;
  const monthName = new Date(`${year}-${month}-01`).toLocaleString("default", {
    month: "long",
  });

  return {
    title: `Archive for ${monthName} ${year} | MediaEye News`,
    description: `Browse all news articles from ${monthName} ${year} on MediaEye News.`,
  };
}

export default async function MonthArchivePage({ params }) {
  const { year, month } = params;
const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
   const isValidYear = /^\d{4}$/.test(year);

  // Validate month: must be a number between 01 and 12
  const isValidMonth = /^(0?[1-9]|1[0-2])$/.test(month)
  const validYear = isValidYear ? year : currentYear;
  const validMonth = isValidMonth
    ? month.padStart(2, "0") // ensure 2-digit month
    : currentMonth;

  // Redirect if either value is invalid
  if (!isValidYear || !isValidMonth) {
    redirect(`/date/${validYear}/${validMonth}`);
  }
  const startDate = `${year}-${month}-01T00:00:00`;
  const endDate = `${year}-${month}-31T23:59:59`;

  const res = await fetch(
    `${CONFIG.API_URL}posts?after=${startDate}&before=${endDate}&per_page=12&_embed`,
    { cache: "no-store" }
  );

  if (!res.ok) return <h1>Archive not found</h1>;
  const posts = await res.json();

  const monthName = new Date(`${year}-${month}-01`).toLocaleString("default", {
    month: "long",
  });

  return (
    <main className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">
        Archive for {monthName} {year}
      </h1>

      {posts.length === 0 ? (
        <p>No posts found for {monthName} {year}.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border-b pb-2">
              <a
                href={post.link.replace("https://www.mediaeyenews.com", "")}
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                className="text-lg text-blue-600 hover:underline"
              ></a>
              <p className="text-sm text-gray-500">
                {new Date(post.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
