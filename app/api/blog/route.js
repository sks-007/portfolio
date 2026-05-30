import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit')) || 10;
    const page = parseInt(searchParams.get('page')) || 1;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('posts')
      .select('id, slug, title, excerpt, category, cover_image, author, views, created_at', { count: 'exact' })
      .eq('published', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    const { data: posts, error, count } = await query;

    if (error) {
      // Distinguish network/DNS errors from data errors
      const isNetworkError = error.message?.includes('fetch failed') || error.message?.includes('ENOTFOUND');
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: isNetworkError ? 'Database temporarily unreachable' : 'Failed to fetch posts', posts: [] },
        { status: isNetworkError ? 503 : 500 }
      );
    }

    // Map snake_case to camelCase for frontend compatibility
    const mapped = (posts || []).map((p) => ({
      _id: p.id,
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      coverImage: p.slug === 'fullstack-architecture-patterns' ? '/dev-blog.png' : p.cover_image,
      author: p.author,
      views: p.views,
      createdAt: p.created_at,
    }));

    return NextResponse.json({
      posts: mapped,
      total: count || 0,
      page,
      pages: Math.ceil((count || 0) / limit),
    });
  } catch (err) {
    const isNetworkError = err.message?.includes('fetch failed') || err.message?.includes('ENOTFOUND');
    console.error('Blog list error:', err.message);
    return NextResponse.json(
      { error: isNetworkError ? 'Database temporarily unreachable' : 'Internal server error', posts: [] },
      { status: isNetworkError ? 503 : 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, slug, excerpt, content, category, coverImage, author } = body;

    if (!title || !slug || !excerpt || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('posts')
      .insert([{
        title, slug, excerpt, content,
        category: category || 'General',
        cover_image: coverImage || '',
        author: author || 'Sachin Kumar Singh',
        published: true,
        views: 0,
      }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'A post with this slug already exists' }, { status: 409 });
      }
      return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }

    return NextResponse.json({ post: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
