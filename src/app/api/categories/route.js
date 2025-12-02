import { NextResponse } from 'next/server';
import { CONFIG } from '@util/config';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('per_page') || '100';

    const response = await fetch(
      `${CONFIG.API_URL}categories?page=${page}&per_page=${perPage}&_embed`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch categories' },
        { status: response.status }
      );
    }

    const categories = await response.json();
    const totalCount = response.headers.get('X-WP-Total');

    return NextResponse.json(categories, {
      headers: {
        'X-Total-Count': totalCount || '0',
      },
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
