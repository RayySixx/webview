import { NextResponse } from 'next/server';

export async function GET(request) {
  const targetDomain = "http://privserv.my.id:2025";
  const targetUrl = `${targetDomain}/`;

  try {
    const response = await fetch(targetUrl);
    let html = await response.text();

    // 1. Tambahkan <base> tag agar asset (CSS/JS) tetap jalan
    const baseTag = `<base href="${targetUrl}">`;
    
    // 2. Fix Semua Fungsi Fetch (Mengubah /api ke domain asli)
    // Kita paksa semua request script yang tadinya ke "/api" jadi ke "http://privserv.my.id:2025/api"
    html = html.replace(/fetch\(['"]\/api/g, `fetch('${targetDomain}/api`);
    html = html.replace(/fetch\(['"]\/access\.json/g, `fetch('${targetDomain}/access.json`);

    // 3. Tambahkan Anti-Zoom via Meta Tag (Paksa override)
    const antiZoomTag = `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />`;
    
    if (html.includes('<head>')) {
      html = html.replace('<head>', `<head>${baseTag}${antiZoomTag}`);
    } else {
      html = baseTag + antiZoomTag + html;
    }

    return new NextResponse(html, {
      status: 200,
      headers: { 
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*'
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Server Error: ' + error.message }, { status: 500 });
  }
}
