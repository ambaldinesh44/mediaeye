import { TagListPage } from "@components/TagListPage";
import { CONFIG } from "@util/config";
import generateMetadatas from "@util/metadata";
import Link from "next/link";
import Image from "next/image";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  try {
    // Fetch tag by slug
    const tagRes = await fetch(
      `${CONFIG.API_URL}tags?slug=${slug}`,
      { next: { revalidate: 60 } }
    );

    if (!tagRes.ok) {
      return generateMetadatas({
        title: `Tag Not Found | MediaEye News`,
        desc: `The requested tag could not be found.`,
        keywords: `news, media eye news`,
        url: `https://www.mediaeyenews.com/tag/${slug}`,
        img: '',
      });
    }

    const tags = await tagRes.json();

    if (!tags.length) {
      return generateMetadatas({
        title: `Tag Not Found | MediaEye News`,
        desc: `The requested tag could not be found.`,
        keywords: `news, media eye news`,
        url: `https://www.mediaeyenews.com/tag/${slug}`,
        img: '',
      });
    }

    const tag = tags[0];

    return generateMetadatas({
      title: `${tag.name} - Latest News & Articles | MediaEye News`,
      desc: `Browse all articles tagged with ${tag.name}. Stay updated with the latest news and stories about ${tag.name}.`,
      keywords: `${tag.name}, news, articles, latest updates, media eye news`,
      url: `https://www.mediaeyenews.com/tag/${slug}`,
      img: '',
    });
  } catch (error) {
    console.error('Error generating tag metadata:', error);
    return generateMetadatas({
      title: `Tag | MediaEye News`,
      desc: `Browse articles by tag at MediaEye News.`,
      keywords: `news, media eye news`,
      url: `https://www.mediaeyenews.com/tag/${slug}`,
      img: '',
    });
  }
}

export default async function TagPage({ params }) {
  const { slug } = await params;

  // Fetch tag by slug
  const tagRes = await fetch(
    `${CONFIG.API_URL}tags?slug=${slug}`,
    { next: { revalidate: 60 } }
  );

  if (!tagRes.ok) {
    return <h1>Tag not found</h1>;
  }

  const tags = await tagRes.json();

  if (!tags.length) {
    return <h1>Tag not found</h1>;
  }

  const tag = tags[0];

  // Fetch posts with this tag
  const postsRes = await fetch(
    `${CONFIG.API_URL}posts?tags=${tag.id}&per_page=20&_embed`,
    { next: { revalidate: 60 } }
  );

  let posts = [];
  if (postsRes.ok) {
    posts = await postsRes.json();
  }

  return (
    <>
      <div className="main-wrapper">
        <div className="breadcrumb-wrapper">
          <div className="container-custom">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb custom-breadcrumb">
                <li className="breadcrumb-item">
                  <Link href="/">
                    <i className="bi bi-house-door"></i> Home
                  </Link>
                </li>
                <li className="breadcrumb-item">
                  <a href="#">Tags</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  {tag.name}
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="container-custom">
          <div className="row g-3">
            <div className="col-lg-9 col-md-8 col-12">
              <div className="section-box">
                <div className="section-title">
                  <h2>Tag: {tag.name}</h2>
                  <span>{posts.length} {posts.length === 1 ? 'Article' : 'Articles'}</span>
                </div>

                <TagListPage posts={posts} tagName={tag.name} />
              </div>
            </div>

            <div className="col-lg-3 col-md-4 col-12">
              <div className="section-box ad-box">
                <Image
                  src="/images/add2.png"
                  alt="Advertisement"
                  width={300}
                  height={600}
                  loading="lazy"
                  className="img-fluid"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
