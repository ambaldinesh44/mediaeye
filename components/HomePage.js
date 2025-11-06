"use client"
export const HomePage = ({term='',results=[],categoryNews=[]})=>{
    const newsItems = [
  "Breaking: Market hits new high",
  "Weather: Heavy rains expected tomorrow",
  "Sports: Local team wins championship",
  "Tech: New smartphone released",
];

        return(
            <>
          <section>
      <h1>Search Results for {term}</h1>
      {results.length ? (
        <ul>
          {results.map(post => (
            <li key={post.id}>
              <a href={post.link.replace("https://www.mediaeyenews.com", "")}>
                {post.title.rendered}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}

   {categoryNews?.length ? (
    <>
     {categoryNews?.map(cat => (
      <>
    <h2>{cat?.categoryName}</h2>
        <ul>
          {cat?.posts?.map(post => (
            <li key={post.id}>
              <a href={post.link.replace("https://www.mediaeyenews.com", "")}>
                {post.title.rendered}
              </a>
            </li>
          ))}
        </ul>
           </>
        ))}
     
        </>
      ) : (
        <p>No results found.</p>
      )}


    </section>
            </>
        )
}