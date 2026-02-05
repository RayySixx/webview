"use client";

export default function Home() {
  // Ganti URL ini dengan URL WebView lu yang sudah di-fix fetch-nya ke /api/...
  const WEBVIEW_URL = "http://privserv.my.id:2025"; 

  return (
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden', margin: 0, background: '#131316' }}>
      <iframe
        src={WEBVIEW_URL}
        style={{ width: '100%', height: '100%', border: 'none' }}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-storage-access-by-user-activation"
        allow="storage-access; clipboard-read; clipboard-write"
      />
    </main>
  );
}
