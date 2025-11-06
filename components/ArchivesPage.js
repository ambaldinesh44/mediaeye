export const ArchivesPage = ({response})=>{

    return(
        <>
      <main>
      <h1>{response.title.rendered}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: response.content.rendered }}
      ></div>
    </main>
        </>
    )
}