"use client"
import Pagination from './Pagination';
export const DateWisePostPage = ({posts=[],currentPage=1,totalPage=0,page_link_url,perPage,year})=>{
    return(
        <>
         <main className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Archive for {year}</h1>

      {posts.length === 0 ? (
        <p>No posts found for {year}.</p>
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
totalPage--{totalPage}
          <Pagination currentPage={currentPage} totalPage={totalPage} perPage={perPage} page_link_url={page_link_url}/>
    </main>
        </>
    )

}