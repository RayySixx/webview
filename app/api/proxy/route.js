import { NextResponse } from 'next/server';

const TARGET_DOMAIN = "http://privserv.my.id:2025";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const apiPath = searchParams.get('path');

  // JIKA REQUEST ADALAH UNTUK API (Login/History/Access)
  if (apiPath) {
    try {
      const res = await fetch(`${TARGET_DOMAIN}/${apiPath}`);
      const data = await res.json();
      return NextResponse.json(data);
    } catch (e) {
      return NextResponse.json({ error: 'Proxy API Error' }, { status: 500 });
    }
  }

  // JIKA REQUEST UNTUK HALAMAN UTAMA (HTML)
  try {
    const response = await fetch(TARGET_DOMAIN);
    let html = await response.text();

    // SUNTIKAN SAKTI: Ubah semua fetch di HTML agar lewat proxy Vercel
    // Yang tadinya fetch('/api/chat') jadi fetch('/api/proxy?path=api/chat')
    html = html.replace(/fetch\(['"]\/(.*?)['"]/g, "fetch('/api/proxy?path=$1'");
    
    // Inject Anti-Zoom & Base URL
    const headInjection = `
      <base href="${TARGET_DOMAIN}/">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <style>
        /* Paksa sembunyikan scrollbar putih jika ada */
        body::-webkit-scrollbar { display: none; }
        body { -ms-overflow-style: none; scrollbar-width: none; touch-action: pan-x pan-y; }
      </style>
    `;
    
    html = html.replace('<head>', `<head>${headInjection}`);

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Server Down' }, { status: 500 });
  }
}

// HANDLE POST (Buat Chat)
export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const apiPath = searchParams.get('path') || 'api/chat';
  const body = await request.json();

  try {
    const res = await fetch(`${TARGET_DOMAIN}/${apiPath}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: 'Post Proxy Error' }, { status: 500 });
  }
}
