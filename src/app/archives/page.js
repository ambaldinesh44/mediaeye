import { ArchivesPage } from "@components/ArchivesPage"
import { CONFIG } from "@util/config";



export default async function Page({searchParams }) {

 const res = await fetch(
    `${CONFIG.API_URL}pages?slug=archives&_embed`,
    { cache: "no-store" } 
  );

  if (!res.ok) throw new Error("Archives page not found");
  const [page] = await res.json();
console.log("apagte",page)

  return (
    <>
   <ArchivesPage response={page} />
    </>
  )   
}
