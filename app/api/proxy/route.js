import { NextResponse } from 'next/server';

export async function GET(request) {
  const targetUrl = "http://privserv.my.id:2025/";

  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    let html = await response.text();

    // Inject tag <base> supaya gambar, css, dan js yang path-nya relatif 
    // (misal /style.css) otomatis ngambil ke http://privserv.my.id:2025/style.css
    const baseTag = `<base href="${targetUrl}">`;
    
    if (html.includes('<head>')) {
      html = html.replace('<head>', `<head>${baseTag}`);
    } else {
      html = baseTag + html;
    }

    return new NextResponse(html, {
      status: 200,
      headers: { 
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*'
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Gagal konek ke server: ' + error.message }, { status: 500 });
  }
}
