import { AuthorListPage } from "@components/AuthorListPage";
import { CONFIG } from "@util/config";
import generateMetadatas from "@util/metadata";

export async function generateMetadata({ params }) {
  const { authorname } = await params;

  return generateMetadatas({
    title: `Articles by ${authorname} – MediaEye News`,
    desc: `Read all articles written by ${authorname}. Stay updated with their latest stories and insights at MediaEye News.`,
    keywords: `${authorname}, author, articles, MediaEye News`,
    url: `https://www.mediaeyenews.com/author/${authorname}`,
    img: "",
  });
}

export default async function AuthorPage({ params }) {
  const { authorname } = await params;

  const perPage = 10;
  const currentPage = 1;

  try {
    // 1. Get author by ID (authorname is actually the author ID)
    const authorId = parseInt(authorname);

    const authorRes = await fetch(
      `${CONFIG.API_URL}users/${authorId}`,
      { next: { revalidate: 60 } }
    );

    if (!authorRes.ok) {
      console.error('Author fetch failed:', authorRes.status, authorRes.statusText);
      return <h1>Author not found</h1>;
    }

    const author = await authorRes.json();

    if (!author || !author.id) {
      console.log('No author found with ID:', authorname);
      return <h1>Author not found</h1>;
    }

    console.log('Author found:', author.name, 'ID:', authorId);

    // 2. Get posts by author
    const postsRes = await fetch(
      `${CONFIG.API_URL}posts?author=${authorId}&per_page=${perPage}&page=${currentPage}&_embed`,
      { next: { revalidate: 60 } }
    );

    if (!postsRes.ok) {
      console.error('Posts fetch failed:', postsRes.status, postsRes.statusText);
      return (
        <>
          <AuthorListPage
            author={author}
            posts={[]}
            page_link_url={`/author/${authorname}/`}
            perPage={perPage}
            totalPage={0}
            currentPage={currentPage}
          />
        </>
      );
    }

    const posts = await postsRes.json();
    const totalPage = postsRes.headers.get("X-WP-Total");

    return (
      <>
        <AuthorListPage
          author={author}
          posts={posts}
          page_link_url={`/author/${authorname}/`}
          perPage={perPage}
          totalPage={totalPage}
          currentPage={currentPage}
        />
      </>
    );
  } catch (error) {
    console.error('Error in AuthorPage:', error);
    return <h1>Error loading author page. Please try again later.</h1>;
  }
}
