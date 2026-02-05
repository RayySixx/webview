import { NextResponse } from 'next/server';

export async function GET() {
  const TARGET = "http://privserv.my.id:2025";

  try {
    const res = await fetch(TARGET, { cache: 'no-store' });
    let html = await res.text();

    const injection = `
      <base href="${TARGET}/">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
      <script>
        // Override fetch buat belokin ke API Vercel
        const originalFetch = window.fetch;
        window.fetch = function() {
          let url = arguments[0];
          if (typeof url === 'string' && url.includes('access.json')) {
            url = '/api/access';
          }
          if (typeof url === 'string' && url.includes('/api/chat')) {
            url = '/api/chat';
          }
          arguments[0] = url;
          return originalFetch.apply(this, arguments);
        };

        // Fix fungsi checkID biar support format JSON baru lu
        window.checkID = function() {
          const val = document.getElementById('inp-id').value.trim();
          if(!val) return;
          const btn = document.querySelector('#step-id button');
          btn.innerText = "Memeriksa...";
          
          fetch('/api/access')
            .then(r => r.json())
            .then(d => {
              // Gabungin semua kategori ID jadi satu list buat dicek
              const allAllowed = [
                d.main_owner_id,
                ...(d.owners || []),
                ...(d.resellers || []),
                ...(d.users || [])
              ].map(String);

              if (allAllowed.includes(String(val))) {
                localStorage.setItem('ray_id', val);
                document.getElementById('step-id').classList.remove('active');
                document.getElementById('step-name').classList.add('active');
              } else {
                document.getElementById('error-msg').innerText = "ID Tidak Terdaftar";
                btn.innerText = "Lanjutkan";
              }
            })
            .catch(e => {
              document.getElementById('error-msg').innerText = "Error Server / Timeout";
              btn.innerText = "Lanjutkan";
            });
        };
      </script>
    `;

    html = html.replace('<head>', `<head>${injection}`);
    return new NextResponse(html, { headers: { 'Content-Type': 'text/html' } });
  } catch (err) {
    return NextResponse.json({ error: 'Gagal muat tampilan' }, { status: 500 });
  }
}
