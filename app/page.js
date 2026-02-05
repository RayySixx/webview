"use client";
import { useEffect } from 'react';

export default function Home() {
  const proxyPath = "/api/proxy";

  useEffect(() => {
    // Mematikan zoom lewat gesture dua jari (Touch)
    const handleTouch = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };
    document.addEventListener('touchmove', handleTouch, { passive: false });
    return () => document.removeEventListener('touchmove', handleTouch);
  }, []);

  return (
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'fixed' }}>
      <iframe
        src={proxyPath}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block'
        }}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-storage-access-by-user-activation"
        allow="storage-access; clipboard-read; clipboard-write"
      />
    </main>
  );
}
