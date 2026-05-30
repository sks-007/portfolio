import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;

    const { data: post, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error || !post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Increment view count
    await supabase
      .from('posts')
      .update({ views: (post.views || 0) + 1 })
      .eq('id', post.id);

    // Map to camelCase for frontend
    const mapped = {
      _id: post.id,
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      coverImage: post.slug === 'fullstack-architecture-patterns' ? '/dev-blog.png' : post.cover_image,
      author: post.author,
      views: post.views,
      createdAt: post.created_at,
    };

    return NextResponse.json({ post: mapped });
  } catch (err) {
    const isNetworkError = err.message?.includes('fetch failed') || err.message?.includes('ENOTFOUND');
    console.error('Blog slug error:', err.message);
    return NextResponse.json(
      { error: isNetworkError ? 'Database temporarily unreachable' : 'Failed to fetch post' },
      { status: isNetworkError ? 503 : 500 }
    );
  }
}
