import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get('url');

  if (!targetUrl) return NextResponse.json({ error: 'URL missing' }, { status: 400 });

  try {
    const response = await fetch(targetUrl);
    let html = await response.text();

    // Inject <base> tag supaya CSS/JS/Image dari domain asli tetep ke-load
    // Ini juga ngebantu biar LocalStorage jalan di context 'self'
    const baseTag = `<base href="${targetUrl}/">`;
    html = html.replace('<head>', `<head>${baseTag}`);

    return new NextResponse(html, {
      status: 200,
      headers: { 
        'Content-Type': 'text/html',
        // Izinkan storage di cross-origin kalau perlu
        'Access-Control-Allow-Origin': '*' 
      },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
  }
}
