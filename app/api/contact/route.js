import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('messages')
      .insert([{ name, email, subject, message }])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully!', id: data.id }, { status: 201 });
  } catch (err) {
    const isNetworkError = err.message?.includes('fetch failed') || err.message?.includes('ENOTFOUND');
    console.error('Contact API error:', err.message);
    return NextResponse.json(
      { error: isNetworkError ? 'Unable to reach database. Please email me directly at kumarsinghsachin4444@gmail.com' : 'Internal server error' },
      { status: isNetworkError ? 503 : 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ messages: data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
