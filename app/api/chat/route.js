import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const res = await fetch('http://privserv.my.id:2025/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Chat Error' }, { status: 500 });
  }
}
