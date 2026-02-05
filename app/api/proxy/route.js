import { NextResponse } from 'next/server';

export async function GET() {
  const TARGET = "http://privserv.my.id:2025";

  try {
    const res = await fetch(TARGET, { cache: 'no-store' });
    let html = await res.text();

    // SUNTIKAN SAKTI: Biar asset tetep jalan di Pterodactyl
    const injection = `
      <base href="${TARGET}/">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
      <script>
        // Paksa fetch API lu lewat proxy Vercel satu-satu
        const originalFetch = window.fetch;
        window.fetch = function() {
          let url = arguments[0];
          if (typeof url === 'string' && url.startsWith('/')) {
             // Mapping manual sesuai folder api/ yang lu buat
             if (url === '/access.json') url = '/api/access';
             if (url.includes('/api/chat')) url = '/api/chat';
             if (url.includes('/api/history')) url = '/api/history';
             arguments[0] = url;
          }
          return originalFetch.apply(this, arguments);
        };
      </script>
    `;

    html = html.replace('<head>', `<head>${injection}`);
    return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
  } catch (err) {
    return NextResponse.json({ error: 'Pterodactyl Offline' }, { status: 500 });
  }
}
