import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    const education = (data || []).map(e => ({
      id: e.id,
      degree: e.degree,
      institution: e.institution,
      period: e.period,
      desc: e.description,
    }));

    return NextResponse.json({ education });
  } catch (err) {
    console.error('Education GET error:', err.message);
    return NextResponse.json({ education: [], error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { degree, institution, period, desc } = await req.json();
    if (!degree || !institution || !period) {
      return NextResponse.json({ error: 'Degree, institution, and period are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('education')
      .insert([{
        degree,
        institution,
        period,
        description: desc || '',
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      education: { id: data.id, degree: data.degree, institution: data.institution, period: data.period, desc: data.description }
    }, { status: 201 });
  } catch (err) {
    console.error('Education POST error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { id, degree, institution, period, desc } = await req.json();
    if (!id || !degree || !institution || !period) {
      return NextResponse.json({ error: 'ID, degree, institution, and period are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('education')
      .update({
        degree,
        institution,
        period,
        description: desc || '',
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      education: { id: data.id, degree: data.degree, institution: data.institution, period: data.period, desc: data.description }
    }, { status: 200 });
  } catch (err) {
    console.error('Education PUT error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

    const { error } = await supabase
      .from('education')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Education DELETE error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
