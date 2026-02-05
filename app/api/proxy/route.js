import { NextResponse } from 'next/server';

export async function GET() {
  const TARGET_URL = "http://privserv.my.id:2025";

  try {
    const res = await fetch(TARGET_URL, { cache: 'no-store' });
    let html = await res.text();

    // SUNTIKAN SAKTI: Paksa semua asset (CSS/JS) ngarah ke server asli
    // Dan semua fetch API diarahkan ke route Vercel yang udah lu buat tadi
    const headInjection = `
      <base href="${TARGET_URL}/">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
      <script>
        // Override fetch agar otomatis ke API Vercel
        const originalFetch = window.fetch;
        window.fetch = function() {
          let url = arguments[0];
          if (typeof url === 'string' && url.startsWith('/')) {
            // Misal: /api/chat jadi /api/chat (ke Vercel)
            // Misal: /access.json jadi /api/access (ke Vercel)
            if (url === '/access.json') url = '/api/access';
            arguments[0] = url;
          }
          return originalFetch.apply(this, arguments);
        };
      </script>
    `;

    html = html.replace('<head>', `<head>${headInjection}`);

    return new NextResponse(html, {
      headers: { 'Content-Type': 'text/html' }
    });
  } catch (err) {
    return NextResponse.json({ error: 'Gagal muat tampilan' }, { status: 500 });
  }
}
