"use client";

export default function Home() {
  // Kita panggil API proxy kita sendiri
  const proxyPath = "/api/proxy";

  return (
    <main style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <iframe
        src={proxyPath}
        style={{
          width: '100vw',
          height: '100vh',
          border: 'none',
          display: 'block',
          margin: 0,
          padding: 0
        }}
        // Support LocalStorage & Script
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-storage-access-by-user-activation"
        allow="storage-access"
      />
    </main>
  );
}
