import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

const DEFAULT_RESUME = '/Sachin_Kumar_Singh_Resume.pdf';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'resumeUrl')
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    return NextResponse.json({ resumeUrl: data?.value || DEFAULT_RESUME });
  } catch (err) {
    console.error('Resume GET error:', err.message);
    return NextResponse.json({ resumeUrl: DEFAULT_RESUME });
  }
}

export async function POST(req) {
  try {
    const { resumeUrl } = await req.json();
    if (!resumeUrl) return NextResponse.json({ error: 'resumeUrl is required' }, { status: 400 });

    const { error } = await supabase
      .from('settings')
      .upsert({ key: 'resumeUrl', value: resumeUrl }, { onConflict: 'key' });

    if (error) throw error;

    return NextResponse.json({ success: true, resumeUrl });
  } catch (err) {
    console.error('Resume POST error:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
