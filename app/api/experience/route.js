import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    const experience = (data || []).map(e => ({
      id: e.id,
      title: e.title,
      company: e.company,
      period: e.period,
      desc: e.description,
    }));

    const res = NextResponse.json({ experience });
    res.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    return res;
  } catch (err) {
    console.error('Experience GET error:', err.message);
    return NextResponse.json({ experience: [], error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { title, company, period, desc } = await req.json();
    if (!title || !company || !period) {
      return NextResponse.json({ error: 'Title, company, and period are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('experience')
      .insert([{
        title,
        company,
        period,
        description: desc || '',
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      experience: { id: data.id, title: data.title, company: data.company, period: data.period, desc: data.description }
    }, { status: 201 });
  } catch (err) {
    console.error('Experience POST error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { id, title, company, period, desc } = await req.json();
    if (!id || !title || !company || !period) {
      return NextResponse.json({ error: 'ID, title, company, and period are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('experience')
      .update({
        title,
        company,
        period,
        description: desc || '',
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      experience: { id: data.id, title: data.title, company: data.company, period: data.period, desc: data.description }
    }, { status: 200 });
  } catch (err) {
    console.error('Experience PUT error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

    const { error } = await supabase
      .from('experience')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Experience DELETE error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
