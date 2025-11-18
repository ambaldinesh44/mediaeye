import { NextResponse } from 'next/server';
import { CONFIG } from '@util/config';

// GET /api/comments?postId=123
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    console.log(`Fetching comments for post ${postId}`);

    const response = await fetch(
      `${CONFIG.API_URL}comments?post=${postId}&per_page=100&order=asc`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      console.error(`WordPress API error: ${response.status} ${response.statusText}`);

      // If 404, return empty array
      if (response.status === 404) {
        return NextResponse.json([]);
      }

      return NextResponse.json(
        { error: `Failed to fetch comments: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(Array.isArray(data) ? data : []);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch comments' },
      { status: 500 }
    );
  }
}

// POST /api/comments
export async function POST(request) {
  try {
    const body = await request.json();
    const { post, author_name, author_email, content } = body;

    if (!post || !author_name || !author_email || !content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log(`Posting comment for post ${post}`);

    const response = await fetch(`${CONFIG.API_URL}comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        post: parseInt(post),
        author_name,
        author_email,
        content,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('WordPress API error:', response.status, errorData);

      return NextResponse.json(
        { error: errorData.message || `Failed to post comment: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error posting comment:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to post comment' },
      { status: 500 }
    );
  }
}
