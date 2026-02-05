import { NextResponse } from 'next/server';

export async function GET() {
  const TARGET = "http://privserv.my.id:2025/access.json";

  try {
    const res = await fetch(TARGET, { 
      cache: 'no-store',
      headers: { 
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0'
      }
    });

    if (!res.ok) throw new Error("Server Pterodactyl nolak request");
    
    const data = await res.json();
    // Kirim data JSON yang lu kasih tadi ke frontend
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Server Down', details: err.message }, { status: 500 });
  }
}
