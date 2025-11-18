import { Comments } from './Comments';
import { SocialShare } from './SocialShare';

export const ViewPage = ({post, url})=>{

    return(
        <>

<div>
      <h1>{post.title.rendered}</h1>

      {/* Social Share Buttons */}
      <SocialShare
        url={url}
        title={post.title.rendered}
        description={post.excerpt?.rendered?.replace(/<[^>]*>/g, '') || ''}
      />

      <div
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />

      {/* Comments Section */}
      <Comments postId={post.id} />
    </div>
        </>
    )
}