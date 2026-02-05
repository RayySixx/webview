import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('http://privserv.my.id:2025/api/history', { cache: 'no-store' });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'History Error' }, { status: 500 });
  }
}

// Tambahkan DELETE jika di web target lu ada fungsi hapus
export async function DELETE(request) {
  const id = request.url.split('/').pop();
  try {
    const res = await fetch(`http://privserv.my.id:2025/api/history/${id}`, { method: 'DELETE' });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Delete Error' }, { status: 500 });
  }
}
