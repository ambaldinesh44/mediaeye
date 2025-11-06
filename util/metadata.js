const generateMetadatas = async (obj={}) => {
  const defaultMeta = {};

  const meta = obj;

  const title = meta?.title || "";
  const keyword = meta?.keywords || "";
  const desc = meta?.desc || "";
  const curl =meta?.url;
  const ming = meta?.img ?? "";
  return {
    title: title,
    description: desc,
    openGraph: {
      title: title,
      description: desc,
      url: meta?.url,
      siteName: "mediaeyenews",
      images: [
        {
          url: ming,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      site: "@mediaeyenews",
      title: title,
      description: desc,
      creator: "@mediaeyenews",
      images: ming,
    },
    alternates: {
      canonical: curl,
    },
    keywords: keyword,
    other: {
      author: "mediaeyenews",
    },
  };

};

export default generateMetadatas;

