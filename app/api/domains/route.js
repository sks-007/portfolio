import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('project_domains')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    return NextResponse.json({ domains: data || [] });
  } catch (err) {
    console.error('Domains GET error:', err.message);
    return NextResponse.json({ domains: [], error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { value, label } = await req.json();
    if (!value || !label) {
      return NextResponse.json({ error: 'Value and label are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('project_domains')
      .insert([{ value, label }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ domain: data }, { status: 201 });
  } catch (err) {
    console.error('Domains POST error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { id, value, label } = await req.json();
    if (!id || !value || !label) {
      return NextResponse.json({ error: 'ID, value, and label are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('project_domains')
      .update({ value, label })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ domain: data }, { status: 200 });
  } catch (err) {
    console.error('Domains PUT error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

    const { error } = await supabase
      .from('project_domains')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Domains DELETE error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
