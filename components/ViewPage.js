'use client';

import { Comments } from './Comments';
import { SocialShare } from './SocialShare';
import { RelatedPosts } from './RelatedPosts';

export const ViewPage = ({post, url, relatedPosts})=>{

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

      {/* Related Posts Section */}
     <RelatedPosts posts={relatedPosts} /> 

      {/* Comments Section */}
      <Comments postId={post.id} />
    </div>
        </>
    )
}