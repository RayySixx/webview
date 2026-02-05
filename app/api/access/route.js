import { NextResponse } from 'next/server';

export async function GET() {
  // Gunakan IP langsung jika domain privserv.my.id bermasalah di DNS
  const TARGET = "http://privserv.my.id:2025/access.json";

  try {
    const res = await fetch(TARGET, { 
      cache: 'no-store',
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 0 } 
    });

    if (!res.ok) throw new Error(`Server target responnya ${res.status}`);
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Detail Error Access:", err.message);
    return NextResponse.json({ error: 'Server Down', msg: err.message }, { status: 500 });
  }
}
