"use client";

export default function WebView() {
  const target = "http://privserv.my.id:2025/"; // Ganti ini
  const proxyUrl = `/api/proxy?url=${encodeURIComponent(target)}`;

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        src={proxyUrl}
        style={{ width: '100%', height: '100%', border: 'none' }}
        /* PENTING: 'allow-same-origin' dan 'allow-storage-access-by-user-activation'
           dibutuhkan supaya LocalStorage di dalem iframe bisa diakses.
        */
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-storage-access-by-user-activation"
        allow="clipboard-read; clipboard-write; storage-access"
      />
    </div>
  );
}
