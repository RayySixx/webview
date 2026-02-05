"use client";
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Matikan zoom total
    const preventZoom = (e) => {
      if (e.touches && e.touches.length > 1) e.preventDefault();
    };
    document.addEventListener('touchstart', preventZoom, { passive: false });
    document.addEventListener('wheel', (e) => { if(e.ctrlKey) e.preventDefault(); }, { passive: false });
    return () => {
      document.removeEventListener('touchstart', preventZoom);
    };
  }, []);

  return (
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'fixed', inset: 0, backgroundColor: '#131316' }}>
      <iframe
        src="/api/proxy"
        style={{ width: '100%', height: '100%', border: 'none', margin: 0, padding: 0, display: 'block' }}
        sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-storage-access-by-user-activation"
        allow="storage-access; clipboard-read; clipboard-write"
      />
    </main>
  );
}
