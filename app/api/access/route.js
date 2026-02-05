import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('http://privserv.my.id:2025/access.json', { cache: 'no-store' });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Gagal akses server' }, { status: 500 });
  }
}
