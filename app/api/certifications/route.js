import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

const ICON_COLORS = {
  'bi-cpu':           { color: '#f0fdf4', iconColor: '#16a34a' },
  'bi-cloud-check':   { color: '#e6f0ff', iconColor: '#0066cc' },
  'bi-graph-up-arrow':{ color: '#fef3e2', iconColor: '#d97706' },
  'bi-patch-check':   { color: '#fdf4ff', iconColor: '#9333ea' },
  'bi-filetype-py':   { color: '#f0fdf4', iconColor: '#16a34a' },
  'bi-shield-check':  { color: '#fef2f2', iconColor: '#dc2626' },
  'bi-award':         { color: '#fef3e2', iconColor: '#d97706' },
  'bi-stars':         { color: '#e6f0ff', iconColor: '#0066cc' },
  'bi-mortarboard':   { color: '#fdf4ff', iconColor: '#9333ea' },
  'bi-trophy':        { color: '#fef3e2', iconColor: '#d97706' },
  'bi-robot':         { color: '#ecfeff', iconColor: '#0e7490' },
  'bi-code-slash':    { color: '#f0fdf4', iconColor: '#16a34a' },
};

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('certifications')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    const certifications = (data || []).map(c => ({
      id: c.id,
      icon: c.icon,
      name: c.name,
      issuer: c.issuer,
      date: c.date,
      desc: c.description,
      link: c.link,
      color: c.color,
      iconColor: c.icon_color,
    }));

    return NextResponse.json({ certifications });
  } catch (err) {
    console.error('Certifications GET error:', err.message);
    return NextResponse.json({ certifications: [], error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { name, issuer, date, desc, link, icon } = await req.json();
    if (!name || !issuer) {
      return NextResponse.json({ error: 'Name and issuer are required' }, { status: 400 });
    }

    const selectedIcon = icon || 'bi-patch-check';
    const { color, iconColor } = ICON_COLORS[selectedIcon] || { color: '#e6f0ff', iconColor: '#0066cc' };

    const { data, error } = await supabase
      .from('certifications')
      .insert([{
        icon: selectedIcon,
        name,
        issuer,
        date: date || '',
        description: desc || '',
        link: link || '',
        color,
        icon_color: iconColor,
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      certification: { id: data.id, icon: data.icon, name: data.name, issuer: data.issuer, date: data.date, desc: data.description, link: data.link, color: data.color, iconColor: data.icon_color }
    }, { status: 201 });
  } catch (err) {
    console.error('Certifications POST error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

    const { error } = await supabase
      .from('certifications')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Certifications DELETE error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
