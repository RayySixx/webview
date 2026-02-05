import { NextResponse } from 'next/server';

const TARGET_DOMAIN = "http://privserv.my.id:2025";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const apiPath = searchParams.get('path');

  // URL yang dituju
  const finalUrl = apiPath ? `${TARGET_DOMAIN}/${apiPath}` : TARGET_DOMAIN;

  try {
    const res = await fetch(finalUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json, text/html, */*'
      },
      cache: 'no-store'
    });

    const contentType = res.headers.get('content-type') || '';

    // JIKA REQUEST API (JSON)
    if (apiPath || contentType.includes('application/json')) {
      const data = await res.json();
      return NextResponse.json(data);
    }

    // JIKA REQUEST HTML (HALAMAN UTAMA)
    let html = await res.text();

    // SUNTIKAN SAKTI: Ubah path fetch agar lewat proxy Vercel
    // Script ini akan merubah fetch("/api/chat") menjadi fetch("/api/proxy?path=api/chat")
    // Dan fetch("/access.json") menjadi fetch("/api/proxy?path=access.json")
    html = html.replace(/fetch\(['"]\/(.*?)['"]/g, "fetch('/api/proxy?path=$1'");
    
    // Tambahin Meta Anti-Zoom dan Base URL
    const headInjection = `
      <base href="${TARGET_DOMAIN}/">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
      <style>
        * { -webkit-touch-callout: none; -webkit-user-select: none; }
        input, textarea { -webkit-user-select: text !important; }
        body { touch-action: pan-x pan-y; overflow: hidden; }
      </style>
    `;
    
    html = html.replace('<head>', `<head>${headInjection}`);

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' }
    });

  } catch (err) {
    return NextResponse.json({ error: 'Server Error', details: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const apiPath = searchParams.get('path') || 'api/chat';
  const finalUrl = `${TARGET_DOMAIN}/${apiPath}`;

  try {
    const body = await request.json();
    const res = await fetch(finalUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'POST Error', details: err.message }, { status: 500 });
  }
}
