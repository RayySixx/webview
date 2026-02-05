import { NextResponse } from 'next/server';

const TARGET_DOMAIN = "http://privserv.my.id:2025";

// Helper buat handle request ke server asli
async function proxyRequest(path, method = 'GET', body = null) {
  const url = `${TARGET_DOMAIN}/${path.replace(/^\//, '')}`;
  
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  };

  try {
    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    const res = await fetch(url, options);
    
    // Kalau server asli balikin JSON, kita ambil JSON
    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await res.json();
    }
    return await res.text();
  } catch (err) {
    console.error(`Proxy Error (${method} ${url}):`, err);
    return { error: 'Gagal terhubung ke server asli', details: err.message };
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const apiPath = searchParams.get('path');

  // 1. Jika ini request API
  if (apiPath) {
    const data = await proxyRequest(apiPath, 'GET');
    return NextResponse.json(data);
  }

  // 2. Jika ini request Halaman Utama (HTML)
  try {
    const response = await fetch(TARGET_DOMAIN);
    let html = await response.text();

    // SUNTIKAN SAKTI: Bypass Fetch agar lewat proxy
    // Mencakup /api/chat, /api/history, /access.json
    html = html.replace(/fetch\(['"]\/(.*?)['"]/g, "fetch('/api/proxy?path=$1'");
    
    const headInjection = `
      <base href="${TARGET_DOMAIN}/">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
      <style>
        * { -webkit-touch-callout: none; -webkit-user-select: none; }
        input, textarea { -webkit-user-select: text; }
        body { touch-action: manipulation; overflow: hidden; }
      </style>
      <script>
        // Anti-zoom via JS
        document.addEventListener('touchstart', (e) => {
          if (e.touches.length > 1) e.preventDefault();
        }, { passive: false });
      </script>
    `;
    
    html = html.replace('<head>', `<head>${headInjection}`);

    return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
  } catch (error) {
    return NextResponse.json({ error: 'Server Target Down' }, { status: 500 });
  }
}

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const apiPath = searchParams.get('path') || 'api/chat';
  
  try {
    const body = await request.json();
    const data = await proxyRequest(apiPath, 'POST', body);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON Body' }, { status: 400 });
  }
}
