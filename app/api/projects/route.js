import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    const projects = (data || []).map(p => ({
      id: p.id,
      name: p.name,
      category: p.category,
      categoryLabel: p.category_label,
      desc: p.description,
      tags: p.tags || [],
      image: p.image || '',
      github: p.github || '',
      demo: p.demo || '',
    }));

    return NextResponse.json({ projects });
  } catch (err) {
    console.error('Projects GET error:', err.message);
    return NextResponse.json({ projects: [], error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, category, categoryLabel, desc, tags, image, github, demo } = await req.json();
    if (!name || !category) {
      return NextResponse.json({ error: 'Name and category are required' }, { status: 400 });
    }

    const tagsArray = Array.isArray(tags)
      ? tags
      : (tags || '').split(',').map(t => t.trim()).filter(Boolean);

    const { data, error } = await supabase
      .from('projects')
      .insert([{
        name,
        category,
        category_label: categoryLabel || category,
        description: desc || '',
        tags: tagsArray,
        image: image || '',
        github: github || '',
        demo: demo || '',
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ project: { id: data.id, name: data.name, category: data.category, categoryLabel: data.category_label, desc: data.description, tags: data.tags, image: data.image, github: data.github, demo: data.demo } }, { status: 201 });
  } catch (err) {
    console.error('Projects POST error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Projects DELETE error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
